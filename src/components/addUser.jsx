import React,{Component} from 'react'
import http from '../services/httpService'

class AddUser extends Component{
    state={
        user:{username:"",name:'',role:''},
        edit:false
    }

   handleChange=(e)=>{
     let {currentTarget:input}=e;
     let s1={...this.state}
     
     s1.user[input.name]=input.value;
     this.setState(s1)
     
   }
  async getProductData(){
    let {id}=this.props.match.params
    if(id){
    let url=`/productApp/users/${id}`
    let response=await http.get(url)
    let {data}=response;
    this.setState({user:data,edit:true})
    }
    else{
       let  user={username:"",name:'',role:''};
       this.setState({user:user,edit:false})
    }
   }
   async componentDidMount(){
   this.getProductData()
   }
   componentDidUpdate(prevprops,prevstate){
     if(prevprops!=this.props){
        this.getProductData()
     }
   }
   

  async postdata(url,obj){
    try{
     let response=await http.post(url,obj); 
     this.props.history.push('/users')
    }
    catch(ex){
        if(ex.response&&ex.response.status==400){
            let errors={}
            errors.id=ex.response.data;
            this.setState({errors:errors})
        }

           
    }
  
  }
  
  async putdata(url,obj){
    let response=await http.put(url,obj); 
    this.props.history.push('/users')
  }
handleSubmit=(e)=>{
 let {user,edit}=this.state;
 edit?this.putdata(`/productApp/users/${user.username}`,this.state.user):this.postdata('/productApp/users',this.state.user)
 
 
}

  render(){
    let {username,name,role,edit}=this.state.user
    let {errors=null}=this.state
    return(
        <React.Fragment>
          
          <div class="mb-3">
           <label for="exampleFormControlInput1" className="form-label">User Id</label>
           <input type="text" className="form-control"  placeholder="enter id" name='username' value={username} onChange={this.handleChange}
              readOnly={this.state.edit}
           />
           {errors&&<span className='text-danger'>{errors.id}</span>}
           </div>
           
          <div class="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Name</label>
           <input type="text" className="form-control"  placeholder="enter Name" name='name' value={name} onChange={this.handleChange}/>
           </div>
           
          <div class="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Role</label>
           <input type="text" className="form-control"  placeholder="enter role" name='role' value={role} onChange={this.handleChange}/>
           </div>

        
          <button className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>

        </React.Fragment>
    )
  }
}
export default AddUser