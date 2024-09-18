import axios from "axios";
let baseurl='http://localhost:2410'
function post(url,obj){
    return  axios.post(baseurl+url,obj)
}
export default{
    post,
}