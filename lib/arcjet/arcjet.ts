import "server-only";
import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow
} from "@arcjet/next";
import { env } from "../env";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow
};

// The arcjet instance is created outside of the handler
export default arcjet({
  key: env.ARCJET_KEY, // Get your site key from https://app.arcjet.com
  characteristics: ["fingerprint"],
  rules: [
    // Protect against common attacks with Arcjet Shield. Other rules are
    // added dynamically using `withRule`.
    shield({
      mode: "LIVE" // will block requests. Use "DRY_RUN" to log only
    })
  ]
});
