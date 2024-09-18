import React,{Component} from 'react'
import auth from '../service3/authService3'
class BankLogout extends Component{

    componentDidMount(){
       auth.logout();
      // this.props.history.push('/login')
      window.location='/login'
    }

    render(){
        return ''
    }

}
export default BankLogout