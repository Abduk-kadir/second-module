import axios from "axios";
import auth from "./authService6";
let baseurl='http://localhost:2410'

function post(url,obj){
    console.log('in post')
    return axios.post(baseurl+url,obj)
}
function get(url){
    let token=auth.getToken()
    return axios.get(baseurl+url,{
        headers:{Authorization:'bearer '+token}
    })
}
export default{
    post,
    get,
}