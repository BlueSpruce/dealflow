/*LEAD PERSON */
const responseLeadPerson = await HTTP.leadPerson();
const leadPerson = await responseLeadPerson.json();
const s2 = R.filter(
  x => R.contains(x.Value, customFieldValue["CustomField18"].split(",")),
  leadPerson.ListItems
);
dispatch(
  addSelectedField("leadperson",R.map(x => x.Name, s2),curProjId  )
);

  /**************/
  /*  getData   => obj.listItems */
let a = getData('familymembers')
/* getSelectedValue  => arr of selection(s) */
let b = getSelectedValue(a)
dispatch(addSelectedField('familymember',b))

async getData(field){
  const a = await HTTP.[field]();
  const b = await a.json()
  return b
}

async 
