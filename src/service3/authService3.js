let keyname='user';
let keyname2='cart'
function login(obj){
    let str=JSON.stringify(obj)
    localStorage.setItem(keyname,str)
}
function addCart(arr){
  let str=JSON.stringify(arr)
  localStorage.setItem(keyname2,str)
}
function getCart(){
    let str=localStorage.getItem(keyname2)
    return str?JSON.parse(str):[]
}
function logout(){
    localStorage.removeItem(keyname)
}
function removeCart(){
    localStorage.removeItem(keyname2)
}
function getUser(){
    let str=localStorage.getItem(keyname);
    return str?JSON.parse(str):null
}
export default {
    login,
    logout,
    getUser,
    addCart,
    getCart,
    removeCart,
}