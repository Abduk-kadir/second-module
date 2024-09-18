import React,{Component} from 'react'
import httt from '../service3/htttService3';
import auth from '../service3/authService3';
class AddPayee extends Component{
    state={
        payee:{payeeName:'',IFSC:'',accNumber:'',bankName:'',choice:''},
        bankArr:['Same Bank','Other Bank'],
        dropDownArr:[]
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        s1.payee[input.name]=input.value
        this.setState(s1)
    }
    async componentDidMount(){
        let response= await httt.get('/getBanks')
        let {data}=response;
        this.setState({dropDownArr:data})
    }
    makeDropdown(arr,name,value,label){
        return( 
        <select class="form-select" name={name} value={value} onChange={this.handleChange}>
        <option disabled value=''>{label}</option>
        {
           arr.map(elem=>(
            <option value={elem}>{elem}</option>
           ))
        }
        
      </select>
      )
    }
    async postData(url,obj){
        try{
          let response=await httt.post(url,obj) 
          alert('payee is success fully added')
          this.props.history.push('/customers')
        }
        catch(ex){

        }
    }
    addPayee=()=>{
        let s1={...this.state}
        let user=auth.getUser()
        let {name}=user;
        let {payeeName,IFSC,accNumber,bankName,choice}=s1.payee
        let obj=choice=='Other Bank'?{name:name,payeeName:payeeName,accNumber:accNumber,IFSC:IFSC,bankName:bankName}:
        {name:name,payeeName:payeeName,accNumber:accNumber,IFSC:'',bankName:'GBI'}
        console.log('payee is:',obj)
        this.postData('/addPayee',obj)
    }
    render(){
       let {payee,bankArr,dropDownArr}=this.state;
       let {payeeName,IFSC,accNumber,bankName,choice}=payee
        return(
          <div className='container'>
             <h5>Add Payee</h5>
             <label className='form-label'>Payee Name</label>
             <input type='text' className='form-control' placeholder='enter payee' 
             name='payeeName' value={payeeName}
             onChange={this.handleChange}
             />


             <label className='form-label'>Account</label>
             <input type='text' className='form-control' placeholder='enter account' 
             name='accNumber' value={accNumber}
             onChange={this.handleChange}
             />
           {
            bankArr.map(elem=>(
                <div class="form-check">
                 <input class="form-check-input" type="radio" name="choice" value={elem} 
                 checked={elem==choice}
                 onChange={this.handleChange}
                 />
                 <label class="form-check-label" for="flexRadioDefault1">
                {elem}
               </label>
               </div>
            ))
           }
          {
            choice=='Other Bank'?
            <React.Fragment>
           
            {this.makeDropdown(dropDownArr,'bankName',bankName,'select bank')}
            <label className='form-label'>IFSC Code</label>
            <input type='text' className='form-control' placeholder='Enter ifsc' 
             name='IFSC'
             value={IFSC}
             onChange={this.handleChange}
            />
            </React.Fragment>

          
            
            
            
            :''
          }
          <button className='btn btn-primary' onClick={this.addPayee}>Add</button>


          </div>
        )
      }
}
export default AddPayee