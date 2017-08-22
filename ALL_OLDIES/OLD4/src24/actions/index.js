import * as HTTP from "../common/http";
import R from "ramda";
import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../utils/utils";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

/* for UUIDs...need to post UUIDs for comboboxes */
let allListItems = [];
/* values for a projects custom field values ***/
let customFieldValue;

export const acts2 = ({ name, value, id }) => ({
  type: "ACTS2",
  name: name,
  value: value,
  Id: id
});

export const acts = (name, value, id) => async (dispatch, getState) => {
  console.log("acts called " + [name, value, id]);
  const custFieldId = getState().data.projects[getState().data.select - 1]
    .CustomFieldValue_Id;
  const objList = R.filter(x => x.name === name, allListItems);
  const fieldNum = R.props(["customFieldNumber"], objList[0]);
  let strCustField = "CustomField" + fieldNum;
  let returnValue = "";
  if (objList[0].listItems) {
    returnValue = R.props(
      ["Value"],
      R.find(x => x.Name.trim() == value, objList[0].listItems)
    );
  } else {
    returnValue = value;
  }
  const responseCustomField = await HTTP.postCustomField(
    custFieldId,
    strCustField,
    returnValue
  );
  dispatch(acts2({ name, value, id }));
};

export const addSelectedField2 = (id, name, value) => ({
  type: "ADD-SELECTED-FIELD",
  name: name,
  value: value,
  Id: id
});
const addSelectField1 = R.curry(addSelectedField2);

export const selectorOriginial = n => ({
  type: "SELECTOR",
  id: n
});

/************************************************************/
/* ASYNC  */
/*--------------------------------------------*/
/* SUPPORT FUNCTIONS */
/* function filterAndContains */
const fC = (cfv, n, list) => {
  const a = x => R.contains(x.Value, cfv[`CustomField${n}`].split(","));
  return R.filter(x => a(x), list);
};
const curriedFC = R.curry(fC);
/*--------------------------------------------*/
const getHttp = async field => {
  let a = await HTTP[field]();
  let b = await a.json();
  return b;
};
const pushToAllListItems = (field, name) => {
  allListItems.push({
    name: name,
    listItems: field.ListItems,
    customFieldNumber: field.FieldNumber
  });
};
/*--------------------------------------------*/
export const selector = n => async (dispatch, getState) => {
  console.log("selector action n: " + n);


  /** BASIC PROJECT DATA HAS BEEN LOADED **/
  if (getState().data.projects) {
    const curProjId = getState().data.projects[n - 1].Id;
    const addSelectedField = addSelectField1(curProjId);
    const custFieldId = getState().data.projects[n - 1].CustomFieldValue_Id;
    dispatch(selectorOriginial(n));
    /** GET ALL CUSTOM FIELD RESULTS FOR A PROJECT **/
    const response = await HTTP.customFieldValue(custFieldId);
    customFieldValue = await response.json();
    const fcCustom = curriedFC(customFieldValue);

    const doField = async (field) => {
      const resultField = await getHttp(field);
      const s = fcCustom(resultField['FieldNumber'], resultField['ListItems']);
      dispatch(addSelectedField(field, R.map(x => x.Name, s)));
      pushToAllListItems(resultField, field);
    }
    /* FAMILY MEMBERS */

    doField("familymembers")
    /*LEAD PERSON */
    doField("leadPerson")
    /*INDUSTRY TYPE */
    doField("industry")
    /*INDUSTRY SUBTYPE */
    const subIndustry = await getHttp("industrySubType");
    const s4 = fcCustom(subIndustry.FieldNumber, subIndustry.ListItems);
    dispatch(
      addSelectedField("investmentsubtype", R.map(x => x.Name.trim(), s4))
    );
    pushToAllListItems(subIndustry, "investmentsubtype");


    /* MIN CAPITAL */
    const minCap = customFieldValue["CustomField13"];
    console.log("MIN CAP " + deleteDollarSign(minCap));
    dispatch(addSelectedField("minCapital", deleteDollarSign(minCap)));
    /* MAX CAPITAL */
    const maxCap = customFieldValue["CustomField14"];
    console.log("MAX CAP " + deleteDollarSign(maxCap));
    dispatch(addSelectedField("maxCapital", deleteDollarSign(maxCap)));
    /*  CAPITAL committed */
    const capCommitted = customFieldValue["CustomField15"];
    console.log(" CAPcommited " + deleteDollarSign(capCommitted));
    dispatch(
      addSelectedField("capitalCommitted", deleteDollarSign(capCommitted))
    );

    /*Financials */

    doField("financials")
    /* Legal */

    doField("legal")
    /* background */
    doField("background")
    /*review status */
     
    doField("reviewStatus")
    /* Status notes...a text field*/
    const reviewStatusNotes = await getHttp("statusNotes");
    const statusNotes =
      customFieldValue[`CustomField${reviewStatusNotes.FieldNumber}`];
    dispatch(addSelectedField("statusNotes", statusNotes));
    pushToAllListItems(reviewStatusNotes, "statusNotes");
    /*Key people */
    const reviewKeyPeople = await getHttp("keypeople");
    const keypeople =
      customFieldValue[`CustomField${reviewKeyPeople.FieldNumber}`];
    dispatch(addSelectedField("keypeople", keypeople));
    pushToAllListItems(reviewKeyPeople, "keypeople");
    /* recommendation */
    const reviewRecommendation = await getHttp("recommendation");
    const recommendation =
      customFieldValue[`CustomField${reviewRecommendation.FieldNumber}`];
    dispatch(addSelectedField("recommendation", recommendation));
    pushToAllListItems(reviewRecommendation, "recommendation");
    /*  for all fields make sure unique */
    allListItems = R.uniq(allListItems);
  }
  /** todo...change logic?  Logic to call once...  **/
  if (getState().data.projects) return;
  console.log("select getState().projects[n].id " + getState().data.select);
  dispatch(requestPostsData());
  dispatch(requestStatuses());
  dispatch(requestTypes());
}; //if (getState().data.projects)

export const requestPostsData = () => async dispatch => {
  dispatch(requestPosts(posts));
  const response = await HTTP.postsData();
  const posts = await response.json();
  dispatch(receivePosts(posts));
  return posts;
};
export const requestPosts = () => ({
  type: REQUEST_POSTS
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
