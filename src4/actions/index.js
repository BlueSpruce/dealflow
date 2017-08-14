import * as HTTP from "../common/http";
import R from "ramda";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const acts = (name, value, id) => ({
  type: "ACTS",
  name: name,
  value: value,
  Id: id
});

export const selectorOriginial = n => ({
  type: "SELECTOR",
  id: n
});

/************************************************************/
/* ASYNC  */

export const selector = n => (dispatch, getState) => {
  dispatch(selectorOriginial(n));

  //todo...change logic?
  if (getState().data.projects) return;

  dispatch(requestPostsData());
  dispatch(requestStatuses());
  dispatch(requestTypes());
};
//selector(1);

export const requestPostsData = () => async dispatch => {
  dispatch(requestPosts(posts));
  const response = await HTTP.postsData();
  const posts = await response.json();
  dispatch(receivePosts(posts));
  return posts;
};
export const requestPosts = () => ({
  type: REQUEST_POSTS
  //reddit
});
export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json,
  receivedAt: Date.now()
});

export const requestStatuses = () => async dispatch => {
  const response = await HTTP.projectStatuses();
  const statuses = await response.json();
  dispatch(receiveStatuses(statuses));
  return statuses;
};
export const receiveStatuses = json => ({
  type: "RECEIVE_STATUSES",
  statuses: json
});

export const requestTypes = () => async dispatch => {
  const response = await HTTP.projectTypes();
  const types = await response.json();
  dispatch(receiveTypes(types));
  return types;
};
export const receiveTypes = json => ({
  type: "RECEIVE_TYPES",
  projectTypes: json
});
