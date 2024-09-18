import React,{Component} from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import CNavbar from './cNavbar'
import CLogin from './cLogin'
import auth from '../service4/authService4'
import CCompany from './cCompany'
class CMain extends Component{

    render(){
     let code=auth.empCode()
     console.log('the code is',code)
        return(
            <React.Fragment>
                <CNavbar code={code}/>
                <Switch>
                    <Route path='/login' component={CLogin} />
                    <Route path='/company' component={CCompany} />
                </Switch>
            </React.Fragment>
        )
    }
}
export default CMain