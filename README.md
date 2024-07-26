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

## Run project on local machine

- Expo start command does not work anymore for both ios or android.
- To run the project on your IOS or android simulators locally , run the following commands. Note : Please make sure your simulators are open before running these commands. Also, please make sure to include your Google maps API key in app.json to be able to view the maps in your simulator.
  IOS : expo run:ios
  Android : expo run:android

## Build Notes

- Use EAS to make production build.
- All project secrets are stored in a environment.js file
- Files/Folders not part of the build go inside .easignore. NOTE: Do not add environment secrets files in .easignore, as they will be ignored during the build process and throw erros.

## EAS IGNORE

- add all folders/files you do not want in your build inside .easignore

## Google Maps API key

- React native maps package requires an API key for Android Platform. Please remember to use the PROD API key for production builds in your app.json. You can find the API key in [DCCK's GOOGLE CLOUD PLATFORM](https://console.cloud.google.com/apis/credentials?project=quickstart-1587887313757) under project - Healty Corners Prod, look for "Android Maps PROD Key".
