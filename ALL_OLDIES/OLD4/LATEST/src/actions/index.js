import * as HTTP from "../common/http";
import R from "ramda";
import {isNumber,numberAddCommas,numberDeleteCommas,prependDollarSign,deleteDollarSign} from "../utils/utils";
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
  dispatch(acts2({ name, value, id }));
  console.log("acts called " + [name, value, id]);
  /** TO DO fix hack: name not recommendation **/
  if (name !== "recommendation") {
    const custFieldId = getState().data.projects[getState().data.select - 1].CustomFieldValue_Id;
    const objList = R.filter(x => x.name === name, allListItems);
    console.log("objList : " + JSON.stringify(objList));
    const fieldNum = R.props(["customFieldNumber"], objList[0]);
    console.log("fieldNum " + fieldNum);
    let strCustField = "CustomField" + fieldNum;
    let returnValue ='';
    if(objList[0].listItems){
      returnValue = R.props(["Value"],R.find(x => x.Name.trim() == value, objList[0].listItems));
    }else{
      returnValue = value
    }
    const responseCustomField = await HTTP.postCustomField(
      custFieldId,
      strCustField,
      returnValue
    );
    /* TO DO delete */
    const cf = await responseCustomField.json();
  }
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

export const selector = n => async (dispatch, getState) => {
  console.log("selector action n: " + n);

  if (getState().data.projects) {
    const curProjId = getState().data.projects[getState().data.select - 1].CustomFieldValue_Id;
    dispatch(selectorOriginial(n));
    /** GET ALL CUSTOM FIELD RESULTS FOR A PROJECT **/
    const response = await HTTP.customFieldValue(curProjId);
    customFieldValue = await response.json();
    console.log("CUSTOMFIELDVALUE " + JSON.stringify(customFieldValue));
    /* FAMILY MEMBERS */
    const response2 = await HTTP.familymembers();
    const familymembers = await response2.json();
    const s = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField5"].split(",")),
      familymembers.ListItems
    );
    dispatch(
      addSelectedField("familymembers",R.map(x => x.Name, s),curProjId)
    );
    /*LEAD PERSON */
    const responseLeadPerson = await HTTP.leadPerson();
    const leadPerson = await responseLeadPerson.json();
    console.log("leadPerson " + JSON.stringify(leadPerson));
    const s2 = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField18"].split(",")),
      leadPerson.ListItems
    );
    dispatch(
      addSelectedField("leadperson",R.map(x => x.Name, s2),curProjId  )
    );
    allListItems = [
      {
        name: "leadperson",
        listItems: leadPerson.ListItems,
        customFieldNumber: leadPerson.FieldNumber
      }
    ];
    // TO DO  allListItems = R.uniq(allListItems)

    /*INDUSTRY TYPE */
    const responseIndustry = await HTTP.industry();
    const industry = await responseIndustry.json();
    console.log("industry " + JSON.stringify(industry));
    const s3 = R.filter(
      // TO DO  ....  x => R.contains(x.Value, `CustomField${industry.FieldNumber}`.split(",")),
      x => R.contains(x.Value, customFieldValue["CustomField19"].split(",")),
      industry.ListItems
    );
    dispatch(
      addSelectedField("investmenttype",R.map(x => x.Name.trim(), s3),curProjId)
    );
    allListItems = [
      {
        name: "investmenttype",
        listItems: industry.ListItems,
        customFieldNumber: industry.FieldNumber
      }
    ];
    /*INDUSTRY SUBTYPE */
    const responseSubIndustry = await HTTP.industrySubType();
    const subIndustry = await responseSubIndustry.json();
    console.log("subindustry " + JSON.stringify(subIndustry));
    const s4 = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField20"].split(",")),
      subIndustry.ListItems
    );
    dispatch(
      addSelectedField("investmentsubtype",R.map(x => x.Name.trim(), s4),curProjId)
    );
    /* MIN CAPITAL */
    const minCap = customFieldValue["CustomField13"];
    console.log("MIN CAP " + deleteDollarSign(minCap));
    dispatch(
      addSelectedField(
        "minCapital",
        deleteDollarSign(minCap),
        curProjId
      )
    );
    /* MAX CAPITAL */
    const maxCap = customFieldValue["CustomField14"];
    console.log("MAX CAP " + deleteDollarSign(maxCap));
    dispatch(
      addSelectedField( "maxCapital",deleteDollarSign(maxCap),curProjId)
    );
    /*  CAPITAL committed */
    const capCommitted = customFieldValue["CustomField15"];
    console.log(" CAPcommited " + deleteDollarSign(capCommitted));
    dispatch(
      addSelectedField("capitalCommitted",deleteDollarSign(capCommitted),curProjId)
    );
    /*Financials */
    const responseFinancials = await HTTP.financials();
    const financials = await responseFinancials.json();
    console.log("financials " + JSON.stringify(financials));
    const filterFinancials = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField11"].split(",")),
      financials.ListItems
    );
    dispatch(
      addSelectedField(  "financials",R.map(x => x.Name.trim(), filterFinancials),curProjId)
    );
    /* Legal */
    const responseLegal = await HTTP.legal();
    const legal = await responseLegal.json();
    const filterLegal = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField16"].split(",")),
      legal.ListItems
    );
    dispatch(
      addSelectedField("legal",  R.map(x => x.Name.trim(), filterLegal),curProjId)
    );
    /* background */
    const responseBackground = await HTTP.background();
    const background = await responseBackground.json();
    const filterBackground = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField17"].split(",")),
      background.ListItems
    );
    console.log(
      "background list items " + JSON.stringify(background.ListItems)
    );
    console.log("background " + R.map(x => x.Name.trim(), filterBackground));
    dispatch(
      addSelectedField("background",R.map(x => x.Name.trim(), filterBackground),curProjId)
    );

    /*review status */
    const responseReviewStatus = await HTTP.reviewStatus();
    const reviewStatus = await responseReviewStatus.json();
    const filterReviewStatus = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField22"].split(",")),
      reviewStatus.ListItems
    );
    dispatch(
      addSelectedField("reviewStatus",R.map(x => x.Name.trim(), filterReviewStatus),curProjId)
    );
    /* Status notes */
    const responseStatusNotes = await HTTP.statusNotes();
    const reviewStatusNotes = await responseStatusNotes.json();
    const statusNotes = customFieldValue[`CustomField${reviewStatusNotes.FieldNumber}`];
    dispatch(
      addSelectedField(  "statusNotes",statusNotes,curProjId)
    );
    allListItems = [
      {
        name: "statusNotes",
        listItems: reviewStatusNotes.ListItems,  //NULL
        customFieldNumber: reviewStatusNotes.FieldNumber
      }
    ];
    /*Key people */
    const keyPeople = customFieldValue["CustomField21"];
    console.log("key people " + keyPeople);
    dispatch(
      addSelectedField("keypeople",keyPeople,curProjId)
    );
    /* recommendation */
    const recommendation = customFieldValue["CustomField24"];
    dispatch(
      addSelectedField("recommendation",recommendation,curProjId)
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
