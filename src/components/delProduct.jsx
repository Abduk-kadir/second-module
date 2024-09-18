import React,{Component} from "react";
import http from "../services/httpService";


class DelProduct extends Component{
   
   async componentDidMount(){
    let {id}=this.props.match.params
    let response=await http.deleteprod(`/productApp/products/${id}`)
    this.props.history.push('/products')
   }

    render(){
        return(
            ''
        )
    }
}
export default DelProduct