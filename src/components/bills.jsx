import React,{Component} from 'react'
import http from '../service2/httpservice2'
import auth from '../service2/authService2'
import { Link } from 'react-router-dom'
class Bills extends Component{
    state={
      billsdata:{},
      view:false,
      newbill:{empuserid:auth.getUser().empuserid,description:'',expensetype:'',amount:''},
      arr:['Travel', 'Hotel', 'Software', 'Communication, Others'],
      errors:{},
      success:'',
      dis:false
    }
    async fetchData(url){
        try{
        let response=await http.get(url)
        let {data}=response;
        this.setState({billsdata:data})
        }
        catch(ex){
            console.log('exception is:',ex)
        }

    }
    componentDidMount(){
        let user=auth.getUser()
        let {empuserid}=user
        let url=`/empapp/empbills/${empuserid}`
        this.fetchData(url)
    }
    handleClick=()=>{
        console.log('arman')
        let s1={...this.state}
        s1.view=true;
        this.setState(s1)
        
    }
    handleChange=(e)=>{
        let s1={...this.state}
        let {currentTarget:input}=e;
        s1.newbill[input.name]=input.value;
        this.validateOnPressKey(e)
    
        this.setState(s1)
     }
     async postData(url,obj){
        try{
            let {newbill}=this.state;
            let id=newbill.empuserid;
        let response=await http.post(url,obj)
        this.setState({success:'bill is successfully added',dis:true})
        let url2=`/empapp/empbills/${id}`
        this.fetchData(url2)
        }
        catch(ex){

        }
     }
     handleSubmit=()=>{
        let {newbill}=this.state;
        let id=newbill.empuserid;
        let url=`/empapp/empbills/${id}`
        this.postData(url,newbill)
       

     }
    addBill(){
   
        let {description,expensetype,amount}=this.state.newbill
        let {arr,errors,dis,success}=this.state
        return(
           <div className='container text-center'>
            <h4 > Enter the detail of New Bill</h4>
            <h6 className='text-success'>{success}</h6>
             <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Description</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter description" name='description' value={description}  onChange={this.handleChange}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.description}</span>
                 </div>

                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Expense Type</div>
                 <div className='col-6'>
                 <select className="form-select" aria-label="Default select example" name='expensetype' value={expensetype} onChange={this.handleChange} >
                  <option  disabled value=''>select type of expense</option>
                  {
                    arr.map(elem=>(
                        <option value={elem}>{elem}</option>
                    ))
                  }
                 
                  </select>
                 </div>
                 <span className='text-danger'>{errors.expensetype}</span>
                 </div>

                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Amount</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="number" class="form-control"  placeholder="enter amount" name='amount' value={amount}  onChange={this.handleChange}/>
                 </div>
                 </div>
                 <span className='text-danger'>{errors.amount}</span>
                 </div>
                 <button className='btn btn-primary' onClick={this.handleSubmit} disabled={dis?dis:!this.validateAll()}>Submit</button>
           </div>
        )
    }
     
    validateAll(){
        let errors={}
        let s1={...this.state}
        errors.description=this.validateDescription(s1.newbill.description);
        errors.expensetype=this.validateExpense(s1.newbill.expensetype);
        errors.amount=this.validateAmount(s1.newbill.amount)
        let err=this.isError(errors)
        return err;

    }
    isError(errors){
        let keys=Object.keys(errors)
        let count=keys.reduce((acc,curr)=>errors[curr]?acc+1:acc,0)
        return count==0
    }
    validateDescription(des){
        return !des?'Description is manadotry':''
    }
    validateExpense(expense){
        return !expense?'expense is manadotry':''
    }
    validateAmount(amount=''){
        let index=amount.indexOf('.')
        if(index>=0){
           if( amount[index+1]==0){
            return 'Not a valid amount'
           }
           else{
             return ''
           }
        }
        else{
            return ''
        }
    }
    validateOnPressKey(e){
        let {currentTarget:input}=e;
        let s1={...this.state}
        switch(input.name){
         case 'description':
          s1.errors.description= this.validateDescription(s1.newbill.description)
           break;
         case 'expensetype':
          s1.errors.expensetype=this.validateExpense(s1.newbill.expensetype) 
           break;
         case 'amount':
          s1.errors.amount=this.validateAmount(s1.newbill.amount)   
        }
        this.setState(s1)
         
       }

 
 handleHandFbill=(expense,id)=>{
    console.log(expense,id)
    if(expense=='Hotel'){
        this.props.history.push(`/emp/hotelbill/${id}`)
    }
 }

    render(){
        let {data=[]}=this.state.billsdata
        let {view,newbill}=this.state
     
        return(
            <div className='container'>
               <div className='row text-center'> <h4>Welcome to Employee Management Portal</h4></div>
                <h5>Details of Bill submitted</h5>
                <div className='row bg-primary border'>
                     <div className='col-3'>Id</div>
                     <div className='col-3'>Description</div>
                     <div className='col-3'>Expense Head</div>
                     <div className='col-2'>Ampount</div>
                     <div className='col-1'></div>
                   </div> 
                {data.map(elem=>(
                   <div className='row border'>
                     <div className='col-3'>{elem.billid}</div>
                     <div className='col-3'>{elem.description}</div>
                     <div className='col-3'>{elem.expensetype}</div>
                     <div className='col-2'>{elem.amount}</div>
                     <div className='col-1'>
                     
                     {elem.expensetype=='Hotel'||elem.expensetype== 'Travel' ?<i className="fa fa-plus-square" onClick={()=>this.handleHandFbill(elem.expensetype,elem.billid)}></i>:''}
                     </div>
                   </div> 
                ))}
             <p onClick={this.handleClick}><u>Add a New Bill</u></p>
             {
               view?this.addBill():''
             
             }
            
            </div>
           
        )
    }
}
export default Bills