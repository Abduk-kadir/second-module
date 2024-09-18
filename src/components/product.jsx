import React,{Component} from 'react'
import http from '../services/httpService'
class Product extends Component {
    state={
        prod:{}
    }
   async componentDidMount(){
    let {id}=this.props.match.params
    let url=`/productApp/products/${id}`
    let response=await http.get(url)
    let {data}=response;
    this.setState({prod:data})
   }
    render(){
        let {prod=''}=this.state
        return(
            <div className='container'>
              ProductId:{prod.id}
              <br/>
              Name:{prod.name}
              <br/>
              Price:{prod.price}

            </div>
        )


    }
}
export default Product