import React,{Component} from 'react'
import httt from '../service3/htttService3'

class StoreDelete extends Component{
    
    async componentDidMount(){
      let {id}=this.props.match.params
      let url=`/products/${id}`
      let response=await httt.deleteprod(url)
      this.props.history.push('/products')
    }
    render(){
        return ''
    }
}
export default StoreDelete