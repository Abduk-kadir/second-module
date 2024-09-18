let keyName='jwtToken'
function setToken(token){
    localStorage.setItem(keyName,token)
}
function removeToken(){
    localStorage.removeItem(keyName)
}
function getToken(){
   return localStorage.getItem(keyName)
}
export default{
    setToken,
    removeToken,
    getToken
}
