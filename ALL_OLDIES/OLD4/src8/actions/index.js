import * as HTTP from "../common/http";
import R from "ramda";
import { isNumber, numberAddCommas, numberDeleteCommas, prependDollarSign, deleteDollarSign } from "../utils/utils";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const acts = (name, value, id) => ({
  type: "ACTS",
  name: name,
  value: value,
  Id: id
});

export const addSelectedField = (name, value, id) => ({
  type: "ADD-SELECTED-FIELD",
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

export const selector = n => async (dispatch, getState) => {
  console.log("selector action n: " + n);

  dispatch(selectorOriginial(n));
  if (getState().data.projects) {
    const response = await HTTP.customFieldValue(
      getState().data.projects[getState().data.select - 1].CustomFieldValue_Id
    );
    const customFieldValue = await response.json();
    console.log('CUSTOMFIELDVALUE '+JSON.stringify(customFieldValue))
    /* FAMILY MEMBERS */
    const response2 = await HTTP.familyMembers();
    const familyMembers = await response2.json();
    const s = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField5"].split(",")),
      familyMembers.ListItems
    );
    dispatch(
      addSelectedField(
        "familymembers",
        R.map(x => x.Name, s),
        getState().data.projects[getState().data.select - 1].Id
      )
    );
    /*LEAD PERSON */
      const responseLeadPerson = await HTTP.leadPerson();
      const leadPerson = await responseLeadPerson.json();
      console.log('leadPerson '+JSON.stringify(leadPerson))
      const s2 = R.filter(
        x => R.contains(x.Value, customFieldValue["CustomField18"].split(",")),
        leadPerson.ListItems
      );
      dispatch(
        addSelectedField(
          "leadPerson",
          R.map(x => x.Name.trim(), s2),
          getState().data.projects[getState().data.select - 1].Id
        )
      );
      /*INDUSTRY TYPE */
      const responseIndustry = await HTTP.industry();
      const industry = await responseIndustry.json();
      console.log('industry '+JSON.stringify(industry))
      const s3 = R.filter(
        x => R.contains(x.Value, customFieldValue["CustomField19"].split(",")),
        industry.ListItems
      );
      dispatch(
        addSelectedField(
          "investmenttype",
          R.map(x => x.Name.trim(), s3),
          getState().data.projects[getState().data.select - 1].Id
        )
      );
      /* MIN CAPITAL */
      const minCap = customFieldValue["CustomField13"]
      deleteDollarSign(minCap)
      console.log("MIN CAP "+deleteDollarSign(minCap))
      dispatch(
        addSelectedField(
          "minCapital",
          customFieldValue["CustomField13"],
          getState().data.projects[getState().data.select - 1].Id
        )
      );
      /* MAX CAPITAL */
      const maxCap = customFieldValue["CustomField14"]
      console.log("MAX CAP "+deleteDollarSign(minCap))
      dispatch(
        addSelectedField(
          "maxCapital",
          customFieldValue["CustomField14"],
          getState().data.projects[getState().data.select - 1].Id
        )
      );
  }
  //todo...change logic?
  if (getState().data.projects) return;
  console.log("select getState().projects[n].id " + getState().data.select);

  dispatch(requestPostsData());
  dispatch(requestStatuses());
  dispatch(requestTypes());
};
//selector(1);

export const requestPostsData = () => async dispatch => {
  dispatch(requestPosts(posts));
  const response = await HTTP.postsData();
  const posts = await response.json();
  //const response2 = await HTTP.customFieldValue();
  //const customField = await response2.json()
  //console.log('CUSTOM FIELD: '+JSON.stringify(customField))
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
