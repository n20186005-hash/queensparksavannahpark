// Build driver that works with the managed CI defaults:
//   Build command:  npm run build
//   Deploy command: npx wrangler deploy   (auto-delegates to opennextjs-cloudflare deploy)
//
// The OpenNext build internally re-runs the package `build` script to compile
// Next.js (see @opennextjs/aws buildNextApp.js). To avoid infinite recursion we
// distinguish the two entry points with the OPENNEXT_BUILD_APP marker:
//
//   1. Plain `npm run build` (platform/CI, marker unset):
//      runs the full `opennextjs-cloudflare build`, which produces BOTH `.next`
//      and `.open-next/` (worker bundle + assets + compiled config).
//   2. The same script invoked BY OpenNext (marker set):
//      only runs `next build` so the bundler can continue afterwards.
import { spawnSync } from "node:child_process";

const isOpenNextInnerBuild = process.env.OPENNEXT_BUILD_APP === "1";

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (isOpenNextInnerBuild) {
  // Called by opennextjs-cloudflare build -> only compile the Next.js app.
  run("npm", ["run", "build:next"]);
} else {
  // Top-level entry (platform build command, `npm run preview`, `npm run deploy`):
  // compile Next.js AND assemble the OpenNext worker output.
  run("npx", ["--no-install", "opennextjs-cloudflare", "build"], {
    OPENNEXT_BUILD_APP: "1",
  });
}
