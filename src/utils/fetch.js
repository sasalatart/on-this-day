/* eslint-disable no-undef */

export default function jsonFetch(route) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const request = new Request(route, { method: 'GET', headers });

  return fetch(request)
    .then((response) => {
      if (response.status >= 400) {
        return response.json()
          .then((json) => {
            throw new Error(json.message);
          });
      }

      return response.json();
    });
}
