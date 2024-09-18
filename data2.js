let users=[
    {
    id:1,
    name:'Jhon',
    password:'jhon',
    role:'admin'
   },
   {
    id:2,
    name:'Sarah',
    password:'sarah',
    role:'user'
   },
   {
    id:2,
    name:'George',
    password:'george',
    role:'user'
   }
  
]
let orders=[
    {orderId:1,userId:1,qty:10,value:55},
    {orderId:2,userId:2,qty:4,value:5},
    {orderId:3,userId:3,qty:100,value:25},
    {orderId:4,userId:1,qty:1,value:5},
    {orderId:5,userId:1,qty:10,value:55},
    {orderId:6,userId:2,qty:4,value:5},
    {orderId:7,userId:2,qty:90,value:95},
    {orderId:8,userId:1,qty:10,value:5},
    

]
console.log("amran khan")
let mobiles=['Apple Iphone 11','Samsung Glaxy 9',"Google Pixel 4"]
let laptops=['HP 2350X','Dell Inspiration 2349','Makbook Air']
offers=['5% of on mobiles','8% cashback on laptops']
let employees=[
    {empCode:1451,name:"Jack",department:"Finance",designation:"Manager",salary:52500,gender:"Male"},
    {empCode:1029,name:"Steve",department:"Technology",designation:"Manager",salary:71000,gender:"Male"},
    {empCode:1891,name:"Anna",department:"HR",designation:"Manager",salary:55100,gender:"Female"},
    {empCode:1322,name:"Kathy",department:"Operations",designation:"Manager",salary:49200,gender:"Female"},
    {empCode:1367,name:"Bob",department:"Marketing",designation:"Manager",salary:39000,gender:"Male"},
    {empCode:1561,name:"George",department:"Finance",designation:"Trainee",salary:22500,gender:"Male"},
    {empCode:1777,name:"Harry",department:"Technology",designation:"Trainee",salary:31000,gender:"Male"},
    {empCode:1606,name:"Julia",department:"HR",designation:"Manager",Trainee:25100,gender:"Female"},
    {empCode:1509,name:"Kristina",department:"Operations",designation:"Trainee",salary:19200,gender:"Female"},
    {empCode:1533,name:"William",department:"Marketing",designation:"Trainee",salary:16200,gender:"Male"},
    {empCode:1161,name:"Stephen",department:"Finance",designation:"VP",salary:82500,gender:"Male"},
    {empCode:1377,name:"Winston",department:"Technology",designation:"VP",salary:91000,gender:"Male"},
    {empCode:1206,name:"Victoria",department:"HR",designation:"Manager",VP:65100,gender:"Female"},
    {empCode:1809,name:"Pamela",department:"Operations",designation:"VP",salary:78600,gender:"Female"},
    {empCode:1033,name:"Tim",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    {empCode:1787,name:"Peter",department:"Technology",designation:"Manager",salary:47400,gender:"Male"},
    {empCode:1276,name:"Barbara",department:"Technology",designation:"Trainee",salary:21800,gender:"Female"},
    {empCode:1859,name:"Donna",department:"Operations",designation:"Trainee",salary:21900,gender:"Female"},
    {empCode:1874,name:"Igor",department:"Operations",designation:"Manager",salary:48300,gender:"Male"},
    ]
//module.exports={users,mobiles,laptops,offers,orders,employees}
exports.users=users
exports.orders=orders


