import R from 'ramda'

export const isNumber = str => {
  const pattern = /^\d+$/;
  return pattern.test(str); // returns a boolean
};

export const numberAddCommas = (x) => {
     return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :null
}
export const prependDollarSign = (n) => {
  return R.test(/^[$]/, n) ?   n   : `$${n}`

}


export const  numberDeleteCommas = (x) => {
  return x.split(',').join('')
}
export const deleteDollarSign = (x) => {
  return   R.replace('$','', x)
}
