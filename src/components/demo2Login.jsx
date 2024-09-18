import React,{Component} from 'react'
import auth from '../service6/authService6';
import http from '../service6/httpService6';

class Demo2Login extends Component{
    state={
        form:{empcode:'',name:''}
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
        // let token=headers['authorization']
        let token=headers['x-auth-token']
         auth.setToken(token)
         this.props.history.push('/detail')

        }
        catch(ex){
           
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
        let {empcode,name}=form
        return(
            <div className="container text-center">
            <div className="row">
             
             
               <div className="col-4 text-end">EmpCode:</div>
              
               <div className="col-6">
               <input type="text" className="form-control"  placeholder="enter empcode" name='empcode' value={empcode}  onChange={this.handleChange}/>   
               </div>

               <div className="col-4 text-end mt-3">Name:</div>
              
               <div className="col-6">
               <div className="mt-3">
               <input type="text" className="form-control"  placeholder="enter name" name='name' value={name}  onChange={this.handleChange}/>   
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
export default Demo2Login