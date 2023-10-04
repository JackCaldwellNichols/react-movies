const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START": {
            return {
                user: null,
                isFetching: true,
                error: false
            }
        };
        case "LOGIN_SUCCESS": {
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        };
        case "LOGIN_FAIL": {
            return {
                user: null,
                isFetching: false,
                error: true,
                
            }
        };
        case "LOGOUT": {
            return {
                user: null,
                isFetching: false,
                error: false
            }
        }
        case "UPDATE_START": 
            return{
                ...state,
                isFetching:true
            }

        case "UPDATE_SUCCESS":
            return{
                user: action.payload,
                isFetching:false,
                error:false
            }
        case "UPDATE_FAILURE":
            return{
                user: state.user,
                isFetching:false,
                error:true
            }


        case "ADD_MOVIE":
            return{
                ...state, 
                user: {
                    ...state.user,
                    watchlist: [...state.user.watchlist, action.payload]
                }
            }
            case "REMOVE_FAV":
                return{
                    ...state, 
                    user: {
                        ...state.user,
                        following: state.user.watchlist.filter((movie) => movie !== action.payload)
                    }
                };
            default: 
                return {...state}
    }
}

export default AuthReducer;