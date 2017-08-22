import R from 'ramda';

const projects =[{
        "ScheduleStartDate": "2017-06",
        "ProjectType_Id": 1,
        "ProjectStatus_Id": 11,
        "Name": "Freedom Run",
    },  {
        "ScheduleStartDate": "2017-07",
        "ProjectType_Id": 1,
        "ProjectStatus_Id": 12,
        "Name": "proj two",
    },{
        "ScheduleStartDate": "2017-08",
        "ProjectType_Id": 2,
        "ProjectStatus_Id": 12,
        "Name": "project three",
    },]
const projTypes=[{id:1, name:'type1'},{id:2, name:'type2'}]
const projStatuses=[{id:11,name:'status1'},{id:12,name:'status2'}]
//////////////////////////////////////////////////////////////////////

const getObj =( x, arr) => R.find(y => y.id === x, arr)
export const getTypesObj = (x,prjTypes) => getObj(x.ProjectType_Id, prjTypes)
export const getStatusObj = (x,prjStatuses) => getObj(x.ProjectStatus_Id,projStatuses)

const strName = x => R.prop('Name', x )

 

//export const mergeData = R.merge(data,data2)

export const mergeData = (prjects,prjTypes, prjStatuses) => {
  const d1 =  R.map(x =>
                   R.merge(x,
                           {projectType:strName(getTypesObj(x,prjTypes))}),
                   prjects)
  const d2 = R.map(x =>
                    R.merge(x,
                            {statusType:strName(getStatusObj(x,prjStatuses))}),
                    d1)
   return R.merge(d1,d2)

}
