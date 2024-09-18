import React,{Component} from 'react'
import http from '../services/httpService'
import { Link } from 'react-router-dom'
import auth from '../services/authService'
class Products extends Component{
  state={
     prods:[]
  }

  async componentDidMount(){
    let url='/productApp/products'
   let response =await http.get(url)
   let {data}=response
   this.setState({prods:data})

  }
  handleEdit=(id)=>{
    let url=`/products/${id}/edit`
    this.props.history.push(url);
  }
  handleDelete=(id)=>{
    let url=`/products/${id}/delete`
    this.props.history.push(url);
  }

  render(){
   let {prods}=this.state
   let user=auth.getUser()
   return(
    <div className='container'>
        {
          prods.map(elem=>(
            <div className='row '>
                <div className='col-4 border'>
                    
                <Link to={`/products/${elem.id}`}> {elem.id}</Link>   
                    
                </div>
                <div className='col-2 border'>{elem.name}</div>
                <div className='col-2 border'>{elem.price}</div>
                {
                 user&&user.role=='admin'&&   
                <div className='col-2 border'>
                    <button className='btn btn-secondary' onClick={()=>this.handleEdit(elem.id)}>Edit</button>
                </div>
                } 
                {
                 user&&user.role=='admin'&&  
                <div className='col-2 border'>
                    <button className='btn btn-danger' onClick={()=>this.handleDelete(elem.id)}>Delete</button>
                </div>
               }

            </div>
          ))
        }
    </div>
   )

  }

}
export default Products