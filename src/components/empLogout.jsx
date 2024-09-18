import react,{Component} from 'react'
import auth from '../service2/authService2'
class EmpLogout extends Component{
    componentDidMount(){
      auth.logout();
      window.location='/login'
    }
    render(){
        return ''
    }
}
export default EmpLogout