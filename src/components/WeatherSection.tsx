'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';

interface DayForecast {
  time: string;
  code: number;
  tmax: number | null;
  tmin: number | null;
  pop: number | null;
  uv: number | null;
  wind: number | null;
}

interface WeatherData {
  temp: number | null;
  feels: number | null;
  humidity: number | null;
  wind: number | null;
  precipitation: number | null;
  isDay: boolean;
  currentCode: number;
  updatedAt: number;
  days: DayForecast[];
}

interface Tips {
  dress: string[];
  activity: string[];
  gear: string[];
  risk: string[];
}

// Light in-memory + localStorage cache (refreshed when it gets older than 10 minutes)
const CACHE_TTL = 10 * 60 * 1000;
const CACHE_KEY = 'qps-weather-v2';

let memoryCache: { at: number; data: WeatherData } | null = null;

function groupOf(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code >= 95) return 'thunder';
  return 'partly';
}

const HEAVY_RAIN_CODES = new Set([65, 67, 82]);

const DAY_ICONS: Record<string, string> = {
  clear: '☀️',
  partly: '⛅',
  cloudy: '☁️',
  fog: '🌫️',
  drizzle: '🌦️',
  rain: '🌧️',
  showers: '🌦️',
  thunder: '⛈️',
  snow: '🌨️',
};

const NIGHT_ICONS: Record<string, string> = {
  clear: '🌙',
  partly: '☁️',
  cloudy: '☁️',
  fog: '🌫️',
  drizzle: '🌦️',
  rain: '🌧️',
  showers: '🌦️',
  thunder: '⛈️',
  snow: '🌨️',
};

function intlLocale(locale: string) {
  if (locale === 'zh') return 'zh-CN';
  if (locale === 'es') return 'es-ES';
  return 'en-US';
}

function buildTips(d: DayForecast): Tips {
  const out: Tips = { dress: [], activity: [], gear: [], risk: [] };
  const push = (arr: keyof Tips, key: string) => {
    if (key && !out[arr].includes(key)) out[arr].push(key);
  };

  const group = groupOf(d.code);
  const pop = d.pop ?? 0;
  const tmax = d.tmax;
  const tmin = d.tmin;
  const wind = d.wind ?? 0;
  const uv = d.uv ?? -1;

  // Rain, drizzle and showers
  if (group === 'drizzle') {
    if (pop >= 60) {
      push('dress', 'popHighDress');
      push('activity', 'popHighActivity');
      push('gear', 'umbrella');
    } else {
      push('activity', 'drizzleActivity');
      push('gear', 'foldUmbrella');
    }
  } else if (group === 'rain' || group === 'showers') {
    if (HEAVY_RAIN_CODES.has(d.code)) {
      push('risk', 'rainHeavyRisk');
      push('activity', 'rainHeavyActivity');
      push('gear', 'raincoat');
      if (pop >= 60) push('activity', 'popHighActivity');
    } else if (pop >= 60) {
      push('dress', 'popHighDress');
      push('activity', 'popHighActivity');
      push('gear', 'umbrella');
    } else {
      push('activity', 'rainActivity');
      push('gear', 'umbrella');
    }
  } else if (group === 'thunder') {
    push('risk', 'thunderRisk');
    push('activity', 'thunderActivity');
    push('gear', 'raincoat');
  } else if (group === 'snow') {
    push('dress', 'coldDress');
    push('gear', 'thickCoat');
    push('gear', 'scarf');
  }

  // Fog
  if (group === 'fog') {
    push('risk', 'fogRisk');
    push('activity', 'fogActivity');
    push('gear', 'mask');
  }

  // Sunny / cloudy comfort notes and UV (only when not actively raining)
  const wet = ['rain', 'showers', 'drizzle', 'thunder', 'snow'].includes(group);
  if (!wet) {
    if (uv >= 5) {
      push('activity', 'uvActivity');
      push('gear', 'sunscreen');
      push('gear', 'sunglasses');
      push('gear', 'hat');
    }
    if (group === 'clear') push('activity', 'sunnyActivity');
    else if (group === 'partly') push('activity', 'partlyActivity');
    else if (group === 'cloudy') push('activity', 'cloudyActivity');
  }

  // Heat (any day without strong rain/thunder)
  const stormWet =
    group === 'thunder' ||
    group === 'snow' ||
    ((group === 'rain' || group === 'showers') && HEAVY_RAIN_CODES.has(d.code));
  if (!stormWet && tmax != null && tmax >= 32) {
    push('dress', 'heatDress');
    push('activity', 'heatActivity');
    push('gear', 'water');
  }

  // Big day-night swing and cold snaps
  if (tmax != null && tmin != null && tmax - tmin >= 8) {
    push('dress', 'diurnalDress');
    push('gear', 'lightJacket');
  }
  if (tmax != null && tmax <= 10) {
    push('dress', 'coldDress');
    push('gear', 'thickCoat');
    push('gear', 'scarf');
  }

  // Wind (Beaufort approximations: ~5-6 is 29-49 km/h, ~7+ is 50+ km/h)
  if (wind >= 50) {
    push('risk', 'windRisk');
    push('activity', 'windActivity');
  } else if (wind >= 29) {
    push('dress', 'windDress');
    push('activity', 'windActivity');
  }

  if (
    out.dress.length === 0 &&
    out.activity.length === 0 &&
    out.gear.length === 0 &&
    out.risk.length === 0
  ) {
    push('activity', 'none');
  }

  return out;
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();

  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState(0);

  async function loadWeather() {
    const now = Date.now();

    if (memoryCache && now - memoryCache.at < CACHE_TTL) {
      setData(memoryCache.data);
      setLoading(false);
      setFailed(false);
      return;
    }
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CACHE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as { at: number; data: WeatherData };
          if (now - parsed.at < CACHE_TTL) {
            memoryCache = parsed;
            setData(parsed.data);
            setLoading(false);
            setFailed(false);
            return;
          }
        }
      } catch {
        /* ignore corrupted cache */
      }
    }

    setLoading(true);
    setFailed(false);
    try {
      const params = new URLSearchParams({
        latitude: String(SITE.latitude),
        longitude: String(SITE.longitude),
        current:
          'temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m',
        daily:
          'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max',
        timezone: 'auto',
        forecast_days: '7',
        wind_speed_unit: 'kmh',
      });

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('weather request failed');
      const json = await res.json();

      const current = json.current;
      const daily = json.daily;
      const days: DayForecast[] = (daily.time as string[]).map((time: string, i: number) => ({
        time,
        code: daily.weather_code[i],
        tmax: daily.temperature_2m_max[i],
        tmin: daily.temperature_2m_min[i],
        pop: daily.precipitation_probability_max[i],
        uv: daily.uv_index_max[i],
        wind: daily.wind_speed_10m_max[i],
      }));

      const result: WeatherData = {
        temp: current?.temperature_2m ?? null,
        feels: current?.apparent_temperature ?? null,
        humidity: current?.relative_humidity_2m ?? null,
        wind: current?.wind_speed_10m ?? null,
        precipitation: current?.precipitation ?? null,
        isDay: current?.is_day === 1,
        currentCode: current?.weather_code ?? 0,
        updatedAt: Date.now(),
        days,
      };

      memoryCache = { at: Date.now(), data: result };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: result }));
        } catch {
          /* storage may be unavailable */
        }
      }
      setData(result);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentGroup = data ? groupOf(data.currentCode) : 'partly';
  const currentLabel = t(`conditions.${currentGroup}`);
  const iconSet = data && !data.isDay ? NIGHT_ICONS : DAY_ICONS;

  function formatDayLabel(time: string, index: number) {
    if (index === 0) return t('today');
    const d = new Date(time);
    try {
      return new Intl.DateTimeFormat(intlLocale(locale), { weekday: 'short' }).format(d);
    } catch {
      return '';
    }
  }

  function formatTime(timestamp: number) {
    try {
      return new Intl.DateTimeFormat(intlLocale(locale), {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(timestamp));
    } catch {
      return '';
    }
  }

  const selectedDay = data?.days?.[Math.min(selected, (data?.days.length || 1) - 1)] ?? null;
  const tips = selectedDay ? buildTips(selectedDay) : null;
  const selectedGroup = selectedDay ? groupOf(selectedDay.code) : 'partly';

  function sectionHead(label: string, icon: string, color?: string) {
    return (
      <h4 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: color || 'var(--text-primary)' }}>
        <span aria-hidden="true">{icon}</span>
        {label}
      </h4>
    );
  }

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('sectionTitle')}
        </h2>
        <p className="text-center mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {t('sectionSubtitle')}
        </p>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        {failed && !data ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              {t('unavailable')}
            </p>
            <button
              onClick={loadWeather}
              className="px-5 py-2 rounded-full text-sm font-medium"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t('refresh')}
            </button>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
              {/* Current conditions */}
              <div
                className="rounded-xl p-6 flex flex-col justify-between"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                      {t('now')}
                    </span>
                    <span className="text-3xl" role="img" aria-label={currentLabel}>
                      {loading && !data ? '⏳' : iconSet[currentGroup]}
                    </span>
                  </div>
                  <div className="mt-2 text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {data && data.temp !== null ? `${Math.round(data.temp)}°` : '—'}
                  </div>
                  <p className="mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {loading && !data ? '…' : currentLabel}
                  </p>
                </div>

                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</dt>
                    <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {data && data.feels !== null ? `${Math.round(data.feels)}°` : '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt style={{ color: 'var(--text-muted)' }}>{t('humidity')}</dt>
                    <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {data && data.humidity !== null ? `${Math.round(data.humidity)}%` : '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt style={{ color: 'var(--text-muted)' }}>{t('wind')}</dt>
                    <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {data && data.wind !== null ? `${Math.round(data.wind)} km/h` : '—'}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* 7-day selector */}
              <div
                className="rounded-xl p-6"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <div className="grid grid-cols-4 lg:grid-cols-7 gap-2 h-full">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const day = data?.days?.[i];
                    const dayGroup = day ? groupOf(day.code) : 'partly';
                    const active = data ? i === selected : false;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => day && setSelected(i)}
                        aria-pressed={active}
                        className="rounded-lg p-2.5 text-center flex flex-col items-center justify-between gap-1 transition-colors"
                        style={{
                          background: active ? 'var(--bg-tertiary)' : 'transparent',
                          border: `1px solid ${active ? 'var(--accent)' : 'var(--border-color)'}`,
                          cursor: day ? 'pointer' : 'default',
                        }}
                      >
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                          {day ? formatDayLabel(day.time, i) : '…'}
                        </span>
                        <span className="text-xl" role="img" aria-hidden="true">
                          {loading && !data ? '…' : DAY_ICONS[dayGroup]}
                        </span>
                        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                          {day && day.tmax !== null ? `${Math.round(day.tmax)}°` : '—'}
                          <span className="font-normal" style={{ color: 'var(--text-muted)' }}>
                            {' '}/{day && day.tmin !== null ? `${Math.round(day.tmin)}°` : '—'}
                          </span>
                        </span>
                        <span className="text-[11px] leading-none" style={{ color: 'var(--accent)' }}>
                          {!day ? '…' : day.pop !== null ? `💧 ${day.pop}%` : `💧 ${t('rainChance')}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Smart advice for the selected day */}
            <div
              className="mt-6 rounded-xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('tips.title')}
                </h3>
                {selectedDay && (
                  <span className="text-sm px-3 py-1 rounded-full font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {formatDayLabel(selectedDay.time, selected)}
                    {selectedDay.tmax !== null ? ` · ${Math.round(selectedDay.tmax)}°/${selectedDay.tmin !== null ? Math.round(selectedDay.tmin) : '—'}°` : ''}
                    {selectedDay.uv !== null && selectedDay.uv >= 3 ? ` · ${t('uvLabel')} ${Math.round(selectedDay.uv)}` : ''}
                  </span>
                )}
                <button
                  onClick={loadWeather}
                  className="ml-auto text-xs px-4 py-1.5 rounded-full font-medium"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
                >
                  ↻ {t('refresh')}
                </button>
              </div>

              {tips && tips.risk.length > 0 && (
                <div
                  className="mb-4 rounded-lg p-4"
                  style={{ background: '#fdecea', border: '1px solid #f5c2c0', color: '#a3322a' }}
                  role="alert"
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-2" style={{ color: '#a3322a' }}>
                    <span aria-hidden="true">⚠️</span>
                    {t('tips.risk')}
                  </div>
                  <ul className="space-y-1 text-sm">
                    {tips.risk.map((key) => (
                      <li key={key}>· {t(`tips.${key}`)}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-6">
                {tips && tips.dress.length > 0 && (
                  <div>
                    {sectionHead(t('tips.dress'), '🧥')}
                    <ul className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {tips.dress.map((key) => (
                        <li key={key}>{t(`tips.${key}`)}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tips && tips.activity.length > 0 && (
                  <div>
                    {sectionHead(t('tips.activity'), '🗺️')}
                    <ul className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {tips.activity.map((key) => (
                        <li key={key}>{t(`tips.${key}`)}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tips && tips.gear.length > 0 && (
                  <div>
                    {sectionHead(t('tips.gear'), '🎒')}
                    <div className="flex flex-wrap gap-2">
                      {tips.gear.map((key) => (
                        <span
                          key={key}
                          className="px-3 py-1.5 rounded-full text-sm"
                          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                        >
                          {t(`gear.${key}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  {t('updated')}: {data ? formatTime(data.updatedAt) : '—'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
