import axios from "axios";
import { useEffect } from "react";
// import { setPosts } from "@/redux/postSlice"
import { setPosts } from "../Redux/postSlice"
import { useDispatch } from "react-redux"
import { setSuggestedUsers } from "../Redux/authSlice";
 
const useGetSuggestedUsers = () => {
 
   const dispatch = useDispatch();

    useEffect( () =>{
        const fetchSuggestedUsers = async () => {

        try {
          const res = await axios.get('http://localhost:8000/api/v1/user/suggected', {
            withCredentials: true, });

          //   console.log("Response from server:", res);      

         if (res.data.success) {
            console.log("res", res.data);
            dispatch(setSuggestedUsers(res.data.posts));
         }  

        } catch (error) {
            console.log('error', error);
            
        }

        }
        fetchSuggestedUsers();
    }, []);
}
export default useGetSuggestedUsers;
