# Local HubSpot Boilerplate with Gulp (SASS compiler, Browsersync)

## Installation

1. `git clone` this repo to your local machine
2. Run `npm install`
3. Authenticate your local environment with HubSpot using OAuth2
    1. [Create a private developer app](https://developers.hubspot.com/docs/faq/how-do-i-create-an-app-in-hubspot)
    2. Run `npx hscms auth oauth2` in the command line. This will begin a series of command line prompts
    3. Enter your CMS Portal id
    4. Enter your client id and client secret from your private developer app. This will open a window in your default browser requesting authorization
    5. Select your CMS portal on the authorization page
    6. Request for Integrations Permissions: your private app will request permission to access your account data. Click "Grant Access"
    7. If successful, you should see "Authorization Succeeded", and your hubspot.config.yml file will be updated
    8. Add `name: 'ProjectName'` to the `hubpot.config.yml` file if it isn't automatically added
4. To start the Gulp tasks, run `gulp`

## Production Files

The Gulp tasks will compile the final (unminified) CSS and JS files in the `dist` folder. Ensure that the final CSS and JS files are called `main.css` and `main.js` in HubSpot (or rename them in the `gulpfile.js` file to accurately reflect the files as they appear in HubSpot). 

Use the `dist` folder when pushing to HubSpot. For example, run `npx hscms upload --portal=portal-name dist hubspot-folder-name` to upload everything in the `dist` folder to the specified folder in HubSpot.

---

_**For more information about HubSpot's Local Development Environment, [click here](https://designers.hubspot.com/docs/tools/local-development).**_

---