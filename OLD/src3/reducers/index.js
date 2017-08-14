//import R from 'ramda'
//TO DO delete all notifications

import { tablePage } from "../data";
const notifications = (state = [], action) => {
  console.log("reducer action.type : " + action.type);
  switch (action.type) {
    case "ACTS":
      return {
        ...state,
        selectedObj: action.obj
      }


    default:
      return  {...tablePage, selectedObj:tablePage[0]};
  }
};

export default notifications;
