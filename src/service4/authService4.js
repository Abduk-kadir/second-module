let keyName="user"
function login(value){
    localStorage.setItem(keyName,value)
}
function empCode(){
   let val= localStorage.getItem(keyName)
   return val?val:null
}
export default{
    login,
    empCode,
}