# Campaign tracking setup

Set values on your host and in an ignored `.env.local` for local testing. Rebuild after changing a `NEXT_PUBLIC_*` value. Leave any unused provider blank.

| Variable | Value to provide |
| --- | --- |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 web data stream Measurement ID, `G-...`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Numeric Pixel ID from Meta Events Manager. |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Optional web Pixel ID from TikTok Events Manager. Blank keeps TikTok disabled. |
| `MAILERLITE_API_TOKEN` | MailerLite API token. Set it as a server secret. |
| `MAILERLITE_GROUP_ID` | Numeric ID of the group that should receive Mace signups. |
| `MAILERLITE_ATTRIBUTION_FIELDS` | Optional comma-separated keys for existing MailerLite Text fields. Supported keys are `signup_source,campaign_phase,first_era,utm_source,utm_medium,utm_campaign,utm_id,utm_content,utm_term`. Use exact field keys. |
| `NEXT_PUBLIC_TRACKING_HOSTS` | Production hostnames, comma-separated. Defaults to `thisismace.com,www.thisismace.com`. |
| `NEXT_PUBLIC_ENABLE_LOCAL_TRACKING` | Leave false. Temporarily set true on a test environment with test IDs. |
| `NEXT_PUBLIC_DITTO_PRESAVE_URL` | The full Ditto pre-save URL for the single. |
| `RELEASE_SPOTIFY_URL`, `RELEASE_APPLE_MUSIC_URL`, `RELEASE_AUDIOMACK_URL`, `RELEASE_YOUTUBE_URL` | Direct track or video URLs for release day. Leave unavailable platforms blank. |

In GA4, turn off enhanced measurement for the stream (including automatic history page views, outbound clicks and form interactions). Mark `sign_up` as a key event. Register event-scoped custom dimensions for `platform`, `campaign_phase`, `button_location`, and any raw UTM fields you want in reports.

In Meta and TikTok Events Manager, turn off automatic advanced matching and any automatic event or Event Setup Tool rules for these actions. Create website audiences in the vendor dashboards after verifying events. The site uses browser pixels and requires no Conversions API or Measurement Protocol secrets.

MailerLite sends the welcome email only if you configure a group-triggered automation. Check your confirmation and automation settings before launch. Existing active subscribers outside the group can be added without a new-subscriber conversion. Existing inactive subscribers are not reactivated by the form.

GA4 uses the requested event names. Meta maps page views and signups to PageView and Lead, and uses custom click events. TikTok uses its page call and CompleteRegistration with custom click events. UTM labels carry forward in memory and, with opt-in, in session storage. Use campaign labels only, never names, email addresses or customer IDs. With advertising consent, valid campaign labels are removed from the URL after capture. Pixels allow validated Meta and TikTok click IDs. Other query parameters or fragments suppress pixel events on that URL.

## Social bio links

Use `/ig`, `/tt`, `/x`, `/yt`, `/snap` and `/threads` on thisismace.com. Each temporarily redirects to the homepage with the platform as `utm_source`, plus `utm_medium=organic_social`, `utm_content=bio`, and `utm_campaign=artist_warmup` by default.

To switch campaigns, set the server-side `SOCIAL_BIO_CAMPAIGN` in Vercel Production and redeploy. Use a campaign label such as `wbdg_release`. The short URLs stay the same. Valid `utm_id`, `utm_term`, `fbclid` and `ttclid` carry through. The redirect sets its four primary UTM values and drops unrelated parameters.

## Testing checklist

- On iPhone Safari, reload the Early page and watch the tail of the “g” through the entrance and after the page settles. Compare with desktop, where the animated typography remains.
- With local tracking off or provider IDs blank, confirm no vendor requests. With test IDs enabled, check analytics-only, advertising-only, rejection, and withdrawal in separate sessions. Confirm withdrawal stops events and preferences survive reload.
- Start with `?utm_source=instagram&utm_medium=social&utm_campaign=wbdg`. Verify campaign values in GA4 DebugView and Meta/TikTok Test Events, then navigate to another page and confirm the values persist. Check that unrelated query parameters and signup form data are absent from event payloads.
- Test all three phases locally by changing `resolveReleasePhase()` in `src/content/site.ts`. Expect one page view per visit per consented provider. Click a footer icon and a profile-dialog link. Test Ditto in Pre-save and configured track links in Released. Confirm platform, phase and button location and verify one event per click.
- Use a test group and a fresh test address. Check loading, invalid email, a provider failure, success, and a repeat submission. Confirm the new contact has the expected group and configured fields. Expect one GA4 sign_up, one Meta Lead, and one TikTok CompleteRegistration only for the new contact where each provider is enabled and consented.
- Confirm the welcome automation delivers and unsubscribe works from a test message. Remove test IDs and overrides before launch.
