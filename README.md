# Local HubSpot Boilerplate with Gulp (SASS compiler, Browsersync)

## Installation

1. `git clone` this repo to your local machine and `cd` into this directory
2. Run `touch hubspot.config.yml`
3. Run `npm install`
4. Authenticate your local environment with HubSpot using OAuth2
    1. [Create a private developer app](https://developers.hubspot.com/docs/faq/how-do-i-create-an-app-in-hubspot)
    2. Run `npx hscms auth oauth2` in the command line. This will begin a series of command line prompts
    3. Enter your CMS Portal id
    4. Enter your client id and client secret from your private developer app. This will open a window in your default browser requesting authorization
    5. Select your CMS portal on the authorization page
    6. Request for Integrations Permissions: your private app will request permission to access your account data. Click "Grant Access"
    7. If successful, you should see "Authorization Succeeded", and your hubspot.config.yml file will be updated
    8. Add `name: 'ProjectName'` to the `hubpot.config.yml` file if it isn't automatically added
5. To start the Gulp tasks, run `gulp`

## Production Files

The Gulp tasks will compile the final (unminified) CSS and JS files in the `dist` folder. Ensure that the final CSS and JS files are called `main.css` and `main.js` in HubSpot (or rename them in the `gulpfile.js` file to accurately reflect the files as they appear in HubSpot). 

Use the `dist` folder when pushing to HubSpot. For example, run `npx hscms upload --portal=portal-name dist hubspot-folder-name` to upload everything in the `dist` folder to the specified folder in HubSpot.

## Shortcuts

`gulpfile.js` includes Gulp tasks that act as shortcuts for HubSpots commands, including *fetch*, *upload as draft*, and *upload and publish*. 

For example, to fetch the project from HubSpot to your local folder, run:

```
gulp fetch
```

This will run:

```
npx hscms fetch --portal=portal-name hubspot-folder-name dist
```

**In order to use these shortcuts, you will need to update `gulpfile.js` with the portal name and src/dest folder names related to your project.**

### Commands

Command | Output
---|---|
`gulp fetch` | `npx hscms fetch --portal=portal-name hubspot-folder-name dist`
`gulp overwrite` | `npx hscms fetch --overwrite --portal=portal-name hubspot-folder-name dist`
`gulp draft` | `npx hscms upload --portal=portal-name --mode=draft dist hubspot-folder-name`
`gulp publish` | `npx hscms upload --portal=portal-name --mode=publish dist hubspot-folder-name`

---

_**For more information about HubSpot's Local Development Environment, [click here](https://designers.hubspot.com/docs/tools/local-development).**_

---