import React,{Component} from 'react'
import http from '../service2/httpservice2'
class AddEmp extends Component{
       state={
        emp:{name:'',email:'',password:'',reEnter:''},
        errors:{}
      
       }

       handleChange=(e)=>{
          let s1={...this.state}
          let {currentTarget:input}=e;
          s1.emp[input.name]=input.value;
          this.handleValidate(e)
          this.setState(s1)
       }

    validateAll(){
        let {name,email,password,reEnter}=this.state.emp;
        let errors={}
        errors.name=this.validateName(name)
       errors.email=this.validateEmail(email)
       errors.password=this.validatePassword(password)
       errors.reEnter=this.validateReEnter(password,reEnter)
        return errors
    }
    handleValidate=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        switch(input.name){
            case 'name':
               s1.errors.name=this.validateName(s1.emp.name) 
            break;
            case 'email':
              s1.errors.email=this.validateEmail(s1.emp.email)
            break;
            case 'password':
             s1.errors.password=this.validatePassword(s1.emp.password)
              break;
            case 'reEnter':
                s1.errors.reEnter=this.validateReEnter(s1.emp.password,s1.emp.reEnter)
                break;  


        }
        this.setState(s1)
    }
    validateReEnter(pass,re){
      return pass==re?'':'password do not match'
    }
   
    validatePassword(password){
     
      if(password.length<8){
        return 'password must contain 8 character with a lowercase ,uppercase and digit'
      }
      else{
        let count1=0;
        let count2=0;
        let count3=0;

         for(let i=0;i<password.length;i++){
           if(password[i]>='a'&&password[i]<='z'){
            count1+=1
           }
           if(password[i]>='A'&&password[i]<='Z'){
            count2+=1
           }
           if(password[i]>='0'&&password[i]<='9'){
            count3+=1
           }
         }
         if(count1>0 && count2>0 && count3>0){
          return ''
         }
         else{
          return 'password must contain 8 character with a lowercase ,uppercase and digit'
         }
      }
      
    }
   
    validateName(name){
       return name.length<8?'name must have 8 charcter':'' 
    }
    validateEmail(email){
        if(email.indexOf('@')> 0 && email.indexOf('@') < email.length-1){
            let index=email.indexOf('@')
            let str=email.substring(index+1)

            let index2=str.indexOf('.')
            let str2='';
            if(index2>0){
             str2=str.substring(index2+1)
            }
            
            if(str2=='com'){
              return ''
            }
            else{
              return 'email is not valid'
            }
        }
        else{
          return 'email is not valid'
        }
     }
   isError(errors){
      let keys=Object.keys(errors)
      let count=keys.reduce((acc,curr)=>errors[curr]?acc+1:acc,0)
      return count==0

   }
   validForm(){
     let errors=this. validateAll()
     let err= this.isError(errors)
     return err
   }
   async postData(url,obj){
    try{
    let response=await http.post(url,obj)
     this.setState({successfull:'successfully added',disabled:true})
    }
    catch(ex){
      this.setState({erroremp:'database error',disabled:false}) 
    }
  
   }
   handleSubmit=()=>{
     let obj=this.state.emp
    let url='/empapp/emps'
    this.postData(url,obj)

   }
     render(){
        let {name,email,password,reEnter}=this.state.emp
        let {errors,successfull,disabled,erroremp}=this.state
        return(
            <div className='container text-center'>
                <h4>Welcome to Employee Management Portal</h4>
                <h4>Add New Employee</h4>
                <h4 className='text-success'>{successfull}</h4>
                <h4 className='text-danger'>{erroremp}</h4>
                <br/>
                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Name</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enterEmail" name='name' value={name} onChange={this.handleChange} onBlur={this.handleValidate}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.name}</span>
                 </div>

                 <div className='row'>
                 <div className='col-4'></div>
                 <div className='col-2'>Email</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="email" class="form-control"  placeholder="enterEmail" name='email' value={email} onChange={this.handleChange} onBlur={this.handleValidate} />
                 </div>
                 </div>
                 <span className='text-danger'>{errors.email}</span>
                 </div>

                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Password</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="password" class="form-control"  placeholder="enterEmail" name='password' value={password} onChange={this.handleChange} onBlur={this.handleValidate}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.password}</span>
                 </div>
                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>ReEnter Password</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="password" class="form-control"  placeholder="enterEmail" name='reEnter' value={reEnter} onChange={this.handleChange} onBlur={this.handleValidate}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.reEnter}</span>
                 </div>
                 <button className='btn btn-primary' onClick={this.handleSubmit} disabled={disabled} >Submit</button>

            </div>
        )
     }
}
export default AddEmp