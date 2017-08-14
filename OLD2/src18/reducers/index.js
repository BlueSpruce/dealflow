//import R from 'ramda'
import { REQUEST_POSTS, RECEIVE_POSTS } from "../actions";

import { tablePage } from "../data";
const notifications = (state = [], action) => {
  console.log("reducer action.type : " + action.type);
  //console.log("state: " + JSON.stringify(state.items));
  switch (action.type) {
    case "ACTS":
      console.log("reducer action.name and value " + [action.name, action.value]);
      console.log("state.select ation.value " + [state.select, action.value]);
      let v = state.items.map(x => (x.id === state.select ? { ...x, [action.name]: action.value } : x));
      return { ...state, items: v };
    case "SELECTOR":
      console.log("action.id " + action.id);
      return { ...state, select: Number(action.id) };
    case "ADD":
      let newItems = Object.assign({}, ...state.items, { id: action.id });
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.id,
            dateReceived: "",
            familymembers: "",
            dealname: "",
            investmenttype: "",
            financials: "",
            legalreview: "",
            reqcapital: "",
            status: "",
            quill: "",
            keypeople: "",
            background: "",
            leadPerson: ""
          }
        ],
        select: action.id
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        projects: action.posts,
        lastUpdated: action.receivedAt
      };
    case "RECEIVE_STATUSES":
      return {
        ...state,
        projectStatuses: action.statuses
      };
    case "RECEIVE_TYPES":
      return {
        ...state,
        projectTypes: action.projectTypes
      };
    default:
      return { items: tablePage, select: 1 };
  }
};

export default notifications;
