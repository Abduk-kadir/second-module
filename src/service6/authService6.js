let keyName='autToken'

function setToken(token){
    localStorage.setItem(keyName,token)
}
function getToken(){
    return localStorage.getItem(keyName)
}
function removeToken(){
    localStorage.removeItem(keyName)
}
export default{
    setToken,
    getToken,
    removeToken
}