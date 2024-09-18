import React,{Component} from 'react'
import httt from '../service3/htttService3'
import auth from '../service3/authService3'

class StoreLogin extends Component{

    state={
        user:{email:'',password:''}
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e
        let s1={...this.state}
        s1.user[input.name]=input.value
        this.setState(s1)
    }
    async postData(){
        let s1={...this.state}
        let obj=s1.user
        let url='/login'
        try{
          let response=await httt.post(url,obj)  
          let {data}=response
          auth.login(data)
          this.props.history.push('/products')
          
        }
        catch(err){
            let {data}=err.response
            console.log(err.response)
            let error=data;
            alert(data)
        }
    }
     handleLogin=()=>{
      this.postData()
    }

    render(){
        let {email,password}=this.state.user
        return(
            <div className='container '>
                    
                <div className='row'>
             
                  <img className='small' src='https://github.com/edufectcode/react/blob/main/data/MyStore-sale.jpg?raw=true'/>
     
                </div>
                 <h6 className='text-center'>Login</h6>
                <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                 <label className='form-label'>Email</label>
                 <input className='form-control' type='text' name='email' value={email} onChange={this.handleChange} />

                 <label className='form-label'>Password</label>
                 <input className='form-control' type='password' name='password' value={password} onChange={this.handleChange} />

                </div>
                <div className='col-2'></div>
                
                </div>
                <div className='row mt-1'>
                    <div className='col-2'></div>
                    <div className='col-1'><button className='btn btn-primary' onClick={this.handleLogin}>Login</button></div>
                </div>
               
            </div>
        )
    }
}
export default StoreLogin