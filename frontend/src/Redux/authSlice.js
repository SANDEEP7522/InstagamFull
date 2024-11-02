import { createSlice } from "@reduxjs/toolkit"
import SuggestedUser from "../Components/SuggestedUsers/SuggestedUser";


const authSlice = createSlice({
    name: "auth",
    initialState:{
        user:null,
        SuggestedUsers:[]
    },
    reducers:{
        setAuthUser:(state, action) =>{
        state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
        state.SuggestedUsers = action.payload;
    }
}
});
export const  {setAuthUser, setSuggestedUsers} = authSlice.actions;
export default authSlice.reducer; 
