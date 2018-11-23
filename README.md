# On This Day

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Code Climate](https://codeclimate.com/github/sasalatart/on-this-day/badges/gpa.svg)](https://codeclimate.com/github/sasalatart/on-this-day)
[![Docker Automated build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](sasalatart/on-this-day)
[![](https://images.microbadger.com/badges/version/sasalatart/on-this-day.svg)](https://microbadger.com/images/sasalatart/on-this-day)
[![](https://images.microbadger.com/badges/image/sasalatart/on-this-day.svg)](https://microbadger.com/images/sasalatart/on-this-day)

## About

Application built with [Express](https://expressjs.com/) and [React](https://facebook.github.io/react/) that returns events, births and deaths that occurred during a specific day of history. This information has been retrieved from Wikipedia using a scraper.

## API Usage

#### Episodes

Returns an array of JSON historical episodes, filtered by day, month and type.

- **URL:** `api/episodes?type=<type>&day=<day>&month=<month>`

- **Method:** `GET`

- **URL Query Params:**

| Parameter | Required | Possible Values                       | Default Value |
|-----------|----------|---------------------------------------|---------------|
| type      | no       | "all", "events", "births" or "deaths" | "all"         |
| day       | yes      | Any integer between 1 and 31.         | -             |
| month     | yes      | Any integer between 1 and 12.         | -             |
| short     | no       | true, false                           | false         |

- **Example Success Response:**
  - **Code:** 200
  - **Example Content:**

```js
{
  "id": "593c57b8fe84bd1ded1e9113",
  "day": 17,
  "month": 6,
  "description": "June 17 is the 168th day of the year (169th in leap years) in the Gregorian calendar. There are 197 days remaining until the end of the year. This date is slightly more likely to fall on a Wednesday, Friday or Sunday (58 in 400 years each) than on Monday or Tuesday (57), and slightly less likely to occur on a Thursday or Saturday (56).",
  "deaths": [
    {
      "id": "593c57b8fe84bd1ded1e9216",
      "year": "656",
      "data": "Uthman, Persian ruler (b. 577)",
      "kw": [
        {
          "id": "593c57b8fe84bd1ded1e9218",
          "title": "656",
          "href": "/wiki/656"
        },
        {
          "id": "593c57b8fe84bd1ded1e9217",
          "title": "Uthman",
          "href": "/wiki/Uthman"
        }
      ]
    },
    {
      "id": "593c57b8fe84bd1ded1e9213",
      "year": "676",
      "data": "Pope Adeodatus II",
      "kw": [
        {
          "id": "593c57b8fe84bd1ded1e9215",
          "title": "676",
          "href": "/wiki/676"
        },
        {
          "id": "593c57b8fe84bd1ded1e9214",
          "title": "Pope Adeodatus II",
          "href": "/wiki/Pope_Adeodatus_II"
        }
      ]
    },
    {
      "id": "593c57b8fe84bd1ded1e920f",
      "year": "850",
      "data": "Tachibana no Kachiko, Japanese wife of Emperor Saga (b. 786)",
      "kw": [
        {
          "id": "593c57b8fe84bd1ded1e9212",
          "title": "850",
          "href": "/wiki/850"
        },
        {
          "id": "593c57b8fe84bd1ded1e9211",
          "title": "Tachibana no Kachiko",
          "href": "/wiki/Tachibana_no_Kachiko"
        },
        {
          "id": "593c57b8fe84bd1ded1e9210",
          "title": "Emperor Saga",
          "href": "/wiki/Emperor_Saga"
        }
      ]
    }, {
      ...
    }
  ]
}
```

**Note:** The keywords' link (href) is relative to Wikipedia's domain. For example `/wiki/Emperor_Saga` turns to be `https://wikipedia.org/wiki/Emperor_Saga`.

- **Sample Call:**
  ```javascript
  $.ajax({
    url: "api/episodes?type=deaths&day=17&month=6",
    dataType: "json",
    type : "GET",
    success : function(response) {
      console.log(response);
    }
  });
  ```

#### About Short Mode

If the `short` query string is supplied, no keywords (`kw`) will be returned in the response.

## Setup

#### Development

1. Clone and cd into this repository
2. run `yarn install`
3. Export the environment variables `DB_HOST` and `DB_PORT` (27017 by default), or alternatively `MONGODB_URI`.
4. Turn on your local mongodb server if that is the case.
5. run `nodemon src/server` (turns on the backend server)
6. run `yarn run start-dev` (turns on the frontend development server)

#### Docker for production deployment

```sh
# Start database and app server via docker-compose
$ docker-compose up

# Setup the database
$ docker exec on_this_day npm run seed
```

Now the app should be available on port 9000:  `curl http://127.0.0.1:9000`

The app can be mapped to a different port in `docker-compose.yml` file

#### Starting docker on system-startup

We'll use systemd to launch docker-compose in detached mode, let's create service file in `/etc/systemd/system/onthisday.service` with contents:

```sh
[Unit]
Description=Docker Compose Application Service for on_this_day
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/change/this/to/project/directory
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Be sure to change the WorkingDirectory to where you cloned this repository.

Now let's enable the service: `systemctl enable onthisday`

Restart the machine to make sure it will bring up the containers on system startup
