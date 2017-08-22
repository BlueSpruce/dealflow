
import R from "ramda";

const getObj = (x, arr) => R.find(y => y.id === x, arr);
const getTypesObj = (x, prjTypes) => getObj(x.ProjectType_Id, prjTypes);
const getStatusObj = (x, prjStatuses) => getObj(x.ProjectStatus_Id, prjStatuses);
const strName = x => R.prop("Name", x);

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const acts = (name, value) => ({
  type: "ACTS",
  name: name,
  value: value
});

export const selectorOriginial = n => ({
  type: "SELECTOR",
  id: n
});

/************************************************************/
/* ASYNC  */

export const requestPosts = () => ({
  type: REQUEST_POSTS
  //reddit
});

const toke =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDAzMjc5MjYsImV4cCI6MTUwMTQ4MDgwMCwic3ViIjoiNDE2YzQzMWItOWQ3Ny00ODc5LWFkZWQtMTA5MzJiZjUzZTRhIn0.0Utpl7dWUV9O84HvJeVY3UXLLtaQZk6PU1R-29UbIutios8WKg6S8YsFCTFoxOBb7ZnKjre_1h13nLRPQ9kb5A";
const apiPath = "https://insight.bluesprucecapital.net/api/";



export const selector = n => (dispatch, getState) => {
  dispatch(selectorOriginial(n));
  dispatch(requestPosts());
  dispatch(requestStatuses());
  dispatch(requestTypes());

  //return fetch(`${apiPath}project/active?api-token=${toke}`)
  return (
    fetch(
      `${apiPath}project/active-and-planning-user-can-view?api-token=${toke}`
    )
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  );
  //.catch()
};
//selector(1);
export const requestStatuses = () => dispatch => {
  return fetch(`${apiPath}project-status/list-all?api-token=${toke}`)
    .then(response => response.json())
    .then(json => dispatch(receiveStatuses(json)));
};
export const receiveStatuses = json => ({
  type: "RECEIVE_STATUSES",
  statuses: json
});

export const requestTypes = () => dispatch => {
  return fetch(`${apiPath}project-type/list-all?api-token=${toke}`)
    .then(response => response.json())
    .then(json => dispatch(receiveTypes(json)));
};
export const receiveTypes = json => ({
  type: "RECEIVE_TYPES",
  projectTypes: json
});

export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json,
  receivedAt: Date.now()
});
