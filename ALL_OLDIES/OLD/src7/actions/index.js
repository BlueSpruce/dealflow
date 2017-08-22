let nextTodoId = 0
export const acts = (name, value) => ({
  type: 'ACTS',
  name: name,
  value: value,
})

export const selector = (n) => ({
  type: 'SELECTOR',
  id: n,

})
