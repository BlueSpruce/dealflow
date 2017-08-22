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
/*--------------------------------------------*/
//function filterAndContains
const fC = (cfv, n, list) => {
  const a = (x) =>  R.contains(x.Value, cfv[`CustomField${n}`].split(","));
 return  R.filter(x => a(x), list)
}
const curriedFC = R.curry(fC)
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
export const selector = n => async (dispatch, getState) => {
  console.log("selector action n: " + n);
/** BASIC PROJECT DATA HAS BEEN LOADED **/
  if (getState().data.projects) {
    const curProjId = getState().data.projects[n - 1].Id;
    const custFieldId = getState().data.projects[n - 1].CustomFieldValue_Id;
    dispatch(selectorOriginial(n));
    /** GET ALL CUSTOM FIELD RESULTS FOR A PROJECT **/
    const response = await HTTP.customFieldValue(custFieldId);
    customFieldValue = await response.json();
    const fcCustom = curriedFC(customFieldValue);
    /* FAMILY MEMBERS */
    const familymembers = await getHttp("familymembers");
    const s = fcCustom(familymembers.FieldNumber, familymembers.ListItems)
    dispatch(
      addSelectedField("familymembers", R.map(x => x.Name, s), curProjId)
    );
    pushToAllListItems(familymembers, "familymembers");
    /*LEAD PERSON */
    const leadPerson = await getHttp("leadPerson");
    const s2 = fcCustom(leadPerson.FieldNumber, leadPerson.ListItems)
    dispatch(addSelectedField("leadperson", R.map(x => x.Name, s2), curProjId));
    pushToAllListItems(leadPerson, "leadperson");
    /*INDUSTRY TYPE */
    const industry = await getHttp("industry");
    const tempName = `customFieldValue["CustomField${industry.FieldNumber}"]`;
    const s3 = fcCustom(industry.FieldNumber, industry.ListItems)
    dispatch(
      addSelectedField("investmenttype",R.map(x => x.Name.trim(), s3),curProjId)
    );
    pushToAllListItems(industry, "investmenttype");
    /*INDUSTRY SUBTYPE */
    const subIndustry = await getHttp("industrySubType");
    const s4 = fcCustom(subIndustry.FieldNumber, subIndustry.ListItems)
    dispatch(
      addSelectedField(
        "investmentsubtype",
        R.map(x => x.Name.trim(), s4),
        curProjId
      )
    );
    pushToAllListItems(subIndustry, "investmentsubtype");

    /* MIN CAPITAL */
    const minCap = customFieldValue["CustomField13"];
    console.log("MIN CAP " + deleteDollarSign(minCap));
    dispatch(
      addSelectedField("minCapital", deleteDollarSign(minCap), curProjId)
    );

    /* MAX CAPITAL */
    const maxCap = customFieldValue["CustomField14"];
    console.log("MAX CAP " + deleteDollarSign(maxCap));
    dispatch(
      addSelectedField("maxCapital", deleteDollarSign(maxCap), curProjId)
    );
    /*  CAPITAL committed */
    const capCommitted = customFieldValue["CustomField15"];
    console.log(" CAPcommited " + deleteDollarSign(capCommitted));
    dispatch(
      addSelectedField(
        "capitalCommitted",
        deleteDollarSign(capCommitted),
        curProjId
      )
    );
    /*Financials */
    const financials = await getHttp("financials");
    const filterFinancials = fcCustom(financials.FieldNumber, financials.ListItems)
    dispatch(
      addSelectedField(
        "financials",
        R.map(x => x.Name.trim(), filterFinancials),
        curProjId
      )
    );
    pushToAllListItems(financials, "financials");
    /* Legal */
    const legal = await getHttp("legal");
    const filterLegal = fcCustom(legal.FieldNumber, legal.ListItems)
    dispatch(
      addSelectedField(
        "legal",
        R.map(x => x.Name.trim(), filterLegal),
        curProjId
      )
    );
    pushToAllListItems(legal, "legal");
    /* background */
    const background = await getHttp("background");
    const filterBackground = fcCustom(background.FieldNumber, background.ListItems)
    dispatch(
      addSelectedField(
        "background",
        R.map(x => x.Name.trim(), filterBackground),
        curProjId
      )
    );
    pushToAllListItems(background, "background");
    /*review status */
    const reviewStatus = await getHttp("reviewStatus");
    const filterReviewStatus = fcCustom(reviewStatus.FieldNumber, reviewStatus.ListItems)
    dispatch(
      addSelectedField(
        "reviewStatus",
        R.map(x => x.Name.trim(), filterReviewStatus),
        curProjId
      )
    );
    pushToAllListItems(reviewStatus, "reviewStatus");
    /* Status notes...a text field*/
    const reviewStatusNotes = await getHttp("statusNotes");
    const statusNotes =
      customFieldValue[`CustomField${reviewStatusNotes.FieldNumber}`];
    dispatch(addSelectedField("statusNotes", statusNotes, curProjId));
    pushToAllListItems(reviewStatusNotes, "statusNotes");
    /*Key people */
    const reviewKeyPeople = await getHttp("keypeople");
    const keypeople =
      customFieldValue[`CustomField${reviewKeyPeople.FieldNumber}`];
    dispatch(addSelectedField("keypeople", keypeople, curProjId));
    pushToAllListItems(reviewKeyPeople, "keypeople");
    /* recommendation */
    const reviewRecommendation = await getHttp("recommendation");
    const recommendation =
      customFieldValue[`CustomField${reviewRecommendation.FieldNumber}`];
    dispatch(addSelectedField("recommendation", recommendation, curProjId));
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
