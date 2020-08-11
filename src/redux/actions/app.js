import { RSAA } from 'redux-api-middleware';

export const getAllPosts = function(){
    return {
      [RSAA]: {
        endpoint: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET',
        types: ['GET_POSTS_REQUEST', 'GET_POSTS_SUCCESS', 'GET_POSTS_FAILURE']
      }
    }
}

export const getAllUsers = function(){
    return {
      [RSAA]: {
        endpoint: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        types: ['GET_USERS_REQUEST', 'GET_USERS_SUCCESS', 'GET_USERS_FAILURE']
      }
    }
}