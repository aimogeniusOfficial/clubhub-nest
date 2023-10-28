# clubhub-nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running stripe webhook locally
```bash
$ stripe listen --forward-to localhost:3000/payment/webhook
```

## Setting up Prisma locally
```bash
# Generate database schema and prisma client
$ npx prisma migrate dev

# Execute permission files
$ npx prisma db execute --file prisma/util/grants.sql
$ npx prisma db execute --file prisma/util/setup-supabase.sql

# Seed the db
$ npx prisma db seed

# Create your migration
$ npx prisma migrate dev --name MIGRATION_NAME

# SQL only migration
$ npx prisma migrate dev --create-only --name MIGRATION_NAME
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
