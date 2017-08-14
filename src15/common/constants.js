export const routes = {
  api: 'https://insight.bluesprucecapital.net/api/',
  base: 'https://insight.bluesprucecapital.net',
};

export const allFields = [
  {name:'familymembers', field:"CustomField5"},
  {name:'leadperson', field:'CustomField18'},
  {name:'investmenttype', field:"CustomField19"},
  {name:'minCapital', field: "CustomField13"},
  {name:'maxCapital', field: "CustomField14"},
  {name:"capitalCommitted", field:"CustomField15"},
  {name:'background', field:"CustomField17"},
  {name:'financials', field:"CustomField11"},
  {name:'investmentsubtype', field: "CustomField20"},
  {name:'legal', field:"CustomField16"},
  {name:'reviewStatus', field:"CustomField22"},
  {name:'statusNotes', field:"CustomField12"},
  {name:'keypeople', field:"CustomField21"},
  {name:'recommendation', field:"CustomField24"},
  {name:'quill', field:"CustomField24"},
]


export const colors = {
  border: '#ECECEC',
  background: '#FFFFFF',
  black: '#333333',
  error: '#FF0000',
  active: '#0000FF',
  red: '#FF0000',
  blue: '#0000FF',
};

export const styles = {
  headerStyle: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    elevation: 0,
  },
};

export const sizes = {
  postPreviewCharacterLimit: 250,
  screenPageClearance: 256,
};
