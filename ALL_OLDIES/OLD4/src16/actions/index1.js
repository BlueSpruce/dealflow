export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

let nextTodoId = 26;
export const acts = (name, value) => ({
  type: "ACTS",
  name: name,
  value: value
});

export const selectorOriginial = (n) => ({
  type: 'SELECTOR',
  id: n,

})


export const add = () => ({
  type: "ADD",
  id: nextTodoId++
});

/************************************************************/
/* ASYNC TEST */

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
});

export const selector = n => dispatch => {
  let temp = "frontend";
  dispatch(selectorOriginial(n))
  dispatch(requestPosts(temp));
  dispatch(requestStatuses())
  dispatch(requestTypes())
  return (
    fetch(
      "https://insight.bluesprucecapital.net/api/project/active?api-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDAzMjc5MjYsImV4cCI6MTUwMTQ4MDgwMCwic3ViIjoiNDE2YzQzMWItOWQ3Ny00ODc5LWFkZWQtMTA5MzJiZjUzZTRhIn0.0Utpl7dWUV9O84HvJeVY3UXLLtaQZk6PU1R-29UbIutios8WKg6S8YsFCTFoxOBb7ZnKjre_1h13nLRPQ9kb5A"
    )
      //return fetch(`https://www.reddit.com/r/${temp}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(temp, json)))
  );
  //.catch()
};
export const requestStatuses =()=> dispatch => {
  return(
    fetch('https://insight.bluesprucecapital.net/api/project-status/list-all?api-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDAzMjc5MjYsImV4cCI6MTUwMTQ4MDgwMCwic3ViIjoiNDE2YzQzMWItOWQ3Ny00ODc5LWFkZWQtMTA5MzJiZjUzZTRhIn0.0Utpl7dWUV9O84HvJeVY3UXLLtaQZk6PU1R-29UbIutios8WKg6S8YsFCTFoxOBb7ZnKjre_1h13nLRPQ9kb5A')
    .then(response => response.json())
    .then(json => dispatch(receiveStatuses(json)))
  )
}
export const receiveStatuses = (json) => ({
  type: 'RECEIVE_STATUSES',
  statuses: json,
});

export const requestTypes = () => dispatch => {
  return(
    fetch('https://insight.bluesprucecapital.net/api/project-type/list-all?api-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDAzMjc5MjYsImV4cCI6MTUwMTQ4MDgwMCwic3ViIjoiNDE2YzQzMWItOWQ3Ny00ODc5LWFkZWQtMTA5MzJiZjUzZTRhIn0.0Utpl7dWUV9O84HvJeVY3UXLLtaQZk6PU1R-29UbIutios8WKg6S8YsFCTFoxOBb7ZnKjre_1h13nLRPQ9kb5A')
    .then(response => response.json())
    .then(json => dispatch(receiveTypes(json)))
  )
}

export const receiveTypes = (json) => ({
  type: 'RECEIVE_TYPES',
  projectTypes: json,
});

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json,
  receivedAt: Date.now()
});
