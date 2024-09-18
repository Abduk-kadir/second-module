import React,{Component} from 'react'
import httt from '../service3/htttService3';
class BankAddCustomer extends Component{
    state={
        add:{name:'',password:'',conform:''},
        errors:{password:'',conform:''}
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        s1.add[input.name]=input.value;
        this.validateOnPressKey(e)
        this.setState(s1)
    }

    validatePassword(pass){
        return pass.length<7?'password must be 7 character':''
    }
    validateConform(pass,con){
        return pass==con?'':'password shoud be matched'
    }
    validateOnPressKey(e){
        let {currentTarget:input}=e;
        let s1={...this.state}
        switch(input.name){
            case 'password':
                s1.errors.password=this.validatePassword(input.value)
                break;
            case 'conform':
                s1.errors.conform=this.validateConform(s1.add.password,input.value)
                break;    
        }
        this.setState(s1)
    }
    async postData(url,obj){
       let response=await httt.post(url,obj)
       alert('customer hasbeen successfully added')
       this.props.history.push('/admin')
    }
    handleSubmit=()=>{
        let s1={...this.state}
        let obj={name:s1.add.name,password:s1.add.password}
        this.postData('/register',obj)

    }

    render(){
        let {name,password,conform}=this.state.add
        let {errors}=this.state
        return(
            <div className='container'>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1"
             placeholder="Enter user name"
             name='name'
             value={name}
             onChange={this.handleChange}
             />
            </div>

            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleFormControlInput1"
             placeholder="Enter user name"
             name='password'
             value={password}
             onChange={this.handleChange}
             />
            </div>
            <span className='text-danger'>{errors.password}</span>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Conform Password</label>
            <input type="password" class="form-control" id="exampleFormControlInput1"
             placeholder="Enter user name"
             name='conform'
             value={conform}
             onChange={this.handleChange}
             />
            </div>
            <span className='text-danger'>{errors.conform}</span>
            <button className='btn btn-primary' onClick={this.handleSubmit}>Create</button>
            </div>
        )

    }
}
export default BankAddCustomer