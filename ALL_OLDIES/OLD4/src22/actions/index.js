import * as HTTP from "../common/http";
import R from "ramda";
import {isNumber, numberAddCommas, numberDeleteCommas, prependDollarSign, deleteDollarSign} from "../utils/utils";
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
    const custFieldId = getState().data.projects[getState().data.select - 1].CustomFieldValue_Id;
    const objList = R.filter(x => x.name === name, allListItems);
    const fieldNum = R.props(["customFieldNumber"], objList[0]);
    let strCustField = "CustomField" + fieldNum;
    let returnValue ='';
    if(objList[0].listItems){
      returnValue = R.props(["Value"],R.find(x => x.Name.trim() == value, objList[0].listItems));
    }else{
      returnValue = value
    }
  //  console.log('strCustField '+strCustField)
  //  console.log('returnValue '+returnValue)
    const responseCustomField = await HTTP.postCustomField(
      custFieldId,
      strCustField,
      returnValue
    );
    dispatch(acts2({ name, value, id }));
  }


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
/* TEST */
const getHttp= async (field) => {
  let a = await HTTP[field]()
  let b = await a.json()
  return b
}
const pushToAllListItems = (field, name) => {
  allListItems.push({name:name, listItems:field.ListItems, customFieldNumber:field.FieldNumber})
}
  /*END TEST*/

export const selector = n => async (dispatch, getState) => {
  console.log("selector action n: " + n);

  if (getState().data.projects) {
    const curProjId = getState().data.projects[n-1].Id;
    const curProjCustFieldId = getState().data.projects[n-1].CustomFieldValue_Id;
    dispatch(selectorOriginial(n));
    /** GET ALL CUSTOM FIELD RESULTS FOR A PROJECT **/
    const response = await HTTP.customFieldValue(curProjCustFieldId);
    customFieldValue = await response.json();

    /* FAMILY MEMBERS */
    //const response2 = await HTTP.familymembers();
  //  const familymembers = await response2.json();
   const familymembers = await getHttp('familymembers');
    const s = R.filter(
      x => R.contains(x.Value, customFieldValue[`CustomField${familymembers.FieldNumber}`].split(",")),

      familymembers.ListItems
    );
    dispatch(
      addSelectedField("familymembers",R.map(x => x.Name, s),curProjId)
    );
   pushToAllListItems(familymembers,'familymembers')
    /*LEAD PERSON */
    const responseLeadPerson = await HTTP.leadPerson();
    const leadPerson = await responseLeadPerson.json();
    const s2 = R.filter(

      x => R.contains(x.Value, customFieldValue[`CustomField${leadPerson.FieldNumber}`].split(",")),
      leadPerson.ListItems
    );

    console.log('s2 '+s2)
    dispatch(
      addSelectedField("leadperson",R.map(x => x.Name, s2),curProjId  )
    );
    allListItems.push(
      {
        name: "leadperson",
        listItems: leadPerson.ListItems,
        customFieldNumber: leadPerson.FieldNumber
      }
    );
    /*INDUSTRY TYPE */
    const responseIndustry = await HTTP.industry();
    const industry = await responseIndustry.json();
    const tempName = `customFieldValue["CustomField${industry.FieldNumber}"]`
    const s3 = R.filter(
   x => R.contains(x.Value, customFieldValue[`CustomField${industry.FieldNumber}`].split(",")),
    //  x => R.contains(x.Value, customFieldValue["CustomField19"].split(",")),
      industry.ListItems
    );
    dispatch(
      addSelectedField("investmenttype",R.map(x => x.Name.trim(), s3),curProjId)
    );
      allListItems.push(
      {
        name: "investmenttype",
        listItems: industry.ListItems,
        customFieldNumber: industry.FieldNumber
      }
    );
    /*INDUSTRY SUBTYPE */
    const responseSubIndustry = await HTTP.industrySubType();
    const subIndustry = await responseSubIndustry.json();
    const s4 = R.filter(
       x => R.contains(x.Value, customFieldValue[`CustomField${subIndustry.FieldNumber}`].split(",")),
      subIndustry.ListItems
    );
    dispatch(
      addSelectedField("investmentsubtype",R.map(x => x.Name.trim(), s4),curProjId)
    );
      allListItems.push(
      {
        name: "investmentsubtype",
        listItems: subIndustry.ListItems,
        customFieldNumber: subIndustry.FieldNumber
      }
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
    const filterFinancials = R.filter(
       x => R.contains(x.Value, customFieldValue[`CustomField${financials.FieldNumber}`].split(",")),
      financials.ListItems
    );
    dispatch(
      addSelectedField(  "financials",R.map(x => x.Name.trim(), filterFinancials),curProjId)
    );
    allListItems.push(
      {
        name: "financials",
        listItems: financials.ListItems,
        customFieldNumber: financials.FieldNumber
      }
    );
    /* Legal */
    const responseLegal = await HTTP.legal();
    const legal = await responseLegal.json();
    const filterLegal = R.filter(
       x => R.contains(x.Value, customFieldValue[`CustomField${legal.FieldNumber}`].split(",")),
      legal.ListItems
    );
    dispatch(
      addSelectedField("legal",  R.map(x => x.Name.trim(), filterLegal),curProjId)
    );
      allListItems.push(
      {
        name: "legal",
        listItems: legal.ListItems,
        customFieldNumber: legal.FieldNumber
      }
    );
    /* background */
    const responseBackground = await HTTP.background();
    const background = await responseBackground.json();
    const filterBackground = R.filter(
       x => R.contains(x.Value, customFieldValue[`CustomField${background.FieldNumber}`].split(",")),
      background.ListItems
    );
    dispatch(
      addSelectedField("background",R.map(x => x.Name.trim(), filterBackground),curProjId)
    );
    allListItems.push(
      {
        name: "background",
        listItems: background.ListItems,
        customFieldNumber: background.FieldNumber
      }
    );

    /*review status */
    const responseReviewStatus = await HTTP.reviewStatus();
    const reviewStatus = await responseReviewStatus.json();
    const filterReviewStatus = R.filter(
       x => R.contains(x.Value, customFieldValue[`CustomField${reviewStatus.FieldNumber}`].split(",")),
      reviewStatus.ListItems
    );
    dispatch(
      addSelectedField("reviewStatus",R.map(x => x.Name.trim(), filterReviewStatus),curProjId)
    );
    allListItems.push(
      {
        name: "reviewStatus",
        listItems: reviewStatus.ListItems,
        customFieldNumber: reviewStatus.FieldNumber
      }
    );
    /* Status notes...a text field*/
    const responseStatusNotes = await HTTP.statusNotes();
    const reviewStatusNotes = await responseStatusNotes.json();
    const statusNotes = customFieldValue[`CustomField${reviewStatusNotes.FieldNumber}`];
    dispatch(
      addSelectedField(  "statusNotes",statusNotes,curProjId)
    );
    allListItems.push(
      {
        name: "statusNotes",
        listItems: reviewStatusNotes.ListItems,  //NULL
        customFieldNumber: reviewStatusNotes.FieldNumber
      }
    );

    /*Key people */
    const responseKeyPeople = await HTTP.keypeople();
    const reviewKeyPeople = await responseKeyPeople.json();
    const keypeople = customFieldValue[`CustomField${reviewKeyPeople.FieldNumber}`];
    dispatch(
      addSelectedField("keypeople",keypeople,curProjId)
    );
    allListItems.push(
      {
        name: "keypeople",
        listItems: reviewKeyPeople.ListItems,  //NULL
        customFieldNumber: reviewKeyPeople.FieldNumber
      }
    );
    /* recommendation */
    const responseRecommendation = await HTTP.recommendation();
    const reviewRecommendation = await responseRecommendation.json();
    const recommendation = customFieldValue[`CustomField${reviewRecommendation.FieldNumber}`];
    dispatch(
      addSelectedField("recommendation",recommendation,curProjId)
    );
    allListItems.push(
      {
        name: "recommendation",
        listItems: reviewRecommendation.ListItems,  //NULL
        customFieldNumber: reviewRecommendation.FieldNumber
      }
    );
    /*  for all fields make sure unique */
    allListItems = R.uniq(allListItems)
  }
  //todo...change logic?
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
