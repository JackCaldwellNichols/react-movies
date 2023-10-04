export const loginStart = () => ({
    type: "LOGIN_START"
})


export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
})



export const loginFailure = () => ({
    type: "LOGIN_FAIL",

})

//logout



export const logout = () => ({
    type: "LOGOUT"
})


//update

export const UpdateStart = (userCredentials)=> ({
    type: "UPDATE_START"
})


export const UpdateSuccess = (user)=> ({
    type:"UPDATE_SUCCESS", payload: user
})

export const UpdateFail = () => ({
    type: "UPDATE_FAILURE"
})



//add to watchlist

export const Add = (id) => ({
    type: "ADD_FAV",
    payload: id
})



export const unFav = (id) => ({
    type: "REMOVE_FAV",
    payload: id
})









