import React,{Component} from 'react'
import Cookies from 'js-cookie'
class CCompany extends Component{
    render(){
        console.log('cookes',Cookies.get())
        return(
          <h4>Welcome to Abdul Company</h4>
        )
    }
}
export default CCompany