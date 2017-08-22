//import R from 'ramda'
//TO DO delete all notifications

import { tablePage } from "../data";
const notifications = (state = [], action) => {
  console.log("reducer action.type : " + action.type);
  console.log("state: " + JSON.stringify(state.items));
  switch (action.type) {
    case "ACTS":
       console.log('reducer action.name and value '+[action.name,action.value])
      console.log("state.select ation.value " + [state.select, action.value]);
      let v = state.items.map(
        x => (x.id === state.select ? {...x, [action.name]: action.value } : x)
      );
      return { ...state, items: v };

    case "SELECTOR":
      console.log("action.id " + action.id);
      //return {...state, selectedObj:state.items[3]  ,select:Number(action.id)}
      return { ...state, select: Number(action.id) };

    default:
      return { items: tablePage, select: tablePage[0].id };
  }
};

export default notifications;
