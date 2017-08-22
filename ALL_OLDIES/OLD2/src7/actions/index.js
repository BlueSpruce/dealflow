let nextTodoId = 26
export const acts = (name, value) => ({
  type: 'ACTS',
  name: name,
  value: value,
})

export const selector = (n) => ({
  type: 'SELECTOR',
  id: n,

})
export const add = () => ({
  type: 'ADD',
  id: nextTodoId++
})
