import axios from "axios";
import { useEffect } from "react";
// import { setPosts } from "@/redux/postSlice"
import { setPosts } from "../Redux/postSlice"
import { useDispatch } from "react-redux"
 
const useGetAllPost = () => {
 
   const dispatch = useDispatch();

    useEffect( () =>{
        const fetchAllPost = async () => {

        try {
          const res = await axios.get('http://localhost:8000/api/v1/post/all', {
            withCredentials: true, });

          //   console.log("Response from server:", res);      

         if (res.data.success) {
            console.log("res", res.data);
            dispatch(setPosts(res.data.posts));
         }  

        } catch (error) {
            console.log('error', error);
            
        }

        }
        fetchAllPost();
    }, []);
}
export default useGetAllPost;
