import React,{Component} from 'react'
import auth from '../service6/authService6'

class DemoLogout extends Component{

    componentDidMount(){
        auth.removeToken()
    }
    render(){
        return 'Logout'
    }
}
export default DemoLogout