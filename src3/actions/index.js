
import R from "ramda";

const getObj = (x, arr) => R.find(y => y.id === x, arr);
const getTypesObj = (x, prjTypes) => getObj(x.ProjectType_Id, prjTypes);
const getStatusObj = (x, prjStatuses) => getObj(x.ProjectStatus_Id, prjStatuses);
const strName = x => R.prop("Name", x);

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const acts = (name, value,id) => ({
  type: "ACTS",
  name: name,
  value: value,
  Id:id,
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
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDE1MTM5NzAsImV4cCI6MTU4MDQ1NDAwMCwic3ViIjoiM2I0NmFlOTUtM2NkOC00YzU0LTljNzctMmQ2YjU0MjNhOGE2In0.q2k-FP9iJ7SruHAHxQaU3CxK8-K8k74chJ_mYA7JkuFsdRwiqPpgOD9hgJFQLHZ7NeBnB43t9Wf_1AZQ3VNMRw";


const apiPath = "https://insight.bluesprucecapital.net/api/";



export const selector = n => (dispatch, getState) => {

  dispatch(selectorOriginial(n));
    if(getState().data.projects) return;
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
