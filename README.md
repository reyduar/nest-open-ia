# NEST JS OpenIA API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[OpenApi](https://platform.openai.com/docs/quickstart)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Docker

```bash
# Build
$ docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

```bash
# Docker Run
$ docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

## Health check

```
http://localhost:5793/health
```
