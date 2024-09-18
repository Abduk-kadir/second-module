import React,{Component} from 'react'
import http from '../service4/httpService4'
import auth from '../service4/authService4'
class CLogin extends Component{

    state={
        form:{name:'',empcode:''}
    }
    async postData(url,obj){
        
        try{
        let response=await http.post(url,obj)
        console.log('fjldkhgkj')
        window.location='/company'
        }
        catch(ex){
            let errors={};
        }
    }
    handleLogin=()=>{
        let s1={...this.state}
        let obj=s1.form
        let url='/login'
        this.postData(url,obj)
    }
    handleChange=(e)=>{
        let s1={...this.state};
        let {currentTarget:input}=e;
        s1.form[input.name]=input.value;
        this.setState(s1)

    }
    render(){
        let {name,empcode}=this.state.form
        return (
            <div className='container text-center mt-5'>
            <h5 className='mb-5'>Login</h5>
            <div className='row mb-4'>
                <div className='col-2'></div>
                <div className='col-2'>Name:</div>
                <div className='col-4'>
                    <input type='email' className='form-control' name='name' value={name} onChange={this.handleChange}  />
                </div>
             <div className='col-4'></div>
            </div>

            <div className='row'>
                <div className='col-2'></div>
                <div className='col-2'>EmpCode:</div>
                <div className='col-4'>
                    <input type='password' className='form-control' name='empcode' value={empcode} onChange={this.handleChange} />
                </div>
             <div className='col-4'></div>
            </div>
            <button className='btn btn-primary mt-4' onClick={this.handleLogin}>Login</button>


        </div>
        )
    }
}
export default CLogin