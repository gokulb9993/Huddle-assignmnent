const intialUi = {
    error: {
        show: false,
        path: '',
        type: '',
        status: null
    },
    posts: {
        isLoading: false,
        hasError: false,
        posts: []
    },
    users: {
        isLoading: false,
        hasError: false,
        users: []
    }
}

function appReducer(state = intialUi, action) {

    switch (action.type) {
        case 'GET_POSTS_REQUEST': 
            return {
                ...state,
                posts: {
                    ...state.posts,
                    isLoading: true,
                    hasError: false
                }
            };
        case 'GET_POSTS_SUCCESS': 
            return {
                ...state,
                posts: {
                    ...state.posts,
                    isLoading: false,
                    posts: action.payload
                }
            };
            case 'GET_POSTS_FAILURE': 
            return {
                ...state,
                posts: {
                    ...state.posts,
                    isLoading: false,
                    hasError: true
                }
            }
        case 'GET_USERS_REQUEST': 
            return {
                ...state,
                users: {
                    ...state.users,
                    isLoading: true,
                    hasError: false
                }
            };
        case 'GET_USERS_SUCCESS': 
            return {
                ...state,
                users: {
                    ...state.users,
                    isLoading: false,
                    users: action.payload
                }
            };
            case 'GET_USERS_FAILURE': 
            return {
                ...state,
                users: {
                    ...state.users,
                    isLoading: false,
                    hasError: true
                }
            }
        default:
            return state;
    }
}

export default appReducer;