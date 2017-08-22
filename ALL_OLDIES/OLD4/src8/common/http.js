import * as Constants from './constants';
const toke =
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MDE1MTM5NzAsImV4cCI6MTU4MDQ1NDAwMCwic3ViIjoiM2I0NmFlOTUtM2NkOC00YzU0LTljNzctMmQ2YjU0MjNhOGE2In0.q2k-FP9iJ7SruHAHxQaU3CxK8-K8k74chJ_mYA7JkuFsdRwiqPpgOD9hgJFQLHZ7NeBnB43t9Wf_1AZQ3VNMRw";


const requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const projectStatuses = () => {
  return fetch(`${Constants.routes.api}project-status/list-all?api-token=${toke}`);
};
export const projectTypes = () => {
  return fetch(`${Constants.routes.api}project-type/list-all?api-token=${toke}`);
};

//   `${apiPath}project/active-and-planning-user-can-view?api-token=${toke}`

export const postsData = () => {
    return fetch(`${Constants.routes.api}project/active-and-planning-user-can-view?api-token=${toke}`);
}

export const customFieldValue = (n ='a2302ef8-3e86-4358-979e-18eb3ce7c9d6') => {
  console.log('customFieldValue: '+n)
     return fetch(`${Constants.routes.api}custom-field-value/${n}?api-token=${toke}`);
}

const customField = (n) => {
  console.log('customField '+n)
     return fetch(`${Constants.routes.api}custom-field/${n}?api-token=${toke}`);
}
/** NO PARAMS PASSED TO THESE STATIC VALUES < DEFAULT VALUE USED */
export const familyMembers = (n ='35386602-f0be-4853-ab1c-2283d5092968') => {
     return customField(n)
}
export const leadPerson = (n ='6d6919d7-9a8e-4ce6-a38a-a0dfdbdeae10') => {
     return customField(n)
}
export const industry = (n ='21ade49f-8027-4eeb-ab86-7495b91449c2') => {
     return customField(n)
}
/**/





/* samples...
export const postPublish = ({ content, title }) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
    body: JSON.stringify({
      content,
      title,
    }),
  };

  return fetch(`${Constants.routes.api}/posts`, options);
};

export const postDelete = ({ postId }) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include',
  };

  return fetch(`${Constants.routes.api}/posts/${postId}`, options);
};

export const comments = () => {
  return fetch(`${Constants.routes.api}/comments`);
};

export const commentDelete = ({ commentId, postId }) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include',
  };

  return fetch(
    `${Constants.routes.api}/posts/${postId}/comments/${commentId}`,
    options
  );
};

export const commentPublish = ({ postId, content }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      postId,
      content,
    }),
  };

  return fetch(`${Constants.routes.api}/comments`, options);
};

export const logOut = () => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
  };

  return fetch(`${Constants.routes.api}/logout`, options);
};

export const logIn = ({ username, password }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      username: username.toLowerCase(),
      password,
    }),
  };

  return fetch(`${Constants.routes.api}/login`, options);
};

export const signUp = ({ username, password, confirm }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      username: username.toLowerCase(),
      password: password,
      verify: confirm,
    }),
  };

  return fetch(`${Constants.routes.api}/signup`, options);
};

export const checkAuth = () => {
  return fetch(`${Constants.routes.api}/authenticated`);
};
*/
