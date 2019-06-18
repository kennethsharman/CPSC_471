# CPSC471

## Instructions

1) Ask access for the firebase account and `.runtimeconfig.json` file.
2) Clone repo.
2) Copy `.runtimeconfig.json` into the `functions` folder
3) Log in to firebase account and`firebase serve` on bash/powershell/etc.
4) Visit the app at http://localhost:5000

## File structure
### Functions
This is the back end. It contains queries on `.db/` and API calls to postgreSQL on `.index.js`.

### Public
This is the front end. HTML, CSS, and JS for the views are here.

### Database
This contains sql files for the CLI.

## File Descriptions

### .firebaseerc

Projection configuration. Typically used if you have multiple projects. e.g. staging and
production.

### firebase.json

Required to deploy assets with the Firebase CLI. Specifies which files and settings from
your project directory are deployed to your Firebase project.


### firestore.indexes.json

Cloud Firestore requires an index for every query. Basic ones are automatically created.
If an query results in an error, Firestore will help to create a new index to fix the problem.


### firestore.rules

Cloud Firestore Security Rules.

    e.g. Allow read/write access to all documents to any user signed into the application

### package-lock.json & package.json

Created by Node Package Manager (npm). Describes project dependencies (modules needed to run
app). Any operation where npm modifies package.json will result in the creation of
package-lock.json
