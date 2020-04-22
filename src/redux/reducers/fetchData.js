import { GET_DATA } from "../actions/actionTypes";

export default fetchData = (state=[],aciton)=>{
    switch(aciton.type){
         case GET_DATA : 
         return aciton.payload
         default: return state
    }
}