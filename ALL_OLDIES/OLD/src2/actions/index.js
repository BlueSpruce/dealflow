let nextTodoId = 0
export const acts = (text) => ({
  type: 'ACTS',
  id: nextTodoId++,
  text
})

 
