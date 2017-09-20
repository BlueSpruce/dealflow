import R from "ramda";
import {
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  RECEIVE_GRAPHQL
} from "../actions";

//import { tablePage } from "../data";
import { numberDeleteCommas, deleteDollarSign } from "../utils/utils";

let projectOrder = 1;

const notifications = (state = [], action) => {
  //  console.log("reducer action.type : " + [action.type, action.name]);
  switch (action.type) {
    case "ACTS2":
      //console.log(
      //  "reducer ACTS2 action.name and value and Id " +
      //  [action.name, action.value, action.Id]
      //  );
      let v = state.projects.map(
        x => (x.Id === action.Id ? { ...x, [action.name]: action.value } : x)
      );
      return { ...state, projects: v };
    //return {...state}
    case "SELECTOR":
      //  console.log("action.id " + action.id);
      return { ...state, select: Number(action.id) };
    case "ADD":
      //  let newItems = Object.assign({}, ...state.projects, { id: action.id });
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
    case "ADD-SELECTED-FIELD-TEXT":
      //  console.log('ASFText name,value,currency :'+action.name+"|"+action.value+"|"+action.bCurrency)
      let v2 = state.projects.map(
        x =>
          x.Id === action.Id
            ? {
                ...x,
                [action.name]: action.bCurrency
                  ? Math.round(
                      numberDeleteCommas(deleteDollarSign(action.value))
                    )
                  : action.value
              }
            : x
      );
      return { ...state, projects: v2 };
    case "ADD-SELECTED-FIELD":
      //console.log('ASF name,value,multi :'+action.name+"|"+action.value+"|"+action.multi)
      v2 = state.projects.map(
        x =>
          x.Id === action.Id
            ? {
                ...x,
                [action.name]: action.multi ? action.value : action.value[0]
              }
            : x
      );
      return { ...state, projects: v2 };
    case REQUEST_PROJECTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_PROJECTS:
      //const v3 = action.posts.map( x => ...x, projectOrder:projectOrder++)
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        //projects: action.posts.map( x => {x, projectOrder:projectOrder++}),
        projects: R.map(
          x => R.merge(x, { order: projectOrder++ }),
          action.posts
        ),
        lastUpdated: action.receivedAt
      };
    case RECEIVE_GRAPHQL:
      return {
        ...state,
        posts: action.testGraph.posts
      };
    case "RECEIVE_STATUSES":
      return {
        ...state,
        projectStatuses: action.status
      };
    case "RECEIVE_TYPES":
      return {
        ...state,
        projectTypes: action.projectTypes
      };
    default:
      return { select: 1 };
  }
};

export default notifications;
