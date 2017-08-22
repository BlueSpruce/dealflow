//import R from 'ramda'
//TO DO delete all notifications
const notifications = (state = [], action) => {
  console.log("reducer ACTS " + action.type);
  switch (action.type) {
    case "ACTS":
      return [
        ...state,
        {
          id: action.id

        }
      ];

    default:
      return state;
  }
};

export default notifications;
