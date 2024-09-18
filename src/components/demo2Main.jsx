import React,{Component} from 'react'
import DemoNavbar from './demoNavbar'
import DemoLogin from './demoLogin'
import Demo2Login from './demo2Login'
import {Link,Route,Redirect,Switch} from 'react-router-dom'
import DemoUser from './demoUser'
import DemoLogout from './demoLogout'
import DemoOrder from './demoOrder'
import Demo2Navbar from './demo2Navbar'
import Demo2Detail from './demo2Detial'
import Demo2Junior from './demo2Junior'
class Demo2Main extends Component{
    
    render(){
        return(
            <React.Fragment>
             <Demo2Navbar/>
              <Switch>
                <Route path='/junior' component={Demo2Junior} /> 
                <Route path='/detail' component={Demo2Detail} />
                <Route path='/login' component={Demo2Login}/>
                <Route path='/logout' component={DemoLogout}/>
               
              </Switch>
            </React.Fragment>
        )
    }
}
export default Demo2Main