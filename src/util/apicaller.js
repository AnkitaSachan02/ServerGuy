import config from "../config/config";

export const Apicaller = (search, user, callPath) => {
  return new Promise((res, rej) => {
    const searchTopic = `${config.url}${callPath}?params=`;
    const params = JSON.stringify({ searchTopic: search, user });
    fetch(searchTopic + params, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => res(result))
      .catch(err => {
        // do nothing
      });
  });
};
