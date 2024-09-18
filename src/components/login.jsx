import React,{Component} from 'react'
import auth from '../services/authService';
import http from '../services/httpService';

class Login extends Component{
    state={
        form:{username:'',password:""}
    }

    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        s1.form[input.name]=input.value;
        this.setState(s1)

    }
    async login(url,obj){
        try{
        let response=await http.post(url,obj);
        let {data}=response;
        auth.login(data)
        //this.props.history.push('/products')
        window.location='/products'
        }
        catch(ex){
          
            if(ex.response&&ex.response.status==400){
                let errors={};
                errors.username=ex.response.data;
                console.log('data is',ex.response.data)
                this.setState({errors:errors})

            }
        }


    }
    handleSubmit=(e)=>{
       e.preventDefault() 
       this.login('/productApp/login',this.state.form)

    }
  
    render(){
        let {username,password}=this.state.form
        let {errors=null}=this.state
        return(
            <React.Fragment>
            <div class="mb-3">
           
           <label for="exampleFormControlInput1" className="form-label">Name</label>
           <input type="text" className="form-control"  placeholder="enter Name" name='username' value={username} onChange={this.handleChange}/>
            {errors&&errors.username&&<span className='text-danger'>{errors.username}</span>}
           </div>
           
          <div class="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Password</label>
           <input type="password" className="form-control"  placeholder="enter password" name='password' value={password} onChange={this.handleChange}/>
           </div>
          <button className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
          </React.Fragment>

        )

    }


}
export default Login