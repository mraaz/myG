# MyG Microservices

This subdirectory is a self contained set of microservices, deployed to AWS via CDK. They can be deployed via commandline, or via Jenkins. They can run locally, or via a quick deploy into a development environment.

The following will explain how to:
- Build and run them, locally or in the cloud.
- Test them.
- Package and deploy them via Jenkins or CDK.
- Add new microservices to this architecture.

## Setup
----

Setup is relatively simple. From `~/myG/microservices` simply run `npm install`. This will trigger and install all dependencies for Cloudformation, and the existing microservices.

## Helper scripts
----

The project contains a series of helper scripts written in TypeScript. These can be found in `~/myG/microservices/scripts`. If you followed the setup instructions above, you would have already triggered your first one, `~/myG/microservices/scripts/setup.ts`.
Below you can find a list of helper scripts. Note that for a detailed list of parameters this commands take, run `<INSERT --help command here>`. Each script can be run without parameter flags; if you do this, it will prompt you for input.

| Script  | Description |
| ------------- | ------------- |
| setup.ts  | Runs install commands required for all microservices. Should be triggered whenever you do your initial setup. |
| build.ts  | Builds a microservice. |
| package.ts | Packages a microservice. |
| deploy.ts | Deploys a microservice to a given environment via CDK. |
| destroy.ts | Destroys a microservice in a given environment via CDK. |
| synth.ts | Runs a CDK synth on your stacks. Only run if you have changes to your Cloudformation scripts. |
| go.ts | Guided entry into the CLI. |

## Local development

## Build, package & deployment

## Create a new service

## Possible improvements

- Consolodating all package.jsons into a single root level one, and use yarn to better control microservice requirements.
- Move the ts-node scripts into something like rust, that can be compiled and bundled into the repos root, allowing for probably faster and more agnostic CLI.
