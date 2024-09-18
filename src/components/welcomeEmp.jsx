import React,{Component} from 'react'
import auth from '../service2/authService2'

class WelcomeEmp extends Component{
    render(){
        let user=auth.getUser();
        return(
            <div className='container'>
            <h4>Welcome {user.name} to Employee Management System </h4>
            </div>
        )
    }
}
export default WelcomeEmp