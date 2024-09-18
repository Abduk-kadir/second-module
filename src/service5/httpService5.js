import axios from "axios";
//import auth from "./authService5";
//let baseurl='http://localhost:2410'
function post(url,obj){
    return axios.post(url,obj,{headers:{Authorization:1679304097013}})
}
function get(url){
    //let token=auth.getToken()
    return axios.get(url,{
        headers:{Authorization:1679304097013}
    })
}
export default{
    post,
    get,
}