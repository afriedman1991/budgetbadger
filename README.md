# Budget Badger

> Budgeting, loan management, and bill tracking for graduates with student loans.

## Team

  - __Product Owner__: [Gustaf](https://github.com/GustafB)
  - __Scrum Master__: [Andrew](https://github.com/andrewblgithub)
  - __Development Team Members__: [Logan](https://github.com/loganmcbride), [Jimmy](https://github.com/jkang1220), [Alex](https://github.com/afriedman1991)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
    1. [GraphQL Queries](#graphql-queries)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Style Guide](#style-guide)

## Usage

> Some usage instructions

## Requirements

- Node 9.4.x
- Postgresql 10.1.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

If database not created:

```sh
psql postgres
Create database bbadger
\c bbadger
\du
```

If .env file not created:

```sh
touch .env

Add the following:
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
APP_SECRET
PLAID_CLIENT_ID
PLAID_SECRET
PLAID_PUBLIC_KEY
PLAID_ENV
```

### Roadmap

View the project roadmap [here](https://github.com/turbapriami/budgetbadger/issues) or [here](https://waffle.io/turbapriami/budgetbadger)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Style Guide

See [STYLE-GUIDE.md](STYLE-GUIDE.md) for the style guide.