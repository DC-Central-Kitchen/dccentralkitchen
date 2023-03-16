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
- Files/Folders not part of the build go inside .easignore. NOTE: Do not add environment secrets files in .easignore, as they will be ignored during the build process and throw erros.


## Current Build
- Android : 1.6.28
- IOS : 1.6.25
NOTE: IOS and Android do not have matching versions, but code-base is up-to-date.

