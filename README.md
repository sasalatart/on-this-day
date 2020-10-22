# On This Day &middot; [![m][mit-bdg]][mit] [![b][build-bdg]][build] [![p][prettier-bdg]][prettier]

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
- `scraper`: Scrapes data from Wikipedia
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
- `yarn scrape:dev`: runs the Wikipedia scraper.
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
# Run scraper tests
$ yarn test:scraper

# Run server tests
$ yarn test:server

# Open cypress (interactive)
$ yarn test:e2e:open

# Run headless e2e tests (non-interactive alternative)
$ yarn test:e2e
```

## Terraform

This project uses [Terraform Cloud][terraform] for setting up its infrastructure. At the moment it
consists of a very simple (but not optimal) free [Heroku][heroku] setup, just to keep this project
within free-tiers.

To get started with this project's Terraform setup, make sure you have created a Terraform Cloud
account, and set the following variables:

- `heroku_email`
- `heroku_api_key` (sensitive!)

After setting the variables, go to your console, ensure you have downloaded and installed Terraform,
and then execute the following:

```sh
# Login to Terraform Cloud
$ terraform login

# Terraform configuration files have been placed in the terraform dir, so we cd into it
$ cd terraform

# Initialize Terraform (download modules, load state, etc.)
$ terraform init

# Generate an execution plan for Terraform
$ terraform plan

# Build/change infrastructure
$ terraform apply
```

This should set up the basic Heroku app together with a free mongodb addon.

Although the previous instructions explain how to set up the infrastructure via the CLI, **I advise
using Terraform Cloud's GitHub integration**:

1. Every time a new Pull Request is created, Terraform Cloud will run `terraform plan` automatically
   and let GitHub know if there would be any changes to the infrastructure as a result of applying
   the changes submitted.
2. If you agree with those changes, then you may apply them via Terraform Cloud's UI.

**This setup does not deploy the app itself. You can read more about this in Heroku's docs.**

## Credits

This project used many open-source projects, most of them have already been mentioned in this
document, but others still remain unmentioned:

- [Wikipedia][wikipedia] and the content-creators that have provided the historical episodes served
  and displayed by this app, and which are [licensed][cc-share-alike] as Creative Commons
  Attribution-ShareAlike 3.0 Unported License.
- [Material UI][material-ui] for their React components with which the `client` package of this
  project was built.
- [Stéphane Monnot][stephane-monnot] for their [react-vertical-timeline][react-vertical-timeline]
  components to represent episodes in an ordered and nice manner.

## License

Copyright (c) 2017, Sebastián Salata Ruiz-Tagle

_On This Day_ is [MIT licensed](./LICENSE).

[mit]: https://opensource.org/licenses/MIT
[mit-bdg]: https://img.shields.io/badge/License-MIT-blue.svg
[build]: https://circleci.com/gh/sasalatart/on-this-day
[build-bdg]: https://circleci.com/gh/sasalatart/on-this-day.svg?style=svg
[prettier]: https://github.com/prettier/prettier
[prettier-bdg]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[concurrently]: https://github.com/kimmobrunfeldt/concurrently
[jest]: https://jestjs.io/
[cypress]: https://www.cypress.io/
[terraform]: https://www.terraform.io/
[heroku]: https://www.heroku.com/
[wikipedia]: https://www.wikipedia.org/
[cc-share-alike]: https://creativecommons.org/licenses/by-sa/3.0/
[material-ui]: https://material-ui.com/
[stephane-monnot]: https://github.com/stephane-monnot
[react-vertical-timeline]: https://github.com/stephane-monnot/react-vertical-timeline
