import axios from "axios";
let baseurl='https://ecommerweb.onrender.com'

function post(url,obj){
    return axios.post(baseurl+url,obj)
}
function put(url,obj){
    return axios.put(baseurl+url,obj)
}
function get(url){
    return axios.get(baseurl+url)
}
function deleteprod(url){
    return axios.delete(baseurl+url)
}

export default{
    post,
    get,
    put,
    deleteprod
}