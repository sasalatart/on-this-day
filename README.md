# On This Day

[![License: MIT][mit-badge]](https://opensource.org/licenses/MIT)
[![CircleCI][circleci-badge]](https://circleci.com/gh/sasalatart/on-this-day)
[![code style: prettier][prettier-badge]](https://github.com/prettier/prettier)

## About

_On This Day_ is an app that serves and displays events, births and deaths that occurred during the
queried day of history, scraped from [Wikipedia](https://www.wikipedia.org/).

The app was built as a GraphQL monorepo via yarn workspaces using the following technologies:

1. [TypeScript](https://www.typescriptlang.org/)
2. [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
3. [Apollo Client](https://www.apollographql.com/docs/react/)
4. [React](https://facebook.github.io/react/)

Custom packages included in the monorepo are:

- `server`: Backend GraphQL logic
- `client`: Frontend GraphQL + React app
- `scraper`: Scraps seed data from Wikipedia
- `shared`: Shared code for all packages, such as validations
- `eslint-config`: Base eslint config for the whole project

## Queries

### yearDate

Returns an array of historical episodes, filtered by day and month.

- **args:**

  - input:
    - month (Int!): An integer between 1 and 12.
    - day (Int!): An integer between 1 and 31.

- **Example usage:**

  ```graphql
  {
    yearDate(input: { day: 13, month: 10 }) {
      day
      month
      description
      events {
        id
        year
        description
        keywords {
          title
          href
        }
      }
    }
  }
  ```

- **Example response:**

  ```json
  {
    "data": {
      "yearDate": {
        "day": 13,
        "month": 10,
        "description": "October 13 is the 286th day of the year (287th in leap years) in the [...]",
        "events": [
          {
            "id": "5e8e7aa06ae7679b783cff22",
            "year": 54,
            "description": "Roman emperor Claudius dies from poisoning under mysterious circumstances.",
            "keywords": [
              {
                "title": "AD 54",
                "href": "/wiki/AD_54",
              },
              {
                "title": "Claudius",
                "href": "/wiki/Claudius",
              },
            ],
          },
          {
            "id": "5e8e7aa06ae7679b783cff25",
            "year": 409,
            "description": "Vandals and Alans cross the Pyrenees and appear in Hispania.",
            "keywords": [
              {
                "title": "409",
                "href": "/wiki/409",
              },
              {
                "title": "Vandals",
                "href": "/wiki/Vandals",
              },
              {
                "title": "Alans",
                "href": "/wiki/Alans",
              },
              {
                "title": "Hispania",
                "href": "/wiki/Hispania",
              },
            ],
          },
          ...
        ]
      }
    }
  }
  ```

  **Note:** The keywords' link (href) is relative to Wikipedia's domain. For example, `/wiki/Vandals`
  turns to be `https://wikipedia.org/wiki/Vandals`.

You may check the whole schema by visiting <http://localhost:9000/graphql/playground> after running
the server.

## Setup

### Development

1. Run `yarn install`
2. Make sure that you have a local (or cloud-based) mongodb server up and running.
3. Export the mongodb env variables:

   - `MONGODB_HOST` and `MONGODB_PORT` (localhost and 27017 by default), or alternatively
   - `MONGODB_URI`

4. Seed built-in data to the database by running `yarn seed:dev`
5. Run `yarn dev`, which will [concurrently][concurrently] turn on the GraphQL API, the React App
   and watch for changes in all packages.

Other additional `yarn` scripts that might be helpful:

- `yarn lint`: runs eslint through the whole monorepo.
- `yarn build`: builds GraphQL schemas into TypeScript, and then builds TS code into its JS version.
- `yarn scrap:dev`: runs the Wikipedia scraper.
- `yarn seed:dev --force`: runs the seeds again, but this time wiping the database clean.
- `yarn console:dev`: opens a console to interact with the backend.
- `yarn db`: creates and runs a local mongodb container via Docker (requires starting Docker).

If you are going to start coding before running `yarn dev`, you must run `yarn build` so that all
internal packages are properly imported between themselves.

### Running via Docker

```sh
# Start database and app server via docker-compose.
# You might have to wait for a moment while the backend seeds the database.
$ docker-compose up -d

# Stop docker containers:
$ docker-compose stop
```

Now the app should be available on port 9000.

## Testing

Unit & integration backend tests were written with [Jest][jest].

E2E tests were written with [Cypress][cypress], and need the backend and frontend to be up and
running in order to work (`yarn:dev` can accomplish this in one command, assuming there is already
a database running).

**Important:** Only use January dates when adding new E2E tests. In order to make the CI faster, the
seeds used for E2E tests only contain January data instead of the whole year.

```sh
# Run backend tests
$ yarn test:backend

# Open cypress (interactive)
$ yarn test:e2e:open

# Run headless e2e tests (non-interactive alternative)
$ yarn test:e2e
```

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg
[circleci-badge]: https://circleci.com/gh/sasalatart/on-this-day.svg?style=svg
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[concurrently]: https://github.com/kimmobrunfeldt/concurrently
[jest]: https://jestjs.io/
[cypress]: https://www.cypress.io/
