# dccentralkitchen

## Healthy Corners Rewards (DC Central Kitchen)

All documentation lives at <https://healthycorners-rewards.netlify.app> - for new contributors, we recommend starting with the [project overview](https://healthycorners-rewards.netlify.app/shared/overview.html).

- The documentation for this repo can be found here: <https://healthycorners-rewards.netlify.app/customer/>.
- The traditional README lives at the "Getting Started" page: <https://healthycorners-rewards.netlify.app/customer/getting-started.html>

## Companion projects

- Clerk-facing tablet application: [`dccentralkitchen-clerks`](https://github.com/calblueprint/dccentralkitchen-clerks)
- Backend server: [`dccentralkitchen-node`](https://github.com/calblueprint/dccentralkitchen-node)

Run sim build
eas build --platform ios
eas build --platform android

## Build Notes

- Use EAS to make production build.
- All project secrets are stored in a environment.js file
- Before making builds,remove .environment.js from gitignore to make sure that the secrets are included with the build and do not raise errors.

## EAS IGNORE

- add all folders/files you do not want in your build inside .easignore

## Google Maps API key
- React native maps package requires an API key for Android Platform. Please remember to use the PROD API key for production builds in your app.json. You can find the API key in [DCCK's GOOGLE CLOUD PLATFORM](https://console.cloud.google.com/apis/credentials?project=quickstart-1587887313757) under project - Healty Corners Prod, look for "Android Maps PROD Key".
