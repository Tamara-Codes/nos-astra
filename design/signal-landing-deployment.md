# Signal landing page account links

The landing page uses the Signal app routes `/auth/sign-up` and `/auth/sign-in`. Production defaults to `https://signal-by-nosastra.vercel.app`.

If the app's public origin changes, set `VITE_SIGNAL_APP_URL` to the new public HTTPS origin in the landing page's build environment. Rebuild the landing page after setting it. This value is public and must not contain credentials.

Local previews at localhost or 127.0.0.1 use port `3105` when no app URL is configured.
