import React,{Component} from "react";
import EmpNavbar from "./empNavbar";
import EmpLogin from "./empLogin";
import { Switch,Route,Redirect } from "react-router-dom";
import EmpLogout from "./empLogout";
import auth from "../service2/authService2";
import WelcomeAdmin from "./welcomeAdmin";
import WelcomeEmp from "./welcomeEmp";
import Employees from "./employees";
import AddEmp from "./addEmp";
import Department from "./department";
import Contact from "./contact";
import Bills from "./bills";
import HotelBill from "./hotelBill";
import NotAllowed from "./notAllowed";
class EmpMain extends Component{
    render(){
        let user=auth.getUser()
       
        return (
            <React.Fragment>
                <EmpNavbar user={user}/>
                <Switch>
                  <Route path='/admin/viewemp/:id'
                   render={
                    (props)=>user?user.role=='ADMIN'?<Department {...props}/>:<Redirect to='/notallowed'/>:<Redirect to='/login'/>
                   }
                   
                   
                   />
                  
                  {

                  <Route path='/admin/viewemp' render={(props)=>user?user.role=='ADMIN'? <Employees {...props} />:<Redirect to='/notallowed'/>:<Redirect to='/login'/>}/> 

                  }

                  <Route path='/admin/addemp'
                   render={
                    (props)=>user?user.role=='ADMIN'?<AddEmp {...props}/>:<Redirect to='/notallowed'/>:<Redirect to='/login'/>
                   }
                  
                  />

                  <Route path='/emp/hotelbill/:id' component={HotelBill}></Route>
                  <Route path='/emp/contact'
                  
                  
                  render={(props)=>user&&user.role=='EMPLOYEE'?<Contact {...props}/>:<Redirect to ='/notallowed'/>}
                  
                  
                  />
                  <Route path='/emp/bills'
                  
                  render={(props)=>user&&user.role=='EMPLOYEE'?<Bills {...props}/>:<Redirect to ='/notallowed'/>}
                  
                  
                  
                  />
                
                   <Route path='/login' component={EmpLogin}/> 
                   <Route path='/logout' component={EmpLogout}/> 


                   <Route path='/admin' 
                   
                    render={(props)=>user?user.role=='ADMIN'?<WelcomeAdmin {...props}/>:<Redirect to ='/notallowed'/>:<Redirect to ='/login'/>}
                   
                   
                   /> 


                   <Route path='/employee'
                   
                   
                   render={(props)=>user?user.role=='EMPLOYEE'?<WelcomeEmp {...props}/>:<Redirect to ='/notallowed'/>:<Redirect to ='/login'/>}
                   
                   /> 
                   <Route path='/notallowed' component={NotAllowed}/> 
                  

                </Switch>
            </React.Fragment>
        )
    }
}
export default EmpMain