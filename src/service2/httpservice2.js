import axios from "axios";
let baseurl='http://localhost:2410'
function post(url,obj){
    return axios.post(baseurl+url,obj)
}
function get(url){
    return axios.get(baseurl+url)
}
export default{
    post,
    get,
}