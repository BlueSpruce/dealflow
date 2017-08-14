//import { mergeData } from "./util";
import R from 'ramda';

const getObj =( x, arr) => R.find(y => y.id === x, arr)
const getTypesObj = (x,prjTypes) => getObj(x.ProjectType_Id, prjTypes)
const getStatusObj = (x,prjStatuses) => getObj(x.ProjectStatus_Id,prjStatuses)
const strName = x => R.prop('Name', x )

const mergeData = (prjects,prjTypes, prjStatuses) => {
  const d1 =  R.map(x =>
                   R.merge(x,
                           {projectType:strName(getTypesObj(x,prjTypes))}),
                   prjects)
  const d2 = R.map(x =>
                    R.merge(x,
                            {statusType:strName(getStatusObj(x,prjStatuses))}),
                    d1)
                    console.log('merg '+R.merge(d1,d2))
   return R.merge(d1,d2)

}


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
/* ASYNC TEST */

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
});

const toke =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDAzMjc5MjYsImV4cCI6MTUwMTQ4MDgwMCwic3ViIjoiNDE2YzQzMWItOWQ3Ny00ODc5LWFkZWQtMTA5MzJiZjUzZTRhIn0.0Utpl7dWUV9O84HvJeVY3UXLLtaQZk6PU1R-29UbIutios8WKg6S8YsFCTFoxOBb7ZnKjre_1h13nLRPQ9kb5A";
const apiPath = "https://insight.bluesprucecapital.net/api/";

const testProjectLoad = ()=> (dispatch, getState) =>{
  console.log('testProjectLoad')
  //console.log("mergeData2 " + JSON.stringify(dat  ))
  console.log('mergeData f called'+mergeData(getState().data.projects,getState().data.projectTypes,getState().data.projectStatuses))
}


export const selector = n => (dispatch, getState) => {
  /* todo: delete temp **/
  let temp = "frontend";

  dispatch(selectorOriginial(n));
  dispatch(requestPosts(temp));
  dispatch(requestStatuses());
  dispatch(requestTypes());
  return fetch(`${apiPath}project/active?api-token=${toke}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(temp, json)))
  //  .then( console.log("mergeData " + JSON.stringify(mergeData(getState().projects,getState().projectTypes,getState().projectStatuses))))
.then( console.log("mergeData " + JSON.stringify(getState().data.projects,getState().data.projectTypes,getState().data.projectStatuses  )))
.then(setInterval(() => testProjectLoad(), 1000));
//.then( setInterval(testProjectLoad(getState().data.projects),10000))

  //.catch()
};
selector(1)
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

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json,
  receivedAt: Date.now()
});
