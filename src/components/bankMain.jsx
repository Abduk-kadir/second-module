import React,{Component} from 'react'
import BankNavbar from './bankNavbar'
import { Switch,Route,Redirect } from 'react-router-dom'
import BankLogin from './BankLogin'
import WelcomeBank from './welcomeBank'
import auth from '../service3/authService3'
import BankLogout from './bankLogout'
import BankAllcustomer from './BankAllcustomer'
import BankAddCustomer from './bankAddCustomer'
import CheckTransaction from './checkTransaction'
import BankAllNet from './bankAllNet'
import ParticularCheckTrans from './particularCheckTrans'
import ParticularNet from './particularNet'
import BankCustomerDetail from './bankCustomerDetail'
import BankNomDetail from './bankNomDetail'
import BankCheque from './bankCheque'
import BankNet from './bankNet'
import AddPayee from './addPayee'
import NotAllowed from './notAllowed'
class BankMain extends Component{
    render(){
        let user=auth.getUser()
        return(
            <React.Fragment>
             <BankNavbar user={user}/>
             <Switch>
             
             
             <Route path='/addPayee'
               render={(props)=>user?user.role=='customer'?<AddPayee {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/> 
             
             <Route path='/netBanking'
               render={(props)=>user?user.role=='customer'?<BankNet {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/> 

              <Route path='/cheque'
               render={(props)=>user?user.role=='customer'?<BankCheque {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/> 
             
             
             <Route path='/nomineeDetails'
               render={(props)=>user?user.role=='customer'?<BankNomDetail {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>
              
             <Route path='/customerDetails'
               render={(props)=>user?user.role=='customer'?<BankCustomerDetail {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>
            
             <Route path='/viewCheaque'
               render={(props)=>user?user.role=='customer'?<ParticularCheckTrans {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>
           
             <Route path='/viewNet'
               render={(props)=>user?user.role=='customer'?<ParticularNet {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>

           
             <Route path='/customer'
               render={(props)=>user?user.role=='customer'?<WelcomeBank {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>

              
               <Route path='/allNet'
               render={(props)=>user?user.role=='manager'?<BankAllNet {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>
              
               <Route path='/allCheaque'
               render={(props)=>user?user.role=='manager'?<CheckTransaction {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>

               <Route path='/addCustomer'
               render={(props)=>user?user.role=='manager'?<BankAddCustomer {...props}/>:
               <Redirect to='notAllowed'/>:<Redirect to='/login'/>
               }/>

               <Route path='/allCustomer'
                render={(props)=>user?user.role=='manager'?<BankAllcustomer {...props}/>:
                <Redirect to='notAllowed'/>:<Redirect to='/login'/>}/>

               
               <Route path='/admin'
                render={(props)=>user?user.role=='manager'?<WelcomeBank {...props}/>:
                <Redirect to='notAllowed'/>:<Redirect to='/login'/>}/>


               <Route path='/login' component={BankLogin}/>
               <Route path='/logout' component={BankLogout}/>
               <Route path='/notAllowed' component={NotAllowed}/>
              
             </Switch>
            </React.Fragment>
        )
    }
}
export default BankMain