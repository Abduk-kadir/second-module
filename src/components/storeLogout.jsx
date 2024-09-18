import React,{Component} from 'react'
import auth from '../service3/authService3'
class StoreLogout extends Component{

    componentDidMount(){
     auth.logout();
     this.props.history.push('/products')
    }

    render(){
        return ''
    }
}
export default StoreLogout