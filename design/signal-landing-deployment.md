# Signal landing page account links

The landing page uses the Signal app routes `/auth/sign-up` and `/auth/sign-in`.

For a deployment where the app has a separate origin, set `VITE_SIGNAL_APP_URL` to the public HTTPS app origin in the landing page's build environment. Rebuild the landing page after setting it. This value is public and must not contain credentials.

Local previews at localhost or 127.0.0.1 use `http://localhost:3105` when no app URL is configured. Outside local previews, an unset app URL uses the same origin; use that only when the app authentication routes are actually hosted there. The production app URL needs to be chosen and configured when the app is deployed.
