import React,{Component} from 'react'
import http from '../services/httpService'


class Users extends Component{
    
    state={
        users:[]
    }
   async componentDidMount(){
    let response=await http.get('/productApp/users')
    let {data}=response
    this.setState({users:data})
   }
   handleEdit=(id)=>{
    let url=`/users/${id}/edit`
    this.props.history.push(url);
  }
  handleDelete=(id)=>{
    let url=`/users/${id}/delete`
    this.props.history.push(url);
  }
  AddUser=()=>{
    this.props.history.push('/adduser')
  }

   render(){
    let {users}=this.state
    return(
        <div className='container mt-2'>
            {users.map(elem=>(
                <div className='row'>
                   <div className='col-3 border'>{elem.username}</div> 
                   <div className='col-3 border'>{elem.name}</div> 
                   <div className='col-2 border'>{elem.role}</div> 
                   <div className='col-2 border'>
                   <button className='btn btn-secondary' onClick={()=>this.handleEdit(elem.username)}>Edit</button>
                    </div> 

                   <div className='col-2 border'>
                   <button className='btn btn-danger' onClick={()=>this.handleDelete(elem.username)}>Delete</button>
                    </div> 
                </div>
            ))}
            
          <button className='btn btn-success mt-1' onClick={this.AddUser}>Add User</button> 
             
        </div>
    )
   }
}
export default Users