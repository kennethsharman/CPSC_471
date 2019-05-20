# CPSC471

## Instructions

1) Clone

2) Open index.html

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
