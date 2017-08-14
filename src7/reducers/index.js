//import R from 'ramda'
import { REQUEST_POSTS, RECEIVE_POSTS } from "../actions";

import { tablePage } from "../data";

const notifications = (state = [], action) => {
  console.log("reducer action.type : " + action.type);
  switch (action.type) {
    case "ACTS":
      console.log("reducer action.name and value and Id " + [action.name, action.value, action.Id]);
      let v = state.projects.map(x => (x.Id === action.Id ? { ...x, [action.name]: action.value } : x));
      return { ...state, projects: v };
    case "SELECTOR":
      console.log("action.id " + action.id);
      return { ...state, select: Number(action.id) };
    case "ADD":
      let newItems = Object.assign({}, ...state.projects, { id: action.id });
      return {
        ...state,
        projects: [
          ...state.projects,
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
    case 'ADD-SELECTED-FIELD':
      let v2 = state.projects.map(x => (x.Id === action.Id ? { ...x, [action.name]: action.value } : x));
      return { ...state, projects: v2 };
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
      return {};
  }
};

export default notifications;
