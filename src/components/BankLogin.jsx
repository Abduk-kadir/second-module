import React,{Component} from 'react'
import BankMain from './bankMain'
import htttp from '../service3/htttService3'
import auth from '../service3/authService3'
class BankLogin extends Component{
    state={
        form:{name:'',password:''},
        error:'',
        errors:{}
    }

    async postData(url,obj){
      try{
       let response=await htttp.post(url,obj)
       let {data}=response
       auth.login(data)
       if(data.role=='manager')
       {
       window.location='/admin'
       }
       else{
        window.location='/customer'
       }
      }
      catch(ex){
           
      this.setState({error:'username or password are not correct'})
         
      }

    }
    handleLogin=()=>{
        let {form}=this.state;
        let url='/login'
        this.postData(url,form)
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        s1.form[input.name]=input.value;
        this.validateOnPressKey(e)
        this.setState(s1)
    }
    validateOnPressKey(e){
        let {currentTarget:input}=e;
        let s1={...this.state}
        switch(input.name){
            case 'password':
                s1.errors.password=this.validatePassword(input.value)
                break;
        }
        this.setState(s1)
    }
    validatePassword(pass){
        return pass.length<7?'password must be 7 character':''
    }

    render(){
        let {form,error,errors}=this.state
        let {name='',password=''}=form
        return (
            <div className='container text-center mt-5 '>
            <h4>Welcome to GBI Bank</h4>
            <br/>
           
            <div className='row'>
            <div className='col-4'></div>
            <div className='col-4'>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">User Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1"
             placeholder="Enter user name"
             name='name'
             value={name}
             onChange={this.handleChange}

             />
            </div>
           
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Enter password"
             name='password'
             value={password}
             onChange={this.handleChange}
            />
            </div>
          
            <button className='btn btn-primary' onClick={this.handleLogin}>Login</button>
            </div>
            <br/>
            <span className='text-danger'>{error}</span>
            <span className='text-danger'>{errors.password}</span>
            
           
            <div className='col-4'></div>
            </div>
            </div>
        )
    }
}
export default BankLogin