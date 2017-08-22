//import R from 'ramda'
//TO DO delete all notifications

import { tablePage } from "../data";
const notifications = (state = [], action) => {
  console.log("reducer action.type : " + action.type);
  console.log('state: '+state.items)
  switch (action.type) {
    case "ACTS":
    let v = state.items.map(
      x => (x.id === action.id ? { ...action.obj } : x)
    )
    return {items: v, selectedObj:action.obj}

    default:
      return  {items:tablePage, selectedObj:tablePage[0]};
  }
};

export default notifications;
