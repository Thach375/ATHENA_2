<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
    
<a href="https://github.com/juliandavidmr/awesome-nestjs" target="_blank"><img src="https://img.shields.io/badge/Awesome-NestJS-blue.svg?longCache=true&style=flat-square" alt="NestJS" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for eUpSolution

## Installation

```bash
$ npm install
```

## Running the app

### Without Docker

```bash
# development in local
$ npm run start

# development environment
$ npm run start:dev

# production environment
$ npm run start:prod
```

### With Docker for Development

If you use the database local. Make sure the configuration convert all host to `host.docker.internal`

```bash
# make image from local files
$ docker build -t nest-js-base -f ./.docker/local.dockerfile .

# run docker
$ docker-compose up

# run development
$ docker-compose start
```

## Build the application

```bash
#  to build the application run
$ npm run build
```

Then you will see all of the file in dist folder that ready to be served.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features

<dl>
  <!-- <dt><b>Quick scaffolding</b></dt>
  <dd>Create modules, services, controller - right from the CLI!</dd> -->

  <dt><b>Jsonwebtoken and Role base</b></dt>
  <dd>Installed and configured JWT authentication and Login feature with role base.</dd>

  <dt><b>Next generation Typescript</b></dt>
  <dd>Always up to date typescript version.</dd>

  <dt><b>Environment Configuration</b></dt>
  <dd>development, production environment configurations</dd>

  <dt><b>Swagger Api Documentation</b></dt>
  <dd>Already integrated API documentation. To see all available endpoints visit http://localhost:3000/documentation</dd>

  <dt><b>Linter</b></dt>  
  <dd>eslint + prettier</dd>
  <dd>Auto format code when saved</dd>
  <dd>Install ESLint, Prettier- Code formatter before start project</dd>
</dl>

## Documentation

You can read more documentation detail in `docs` folder:

1.  [Setup and development](./docs/development.md) [Soon Incoming]
1.  [Architecture](./docs/architecture.md) [Soon Incoming]
1.  [Naming](./docs/naming-cheatsheet.md)
1.  [Linting](./docs/linting.md)

## To do

- [x] Add multi configuration for each environment
- [x] Support Mongoose
- [x] Support cache using Redis
- [x] Support I18n - multiple languages
- [x] Make User and Auth module
- [x] Make Unit tests and e2e tests
- [x] Add migration database configuration
- [x] Add Docker dev and deployment configuration
- [ ] Update documentation for docs folder
- [ ] Add config transform body and database data

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Andrew Bui](khanhbd@eupsolution.net)
- Attributes - Waiting ....

## License

Nest is [MIT licensed](LICENSE).
