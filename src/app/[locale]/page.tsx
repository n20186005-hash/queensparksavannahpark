import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuickGlance from '@/components/QuickGlance';
import AboutSection from '@/components/AboutSection';
import Intro from '@/components/Intro';
import TopThingsSection from '@/components/TopThingsSection';
import DistanceSection from '@/components/DistanceSection';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import WeatherSection from '@/components/WeatherSection';
import LandmarksSection from '@/components/LandmarksSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import AmenitiesSection from '@/components/AmenitiesSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickGlance />
        <AboutSection />
        <Intro />
        <TopThingsSection />
        <DistanceSection />
        <BasicInfo />
        <HistoryTimeline />
        <RouteSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <WeatherSection />
        <LandmarksSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <AmenitiesSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
