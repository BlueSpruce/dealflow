import * as HTTP from "../common/http";
import R from "ramda";
import {
  //  isNumber,
  //  numberAddCommas,
  //  numberDeleteCommas,
  //  prependDollarSign,
  deleteDollarSign
} from "../utils/utils";
export const REQUEST_PROJECTS = "REQUEST_PROJECTS";
export const RECEIVE_PROJECTS = "RECEIVE_PROJECTS";
export const RECEIVE_GRAPHQL = "RECEIVE_GRAPHQL";

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
/*** form data is passing project id, but table data is not ***/
export const acts = (name, value) => async (dispatch, getState) => {
  console.log("acts called " + [name, value]);
  const id = getState().data.projects[getState().data.select - 1].Id;
  console.log(
    "proj id " + getState().data.projects[getState().data.select - 1].Id
  );
  const custFieldId = getState().data.projects[getState().data.select - 1]
    .CustomFieldValue_Id;
  const objList = R.filter(x => x.name === name, allListItems);
  const fieldNum = R.props(["customFieldNumber"], objList[0]);
  //console.log('fieldNum '+fieldNum)
  let strCustField = "CustomField" + fieldNum;
  let returnValue = "";
  if (objList[0].listItems) {
    console.log(
      "R.FILTER(x => x.Name == value, objList[0].listItems): " +
        JSON.stringify(
          R.filter(x => R.contains(x.Name.trim(), value), objList[0].listItems)
        )
    );
    //returnValue = R.props(["Value"],  R.filter(x => R.contains(x.Name,value), objList[0].listItems)
    returnValue = R.map(
      x => x.Value,
      R.filter(x => R.contains(x.Name.trim(), value), objList[0].listItems)
    );

    console.log("returnValue: " + returnValue);
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
export const addSelectedFieldText = (id, name, value, bCurrency = false) => ({
  type: "ADD-SELECTED-FIELD-TEXT",
  name: name,
  value: value,
  bCurrency: bCurrency,
  Id: id
});
export const addSelectedField2 = (id, name, value, multi) => ({
  type: "ADD-SELECTED-FIELD",
  name: name,
  value: value,
  Id: id,
  multi: multi
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
  //dispatch(requestPostsData());
  if (getState().data.projects) {
    const curProjId = getState().data.projects[n - 1].Id;
    const addSelectedField = addSelectField1(curProjId);
    const custFieldId = getState().data.projects[n - 1].CustomFieldValue_Id;
    dispatch(selectorOriginial(n));
    /** GET ALL CUSTOM FIELD RESULTS FOR A PROJECT **/
    const response = await HTTP.customFieldValue(custFieldId);
    customFieldValue = await response.json();
    const fcCustom = curriedFC(customFieldValue);
    /** FOR TEXT FIELDS **/
    const doTextField = async field => {
      const resultField = await getHttp(field);
      const resultValue =
        customFieldValue[`CustomField${resultField.FieldNumber}`];
      dispatch(addSelectedFieldText(curProjId, field, resultValue));
      pushToAllListItems(resultField, field);
    };
    /** FOR COMBOBOX FIELDS ***/
    const doSelectField = async (field, multi) => {
      const resultField = await getHttp(field);
      const s = fcCustom(resultField["FieldNumber"], resultField["ListItems"]);
      //  console.log('s... '+JSON.stringify(s))
      dispatch(addSelectedField(field, R.map(x => x.Name, s), multi));
      pushToAllListItems(resultField, field);
    };

    const doCurrencyField = async field => {
      const resultField = await getHttp(field);
      const resultValue =
        customFieldValue[`CustomField${resultField.FieldNumber}`];
      dispatch(
        addSelectedFieldText(
          curProjId,
          deleteDollarSign(field),
          resultValue,
          true
        )
      );
      pushToAllListItems(resultField, field);
    };
    /**/
    const selectFields = [
      { name: "familymembers", multi: true },
      { name: "leadPerson" },
      { name: "industry", multi: true },
      { name: "industrysubtype", multi: true },
      { name: "financials" },
      { name: "legal" },
      { name: "background" },
      { name: "reviewStatus" },
      { name: "recommendRating" }
    ];
    R.map(x => doSelectField(x.name, x.multi), selectFields);

    const currencyFields = [
      { name: "minCapital" },
      { name: "maxCapital" },
      { name: "capitalCommitted" }
    ];
    R.map(x => doCurrencyField(x.name), currencyFields);

    const textFields = [
      { name: "statusNotes" },
      { name: "keypeople" },
      { name: "recommendation" },
      { name: "keyfacts" },
      { name: "investmentOverview" },
      { name: "dealSummary" },
      { name: "totalProdCap" },
      { name: "prodBud" },
      { name: "financialProj" },
      { name: "distribWaterfall" },
      { name: "company" }
    ];
    R.map(x => doTextField(x.name), textFields);
    /*  for all fields -- make sure unique */
    allListItems = R.uniq(allListItems);
  }
  /** todo...change logic?  Logic to call once...  **/
  if (getState().data.projects) return;
  //console.log("select getState().projects[n].id " + getState().data.select);
  dispatch(requestPostsData());
  dispatch(getGraphql());
  /* TURNED OFF DISPATCH OF FOREIGN KEY FIELDS>>>GOING TO GRAPHQL ANYWAY */
  //dispatch(requestStatuses());
  //dispatch(requestTypes());
}; //if (getState().data.projects)
export const receiveGraphql = json => ({
  type: RECEIVE_GRAPHQL,
  testGraph: json,
  receivedAt: Date.now()
});
export const requestPostsData = () => async dispatch => {
  dispatch(requestPosts(posts));
  const response = await HTTP.postsData();
  const posts = await response.json();
  dispatch(receivePosts(posts));
  return posts;
};
/*
GRAPHQL CALL FOR INSTANCE replace requestPostsData with http call to graphql for projects
then call receivePosts as usual.  WATCH OUT...on return may be array inside array
 */

export const getGraphql = () => async dispatch => {
  const r2 = await HTTP.graphql();
  console.log("GRAPHQL CALL: " + JSON.stringify(r2));
  dispatch(receiveGraphql(r2));
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
