import * as Constants from "./constants";
import { createApolloFetch } from "apollo-fetch";

const toke =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDY1MzY5NDksImV4cCI6MjEzNzY4ODk0OSwic3ViIjoiZTBlMjI0YWMtMDZhNy00MmZhLWI4NzMtYWYyNDlkYjFlN2Y1In0.b-uVbw6TbsA-nmjf1yuQZuV_0njHDjEme6UrIPwfsuymfE13uLGGMheu8RvKdB40RUz_2nrUf9nbdkZDE42oYA";

const requestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
export const postCustomField = (value1, field, value) => {
  console.log("http.js postCustomField() " + [value1, field, value]);
  //let testObj = {id:value1, }
  const options = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({ id: `${value1}`, [field]: `${value}` })
  };
  return fetch(
    `${Constants.routes.api}custom-field-value?api-token=${toke}`,
    options
  );
};

export const projectStatuses = () => {
  return fetch(
    `${Constants.routes.api}project-status/list-all?api-token=${toke}`
  );
};
export const projectTypes = () => {
  return fetch(
    `${Constants.routes.api}project-type/list-all?api-token=${toke}`
  );
};

//   `${apiPath}project/active-and-planning-user-can-view?api-token=${toke}`

export const postsData = () => {
  return fetch(`${Constants.routes.api}project/active?api-token=${toke}`);
};

export const graphql = () => {
  const fetch = createApolloFetch({
    uri: "https://1jzxrj179.lp.gql.zone/graphql"
  });
  const query = "{ posts { title }}";
  //const variables = { filter: { title: "Welcome to Apollo" } };
  return fetch({
    query
    //  variables
  }).then(res => {
    console.log("GRAPH FROM HTTP " + res.data);
    return res.data;
  });
};

export const customFieldValue = (
  n = "a2302ef8-3e86-4358-979e-18eb3ce7c9d6"
) => {
  //console.log('customFieldValue: '+n)
  return fetch(
    `${Constants.routes.api}custom-field-value/${n}?api-token=${toke}`
  );
};

const customField = n => {
  //  console.log('customField '+n)
  return fetch(`${Constants.routes.api}custom-field/${n}?api-token=${toke}`);
};
/** NO PARAMS PASSED TO THESE STATIC VALUES < DEFAULT VALUE USED */
export const familymembers = (n = "35386602-f0be-4853-ab1c-2283d5092968") => {
  return customField(n);
};
export const leadPerson = (n = "6d6919d7-9a8e-4ce6-a38a-a0dfdbdeae10") => {
  return customField(n);
};
export const industry = (n = "21ade49f-8027-4eeb-ab86-7495b91449c2") => {
  return customField(n);
};
export const industrysubtype = (n = "d8f02f4f-5f25-4b99-a784-4a2b7ce04408") => {
  return customField(n);
};
export const financials = (n = "08f2b033-1bbf-41e1-b32a-971ab7fb32c8") => {
  return customField(n);
};
export const legal = (n = "d542bec3-9947-4a57-a7e2-edb33ec71954") => {
  return customField(n);
};
export const background = (n = "adbc786b-6924-49d5-892c-be19e35ba9ac") => {
  return customField(n);
};
export const reviewStatus = (n = "da65c0da-e760-48e9-8d87-0399f41df2ab") => {
  return customField(n);
};
export const keypeople = (n = "f28b1b2d-bc45-4894-b1b7-2069c579ccde") => {
  return customField(n);
};
export const statusNotes = (n = "dd41e818-a66d-426b-b1a9-8cef55363b35") => {
  return customField(n);
};
export const minCapital = (n = "5bd7e52b-57f7-4c43-b412-578df5c3b51a") => {
  return customField(n);
};
export const maxCapital = (n = "f839eda0-7f91-4e03-a145-effcdf265545") => {
  return customField(n);
};
export const capitalCommitted = (
  n = "61266009-b8b1-4776-bc58-cc758adc32be"
) => {
  return customField(n);
};
export const fileAttachments = (n = "83edd11e-acab-4252-8894-ba114e96fd67") => {
  return customField(n);
};
export const recommendation = (n = "af70049d-51e6-44ed-92a3-3517f4115456") => {
  return customField(n);
};
/**** new cust fields for exec summary: ****/
export const keyfacts = (n = "138004c5-bc8a-4bf4-9bb4-b91c373574aa") => {
  return customField(n);
};
export const investmentOverview = (
  n = "5bf75741-b483-4bc1-80d6-b90e8431ff5d"
) => {
  return customField(n);
};
export const dealSummary = (n = "b4cbb3e5-eeae-4b3c-a8c2-428929daa43a") => {
  return customField(n);
};

export const totalProdCap = (n = "66e041ae-d386-4918-977e-490c13060e7c") => {
  return customField(n);
};
export const prodBud = (n = "86676ded-7a69-45f7-9c13-4735a7d9ce25") => {
  return customField(n);
};
export const financialProj = (n = "af09007c-2832-4481-a4d5-568fbfa6ea2d") => {
  return customField(n);
};
export const distribWaterfall = (
  n = "43072643-6eff-4ca5-ac1b-9fb219c7a18d"
) => {
  return customField(n);
};
export const company = (n = "febc1a2d-bd51-4b70-a401-d5ded39e509a") => {
  return customField(n);
};
export const recommendRating = (n = "8e84d713-e190-42f5-9af1-2a811b771c77") => {
  return customField(n);
};
/**/
/**
TEXT FIELDS...
KEY PEOPLE   (CustomFIeld21)  = f28b1b2d-bc45-4894-b1b7-2069c579ccde
 STATUS NOTES (CustomField12)  =   dd41e818-a66d-426b-b1a9-8cef55363b35
MIN CAPITAL (CustomFIeld13)  =    5bd7e52b-57f7-4c43-b412-578df5c3b51a
FILE ATTACHMENTS     (CustomFIeld23)      =   83edd11e-acab-4252-8894-ba114e96fd67
RECOMMENDATION   (CustomFIeld24)      =  af70049d-51e6-44ed-92a3-3517f4115456
MAX CAP      f839eda0-7f91-4e03-a145-effcdf265545
CAP COMMITTED    61266009-b8b1-4776-bc58-cc758adc32be



/* samples...
export const postPublish = ({ content, title }) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
    body: JSON.stringify({
      content,
      title,
    }),
  };

  return fetch(`${Constants.routes.api}/posts`, options);
};

export const postDelete = ({ postId }) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include',
  };

  return fetch(`${Constants.routes.api}/posts/${postId}`, options);
};

export const comments = () => {
  return fetch(`${Constants.routes.api}/comments`);
};

export const commentDelete = ({ commentId, postId }) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include',
  };

  return fetch(
    `${Constants.routes.api}/posts/${postId}/comments/${commentId}`,
    options
  );
};

export const commentPublish = ({ postId, content }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      postId,
      content,
    }),
  };

  return fetch(`${Constants.routes.api}/comments`, options);
};

export const logOut = () => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
  };

  return fetch(`${Constants.routes.api}/logout`, options);
};

export const logIn = ({ username, password }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      username: username.toLowerCase(),
      password,
    }),
  };

  return fetch(`${Constants.routes.api}/login`, options);
};

export const signUp = ({ username, password, confirm }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      username: username.toLowerCase(),
      password: password,
      verify: confirm,
    }),
  };

  return fetch(`${Constants.routes.api}/signup`, options);
};

export const checkAuth = () => {
  return fetch(`${Constants.routes.api}/authenticated`);
};
*/
