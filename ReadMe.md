### Cross-namespace communication

To get all the existing namespaces:

```
kubectl get namespace
```

To get services existed inside of a particular namespace:

```
kubectl get services -n name-of-namespace
```

The request url to communicate with a service from a different namespace:

```
http://name-of-service.name-of-namespace.svc.cluster.local
```

To simplify the url, we could create the External Name Service.

### Publish shared library as an NPM package

#### Preparation

Create an NPM account. Add an organization under NPM account

#### Initialization

In `/common/package.json`, change `"name"` to

```
"@organization-name/package-name"
```

Publish the package: inside of `/common`, run:

```
npm login
npm publish --access public
```

#### Configuration

We need to publish the common library written as TypeScript as JavaScript.

Inside of `/common`, run:

```
tsc --init
npm install typescript del-cli --save-dev
```

In `/common/package.json`, delete the "test" line and replace it with

```
"clean": "del ./build/*",
"build": "npm run clean && tsc"
```

where the `clean` command will delete everything under the `/build` directory so that we can rebuild without any leftovers.

In `/common/tsconfig.json`, uncomment and change the following lines:

```
"declaration": true
"outDir": "./build"
```

Then execute

```
npm run build
```

which convert the TypeScript files we had into JavaScript, and write it into the `/build` directory.

In `/common/package.json`, update or add the following lines:

```
"main": "./build/index.js",
"types": "./build/index.d.ts",
"files": [ "build/**/*" ],
```

#### Pipeline

Git add and git commit inside of the common directory.

Run `npm version patch` to update the version of the package.

Run `npm run build` then `npm publish` to build and publish the package.

In summary, we could add the following line to `/common/package.json`:

```
"pub": "git add . && git commit -m \"Updates\" && npm version patch && npm run build && npm publish"
```

Now everytime after we make some changes to the common library, we will run

```
npm run pub
```

in the `\common` directory. Then run

```
npm update @organization-name/package-name
```

in the directories that use this package (make sure to run `npm install @organization-name/package-name` beforehand).

## NATS Streaming Server

Creating a NATS streaming deployment: `/infra/k8s/nats-depl.yaml`

To communicate with NATS, we use a client library called `node-nats-streaming`.

The nats-streaming client will send data to the specified channel in the NATS Streaming server. The server will then broadcast the data out of that channel to anyone who's listening (who has subscribed to that channel).

Inside of each channel, the Queue Group will make sure that multiple instances of the same service are not all going to receive the exact same event.

To solve concurrency issues, we configure the NATS server with: `setDeliverAllAvailable`, `setDurableName`, and `Queue Group`.
