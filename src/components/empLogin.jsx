import React,{Component} from "react";
import http from "../service2/httpservice2";
import auth from "../service2/authService2";
class EmpLogin extends Component{
    state={
       form:{email:'',password:''}
    }
    async login(url,obj){
        try{
        let response=await http.post(url,obj);
        let {data}=response
        auth.login(data)
        data.role=='ADMIN'?window.location='/admin': window.location='/employee'
       
        }
        catch(ex){
             console.log(ex.response.status)
            if(ex.response&&ex.response.status==401){
                let errors={}
              
                errors.username=ex.response.data;
                this.setState({errors:errors})
            }
        }
    }
   
    handleSubmit=()=>{
        let url='/empapp/loginuser'
        let obj=this.state.form;
        this.login(url,obj)
    }
   

    handleChange=(e)=>{
        let s1={...this.state};
        let {currentTarget:input}=e;
        s1.form[input.name]=input.value;
        this.setState(s1)

    }
    render(){
        let {email,password}=this.state.form
        let {errors=null}=this.state
        return(
          <div className="container text-center">
             <div className="row">
                <h4>Welcome to Employee Management Portal</h4>
                <h5>Login</h5>
                {errors?<h6 className="text-danger">{errors.username}:Check username and password</h6>:''}
                <div className="col-4 text-end">Email:</div>
               
                <div className="col-6">
                <input type="text" className="form-control"  placeholder="enter email" name='email' value={email} onChange={this.handleChange}/>   
                </div>

                <div className="col-4 text-end mt-3">Password:</div>
               
                <div className="col-6">
                <div className="mt-3">
                <input type="password" className="form-control"  placeholder="enter password" name='password' value={password} onChange={this.handleChange}/>   
                </div>
                </div>
                <div className="col-4 ">
               
                </div>
                <div className="col-2 mt-3">
                <button className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
                </div>
             </div>
          </div>
        )
    }
}
export default EmpLogin