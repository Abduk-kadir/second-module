import React,{Component} from 'react'
import http from '../service5/httpService5';
import auth from '../service5/authService5';
class DemoLogin extends Component{
    state={
        form:{username:'',password:''}
    }
    handleChange=(e)=>{
        let s1={...this.state};
        let {currentTarget:input}=e;
        s1.form[input.name]=input.value;
        this.setState(s1)
    }
   async postData(url,obj){
        try{
         let response=await http.post(url,obj)
         console.log('response is:',response)
         let {data,headers}=response;
         //let token=headers['authorization']
         let token=headers['x-auth-token']
         console.log('data is:',data)
         console.log('token is:',token)
         auth.setToken(token)
         this.props.history.push('/user')

        }
        catch(ex){
            console.log(ex)
            let errMsg=`${ex.response.status} ${ex.response.statusText}`
            this.setState({errMsg:errMsg})

        }
    }
    handleSubmit=()=>{
      let s1={...this.state}
      let obj=s1.form
      let url='/user'
      this.postData(url,obj)

    }
    render(){
        let {form,errMsg}=this.state
        let {username,password}=form
        return(
            <div className="container text-center">
            <div className="row">
             
             
               <div className="col-4 text-end">Email:</div>
              
               <div className="col-6">
               <input type="text" className="form-control"  placeholder="enter username" name='username' value={username}  onChange={this.handleChange}/>   
               </div>

               <div className="col-4 text-end mt-3">Password:</div>
              
               <div className="col-6">
               <div className="mt-3">
               <input type="text" className="form-control"  placeholder="enter password" name='password' value={password}  onChange={this.handleChange}/>   
               </div>
               <span className='text-danger'>{errMsg}</span>
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
export default DemoLogin