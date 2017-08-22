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
  const allFields =[
    {name:'familymembers', field:"CustomField5"},
    {name:'leadPerson', field:'CustomField18'},
    {name:'investmenttype', field:"CustomField19"},
    {name:'minCapital', field: "CustomerField13"},
    {name:'maxCapital', field: "CustomerField14"},

]

  dispatch(selectorOriginial(n));
  if (getState().data.projects) {
    const response = await HTTP.customFieldValue(
      getState().data.projects[getState().data.select - 1].CustomFieldValue_Id
    );
    const customFieldValue = await response.json();
    console.log('CUSTOMFIELDVALUE '+JSON.stringify(customFieldValue))
    /* FAMILY MEMBERS */
    const response2 = await HTTP.familymembers();
    const familymembers = await response2.json();
    const s = R.filter(
      x => R.contains(x.Value, customFieldValue["CustomField5"].split(",")),
      familymembers.ListItems
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
          R.map(x => x.Name, s2),
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
      /*INDUSTRY SUBTYPE */
      const responseSubIndustry = await HTTP.industrySubType();
      const subIndustry = await responseSubIndustry.json();
      console.log('subindustry '+JSON.stringify(subIndustry))
      const s4 = R.filter(
        x => R.contains(x.Value, customFieldValue["CustomField20"].split(",")),
        subIndustry.ListItems
      );
      dispatch(
        addSelectedField(
          "investmentsubtype",
          R.map(x => x.Name.trim(), s4),
          getState().data.projects[getState().data.select - 1].Id
        )
      );
      /* MIN CAPITAL */
      const minCap = customFieldValue["CustomField13"]
      console.log("MIN CAP "+deleteDollarSign(minCap))
      dispatch(
        addSelectedField(
          "minCapital",
          deleteDollarSign(minCap),
          getState().data.projects[getState().data.select - 1].Id
        )
      );
      /* MAX CAPITAL */
      const maxCap = customFieldValue["CustomField14"]
      console.log("MAX CAP "+deleteDollarSign(maxCap))
      dispatch(
        addSelectedField(
          "maxCapital",
          deleteDollarSign(maxCap),
          getState().data.projects[getState().data.select - 1].Id
        )
      );
      /*  CAPITAL committed */
      const capCommitted = customFieldValue["CustomField15"]
      console.log(" CAPcommited "+deleteDollarSign(capCommitted))
      dispatch(
        addSelectedField(
          "capitalCommitted",
          deleteDollarSign(capCommitted),
          getState().data.projects[getState().data.select - 1].Id
        )
      );
      /*Financials */
        const responseFinancials = await HTTP.financials();
        const financials = await responseFinancials.json();
        console.log('financials '+JSON.stringify(financials))
        const filterFinancials = R.filter(
          x => R.contains(x.Value, customFieldValue["CustomField11"].split(",")),
          financials.ListItems
        );
        dispatch(
          addSelectedField(
            "financials",
            R.map(x => x.Name.trim(), filterFinancials),
            getState().data.projects[getState().data.select - 1].Id
          )
        );
        /* Legal */
        const responseLegal = await HTTP.legal();
        const legal = await responseLegal.json();
        const filterLegal = R.filter(
          x => R.contains(x.Value, customFieldValue["CustomField16"].split(",")),
          legal.ListItems
        );
        dispatch(
          addSelectedField(
            "legal",
            R.map(x => x.Name.trim(), filterLegal),
            getState().data.projects[getState().data.select - 1].Id
          )
        );
        /* background */
        const responseBackground = await HTTP.background();
        const background = await responseBackground.json();
        const filterBackground = R.filter(
          x => R.contains(x.Value, customFieldValue["CustomField17"].split(",")),
          background.ListItems
        );
        console.log('background list items '+JSON.stringify(background.ListItems))
        console.log('background '+R.map(x => x.Name.trim(), filterBackground))
        dispatch(
          addSelectedField(
            "background",
            R.map(x => x.Name.trim(), filterBackground),
            getState().data.projects[getState().data.select - 1].Id
          )
        );

       /*review status */
        const responseReviewStatus = await HTTP.reviewStatus();
        const reviewStatus = await responseReviewStatus.json();
        const filterReviewStatus = R.filter(
          x => R.contains(x.Value, customFieldValue["CustomField22"].split(",")),
          reviewStatus.ListItems
        );
        dispatch(
          addSelectedField(
            "reviewStatus",
            R.map(x => x.Name.trim(), filterReviewStatus),
            getState().data.projects[getState().data.select - 1].Id
          )
        );
        /* Status notes */
        const statusNotes = customFieldValue["CustomField12"]
        console.log("status notes "+deleteDollarSign(minCap))
        dispatch(
          addSelectedField(
            "statusNotes",
            statusNotes,
            getState().data.projects[getState().data.select - 1].Id
          )
        );
        /*Key people */
        const keyPeople = customFieldValue["CustomField21"]
        console.log('key people '+keyPeople)
        dispatch(
          addSelectedField(
            "keyPeople",
            keyPeople,
            getState().data.projects[getState().data.select - 1].Id
          )
        );
        /* recommendation */
        const recommendation = customFieldValue["CustomField24"]
        dispatch(
          addSelectedField(
            "recommendation",
            recommendation,
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
