### Cross-namespace communication

To get all the existing namespaces:
`kubectl get namespace`

To get services existed inside of a particular namespace:
`kubectl get services -n name-of-namespace`

The request url to communicate with a service from a different namespace:
`http://name-of-service.name-of-namespace.svc.cluster.local`

To simplify the url, we could create the External Name Service.

### Publish shared library as an NPM package

1. Create an NPM account

2. Add an organization under NPM account

3. In `/common/package.json`, change `"name"` to `"@organization-name/package-name"`

4. Publish the package: inside of `/common`, run:
   `npm login`
   `npm publish --access public`

5. Publish common library written as TypeScript as JavaScript:

Inside of `/common`, run:

`tsc --init`
`npm install typescript del-cli --save-dev`

In `/common/package.json`, delete the "test" line and replace it with
`"clean": "del ./build/*",`
`"build": "npm run clean && tsc"`
where the `clean` command will delete everything under the `/build` directory so that we can rebuild without any leftovers.

In `/common/tsconfig.json`, uncomment and change the following lines:

`"declaration": true`
`"outDir": "./build"`

Then execute
`npm run build`
which convert the TypeScript files we had into JavaScript, and write it into the `/build` directory.

6. Configuration

In `/common/package.json`, update or add the following lines:

`"main": "./build/index.js",`
`"types": "./build/index.d.ts",`
`"files": [ "build/**/*" ],`

7. Pipeline

git add and git commit inside of the common directory.

run `npm version patch` to update the version of the package.

run `npm run build` then `npm publish` to build and publish the package.

In summary, we could add the following line to `/common/package.json`:
`"pub": "git add . && git commit -m \"Updates\" && npm version patch && npm run build && npm publish"`

Finally, we could use the customized package by running
`npm install @organization-name/package-name`
in the directories needed.
