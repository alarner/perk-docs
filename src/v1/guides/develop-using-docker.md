---
title: Develop using Docker
description: A quick guide to containerize Perk for development.
date: 2017-02-19
layout: topic.html
order: 030
---

> If you prefer to install the required services locally, you can read [Getting started with Perk on OS X](/v1/guides/getting-started-os-x.html).

You can skip installing services locally and utilize docker containers to develop your Perk app.

Once you have the [Docker Engine installed](https://docs.docker.com/engine/installation/), you can run the following commands to get Perk up and running quickly.

### Installing Perk

In your terminal type the following commands:

1. `npm install -g perk-cli`

	> Installs the Perk command line interface

1. `perk myProject && cd myProject`

	> creates a new Perk project called "myProject" and changes to that directory. **Please ignore the recommendation to run `npm install`. We will run that via a container soon.**


### Initializing Docker

`./develop init`

> builds the node image, installs application dependencies, and sets application configurations

### Starting your containterized app

`./develop up`

> instructs docker to create or start containers and initiates `npm run dev` on the node container

1. Once the containers are running, visit http://localhost:3000.

### Managing your containterized app

You will notice that Perk comes with a `develop` helper script. This script makes it simple to pass `knex` or `npm` commands to your node container. The commands just need to be prefaced with `./docker`.

For example, if you want to run `npm run test` on your node container, you can run the following:

`./develop npm run test`

### Stopping your containterized app

`./develop stop`

> instructs docker to stop containers.

### Deleting your containterized app

`./develop down -v`

> instructs docker to stop containers, delete containers, and delete data volumes for this application.
