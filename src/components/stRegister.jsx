import React,{Component} from 'react'
import httt from '../service3/htttService3';
class StRegister extends Component{

    state={
        form:{name:'',email:'',password:'',role:'',repassword:''},
        rolarr:['student','faculty']
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        s1.form[input.name]=input.value;
        this.setState(s1)
    }
    async postData(url,obj){
       try{
         let response=await httt.post(url,obj)
         alert('successfully register')
         this.props.history.push('/admin')
        }
        catch(ex){

        }
    }
    hadleRegister=()=>{
      let url='/register'
      let obj=this.state.form;
      this.postData(url,obj)
    }
    render(){
        let {name,email,password,role,repassword}=this.state.form
        let {rolarr}=this.state
        return(
            <div className='container'>
                <label className='form-label'>Name</label>
                <input type="text"  className='form-control'  name='name' value={name} onChange={this.handleChange} />
                <label className='form-label'>Email</label>
                <input type="text"  className='form-control'  name='email' value={email} onChange={this.handleChange} />
                <label className='form-label'>Password</label>
                <input type="password"  className='form-control'  name='password' value={password} onChange={this.handleChange} />
                <label className='form-label'>Conform Password</label>
                <input type="password"  className='form-control' name='repassword' value={repassword} onChange={this.handleChange} />
                <label className='form-label'>Role</label>
                 {
                    rolarr.map(elem=>(
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" value={elem} checked={elem==role} onChange={this.handleChange}  />
                        <label class="form-check-label" for="flexRadioDefault1">
                         {elem}
                        </label>
                        </div>

                    ))
                 }
              
                <button className='btn btn-primary mt-2' onClick={this.hadleRegister}>Register</button>
            </div>
        )
    }
}
export default StRegister