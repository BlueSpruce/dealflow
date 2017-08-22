import * as HTTP from "../common/http";
import R from "ramda";
import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../utils/utils";
export const REQUEST_PROJECTS = "REQUEST_PROJECTS";
export const RECEIVE_PROJECTS = "RECEIVE_PROJECTS";
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
/*--------------------------------------------*/
/* SUPPORT FUNCTIONS */
/* function filterAndContains */
const fC = (cfv, n, list) => {
  const a = x => R.contains(x.Value, cfv[`CustomField${n}`].split(","));
  return R.filter(x => a(x), list);
};
const curriedFC = R.curry(fC);
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
  /** BASIC PROJECT DATA HAS BEEN LOADED BEFORE THIS CODE RUNS**/
  if (getState().data.projects) {
    const curProjId = getState().data.projects[n - 1].Id;
    const addSelectedField = addSelectField1(curProjId);
    const custFieldId = getState().data.projects[n - 1].CustomFieldValue_Id;
    dispatch(selectorOriginial(n));
    /** GET ALL CUSTOM FIELD RESULTS FOR A PROJECT **/
    const response = await HTTP.customFieldValue(custFieldId);
    customFieldValue = await response.json();
    const fcCustom = curriedFC(customFieldValue);
    /** FOR COMBOBOX FIELDS ***/
    const doSelectField = async field => {
      const resultField = await getHttp(field);
      const s = fcCustom(resultField["FieldNumber"], resultField["ListItems"]);
      dispatch(addSelectedField(field, R.map(x => x.Name, s)));
      pushToAllListItems(resultField, field);
    };
    /** FOR TEXT FIELDS **/
    const doTextField = async field => {
      const resultField = await getHttp(field);
      const resultValue =
        customFieldValue[`CustomField${resultField.FieldNumber}`];
      dispatch(addSelectedField2(curProjId, field, resultValue));
      pushToAllListItems(resultField, field);
    };
    const doCurrencyField = async field => {
      const resultField = await getHttp(field);
      const resultValue =
        customFieldValue[`CustomField${resultField.FieldNumber}`];
      dispatch(
        addSelectedField2(curProjId, deleteDollarSign(field), resultValue)
      );
    };
    /**/
    const selectFields = [
      { name: "familymembers" },
      { name: "leadPerson" },
      { name: "industry" },
      { name: "industrysubtype" },
      { name: "financials" },
      { name: "legal" },
      { name: "background" },
      { name: "reviewStatus" }
    ];
    R.map(x => doSelectField(x.name), selectFields);

    const currencyFields = [
      { name: "minCapital" },
      { name: "maxCapital" },
      { name: "capitalCommitted" }
    ];
    R.map(x => doCurrencyField(x.name), currencyFields);

    const textFields = [
      { name: "statusNotes" },
      { name: "keypeople" },
      { name: "recommendation" }
    ];
    R.map(x => doTextField(x.name), textFields);
    /*  for all fields -- make sure unique */
    allListItems = R.uniq(allListItems);
  }
  /** todo...change logic?  Logic to call once...  **/
  if (getState().data.projects) return;
  console.log("select getState().projects[n].id " + getState().data.select);
  dispatch(requestPostsData());
  /* TURN OFF DISPATCH OF FOREIGN KEY FIELDS>>>GOING TO GRAPHQL ANYWAY */
  //dispatch(requestStatuses());
  //dispatch(requestTypes());
}; //if (getState().data.projects)

export const requestPostsData = () => async dispatch => {
  dispatch(requestPosts(posts));
  const response = await HTTP.postsData();
  const posts = await response.json();
  dispatch(receivePosts(posts));
  return posts;
};
export const requestPosts = () => ({
  type: REQUEST_PROJECTS
});
export const receivePosts = json => ({
  type: RECEIVE_PROJECTS,
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
