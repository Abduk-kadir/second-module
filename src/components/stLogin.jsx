import React,{Component} from 'react'
import auth from '../service3/authService3'
import httt from '../service3/htttService3'

class StLogin extends Component{
    state={
        user:{email:'',password:''},
    
        
    }

    handleChange=(e)=>{
        let s1={...this.state}
        let {currentTarget:input}=e;
        s1.user[input.name]=input.value
        this.setState(s1)
    }
    async postData(url,obj){
        try{
        let response=await httt.post(url,obj)
        let {data}=response;
        auth.login(data)
        console.log('login user is:',data)
        let {role}=data
        if(role=='student'){
            window.location='/studentDashboard' 
        }
        if(role=='admin')
        {
         window.location='/admin'
        }
        if(role=='faculty')
        {
         window.location='/facultyDashboard'
        }
        
        
        }
        catch(ex){
            if(ex.response&&ex.response.status==500){
                let error={}
                error.username=ex.response.data
                this.setState({error:error})
            }
           

        }
    }
    handleLogin=()=>{
     let url='/login'
     let s1={...this.state}
     let obj=s1.user
     this.postData(url,obj)
    }

    render(){
        let {email,password}=this.state.user
        let {error=null}=this.state
        return(
            <div className='container text-center mt-5'>
                <h5 className='mb-5'>Login</h5>
                <div className='row mb-4'>
                    <div className='col-2'></div>
                    <div className='col-2'>Email:</div>
                    <div className='col-4'>
                        <input type='email' className='form-control' name='email' value={email} onChange={this.handleChange}  />
                    </div>
                 <div className='col-4'></div>
                </div>

                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-2'>Password:</div>
                    <div className='col-4'>
                        <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
                    </div>
                 <div className='col-4'></div>
                </div>
                {error&&error.username?<span className='text-danger'>{error.username}</span>:''}
                <br/>
                <button className='btn btn-primary mt-4' onClick={this.handleLogin}>Login</button>


            </div>
        )
    }
}
export default StLogin