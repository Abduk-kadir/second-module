import React,{Component} from 'react'
import DemoNavbar from './demoNavbar'
import DemoLogin from './demoLogin'
import {Link,Route,Redirect,Switch} from 'react-router-dom'
import DemoUser from './demoUser'
import DemoLogout from './demoLogout'
import DemoOrder from './demoOrder'
class DemoMain extends Component{
    
    render(){
        return(
            <React.Fragment>
             <DemoNavbar/>
              <Switch>
                <Route path='/order/:type' component={DemoOrder}/>
                <Route path='/login' component={DemoLogin}/>
                <Route path='/logout' component={DemoLogout}/>
                <Route path='/user' component={DemoUser}/>
              </Switch>
            </React.Fragment>
        )
    }
}
export default DemoMain