import React,{Component} from "react";
import http from "../services/httpService";


class DelUser extends Component{
   
   async componentDidMount(){
    let {id}=this.props.match.params
    let response=await http.deleteprod(`/productApp/users/${id}`)
    this.props.history.push('/users')
   }

    render(){
        return(
            ''
        )
    }
}
export default DelUser