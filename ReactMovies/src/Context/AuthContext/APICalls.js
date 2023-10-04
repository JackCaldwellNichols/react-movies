import axios from "axios";
import { loginFailure, loginStart, loginSuccess, UpdateStart, UpdateSuccess, UpdateFail } from "./AuthActions";



export const login = async (user, dispatch, setMessage) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(import.meta.env.VITE_BASE_URL + '/auth/login', user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
        setMessage(error.response.data)
       
        
    }
}


export const signUp = async (user, navigate) => {
    try {
        await axios.post(import.meta.env.VITE_BASE_URL + '/auth/register', user)
        navigate('/login')
    } catch (error) {
        console.log(error)
    }
}


export const update = async (userName, email, file, setSuccess, dispatch, setLoading, id) => {
  dispatch(UpdateStart())
  const updatedUser = {
      id: id,
      username: userName,
      email,
    
   };
   if(file){
    const data = new FormData()
      const filename= Date.now() + file.name;
    data.append('name', filename)
      data.append('file', file)
      updatedUser.profilePic = filename
     try {
          await axios.post(import.meta.env.VITE_BASE_URL + '/upload', data)
      } catch (error) {
        setSuccess(false)
      }
  }
  try {
     const res = await axios.put(import.meta.env.VITE_BASE_URL + `/user/${id}`, updatedUser) 
//           // headers: {
     //     token: `Bearer ${user.token}`}
    //  })
    dispatch(UpdateSuccess(res.data))
     setSuccess(true)
     setLoading(false)
   } catch (error) {
    setSuccess(false)
    dispatch(UpdateFail())

    }
}

