import React,{Component} from 'react'
import auth from '../service2/authService2'
import http from '../service2/httpservice2'
class Contact extends Component{
    
    state={
        contact:{},
        dis:false,
        mess:'',
        errors:{},
        successfull:''
    }
    async fetchData(url){
     try{
       let response=await http.get(url)
        console.log('response is',response)
       let {data}=response
       console.log('the data is:',data)
       let {country,pincode,city,address,mobile}=data;
       {country&&pincode&&city&&address&&mobile?this.setState({contact:data,dis:true,mess:'displaying contact detail'}):
       this.setState({contact:data,missdetail:'No contact details found please enter them'})
      }
      }
      catch(ex){

      }

    }
    async postData(url,obj){
      try{
      let response= await http.post(url,obj)
      this.setState({successfull:"contact is added successfully",dis:true})
      }
      catch(ex){
       this.setState({successfull:'contact is not added successfully'})
      }
    }
    handleSubmit=()=>{
      let s1={...this.state}
       this.postData(`/empapp/empcontact/${s1.contact.empuserid}`,s1.contact)
    }
    validateOnPressKey(e){
     let {currentTarget:input}=e;
     let s1={...this.state}
     switch(input.name){
      case 'country':
       s1.errors.country= this.validateCountry(s1.contact.country)
        break;
      case 'pincode':
       s1.errors.pincode=this.validatePincode(s1.contact.pincode) 
        break;
      case 'mobile':
       s1.errors.mobile=this.validateMobile(s1.contact.mobile)   
     }
     this.setState(s1)
      
    }
    validateAll(){
      let {contact}=this.state
      let errors={} 
      errors.country=this.validateCountry(contact.country)
      errors.pincode=this.validatePincode(contact.pincode)
      errors.number=this.validateMobile(contact.mobile)
      let err=this.isError(errors)
      return err
    }
    validateCountry(country){
      return !country?'country is manadotry':''
    }
    validatePincode(pincode){
      return !pincode?'pincode is manadotry':''
    }
    validateMobile(mobile=''){
      let count=0;
      if(mobile.length<10){
        return 'mobile length should be 10 character and allowed character is 0-9,+,-,space'
      }
      else{
            for(let i=0;i<mobile.length;i++){
              if(mobile[i] >='a'&&mobile[i]<='z' || mobile[i] >='A'&&mobile[i]<='Z'){
                count+=1
              }
            }
            if(count>0){
              return 'mobile length should be 10 character and allowed character is 0-9,+,-,space'
            }
            else{
              return ''
            }

      }
    }

    isError(errors){
        let keys=Object.keys(errors)
        let count=keys.reduce((acc,curr)=>errors[curr]?acc+1:acc,0)
        return count==0
    }
    componentDidMount(){
      let user=auth.getUser()
      let {empuserid}=user;
      let url=`/empapp/empcontact/${empuserid}`
      this.fetchData(url)
    }
    
    handleChange=(e)=>{
        let s1={...this.state}
        let {currentTarget:input}=e;
        s1.contact[input.name]=input.value;
        this.validateOnPressKey(e)
        this.setState(s1)
     }

    render(){
        let {contact,dis,mess,missdetail,errors,successfull}=this.state
        let {country,pincode,city,address,mobile}=contact
        return(
            <div className='container text-center'>
                <h4> Welcome to Employee Management Portal</h4>
                <h5> Your contact Details</h5>
                <h4 className='text-success'>{mess}</h4>
                {successfull?<h4 className='text-success'>{successfull}</h4>:<h4 className='text-primary'>{missdetail}</h4>}
                <br/>

                <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Country</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter country" name='country' value={country} onChange={this.handleChange}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.country}</span>
                 </div>

                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>PinCode</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter pincode" name='pincode' value={pincode} onChange={this.handleChange}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.pincode}</span>
                 </div>

                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Address</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter address" name='address' value={address} onChange={this.handleChange}/>
                 </div>
                 </div>
                 </div>
                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>city</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter city" name='city' value={city} onChange={this.handleChange}/>
                 </div>
                 </div>
                 </div>

                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Mobile</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter mobile" name='mobile' value={mobile} onChange={this.handleChange}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.mobile}</span>
                 </div>

               <button className='btn btn-primary' onClick={this.handleSubmit} disabled={dis?dis:!this.validateAll()}>Submit</button>  
                
            </div>
        )
    }
}
export default Contact