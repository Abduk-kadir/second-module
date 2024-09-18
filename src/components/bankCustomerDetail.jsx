import React,{Component} from 'react'
import httt from '../service3/htttService3'
import auth from '../service3/authService3'
class BankCustomerDetail extends Component{
    state={
      detail:{gender:'',PAN:'',addressLine1:'',addressLine2:'',state:'',city:'',date:'',month:'',year:''},
    
      genderArr:['Male','Female'],
      edit:false
     
    }
    async fetchData(url){
        let response=await httt.get(url)
        let {data}=response;
        if(data){
        let {dob}=data

        let dateIndex=dob.indexOf('-')
        let date=dob.substring(0,dateIndex)

        let monthIndex=dob.indexOf('-',dateIndex+1)
        let month=dob.substring(dateIndex+1,monthIndex)
        let year=dob.substring(monthIndex+1)
        let detail={...data,date:date,month:month,year:year}
        this.setState({detail:detail,edit:false})

       
        }
        else{
            this.setState({edit:true})
        }
    }
    componentDidMount(){
        let user=auth.getUser()
        let {name}=user;
        let url=`/getCustomer/${name}`
        this.fetchData(url)
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
    makeYearArr(){
        let arr=[]
        for(let i=1980;i<=2000;i++){
            arr.push(i)
        }
        return arr;
    }
    makeDateArr(){
        let arr=[]
        for(let i=1;i<=31;i++){
            arr.push(i)
        }
        return arr
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        s1.detail[input.name]=input.value
        this.setState(s1)
    }
   async postData(url,obj){
        try{
            let response=await httt.post(url,obj)
            alert('detail is successfully added')
            this.props.history.push('/customer')
        }
        catch(ex){

        }
    }
   handleAdd=(e)=>{
    let url='/customerDetails'
    let user=auth.getUser()
    let {name}=user
    let {detail}=this.state
   let  {gender,addressLine1,addressLine2,PAN,state,city,date,month,year}=detail
    let dob=`${date}-${month}-${year}`
    let obj={name:name,gender:gender,addressLine1:addressLine1,addressLine2:addressLine2,state:state,city:city,PAN:PAN,dob:dob}
    console.log('object is',obj)
    this.postData(url,obj)
   }

    render(){
        let yearArr=this.makeYearArr()
        let dateArr=this.makeDateArr()
       let  montArr=['January', 'February', 'March', 'April', 'May', 'June','July','August','September', 'October', 'November','December']
        let {detail,genderArr,edit}=this.state
        let {gender,PAN,addressLine1,addressLine2,state,city,date,month,year}=detail
        return (
            <div className='container'>
             <h5>Customer Detail</h5>   
            <label className='form-label'>Gender<span class="badge text-danger">*</span></label>
              {
                genderArr.map(elem=>(
                    <div class="form-check form-check-inline ms-5">
                     <input class="form-check-input" type="radio" name='gender' value={elem} checked={elem==gender} onChange={this.handleChange}/>
                     <label class="form-check-label" for="inlineRadio1">{elem}</label>
                     </div>
                ))
              }
              <br/>
              <label className='form-label'>Date of Birth<span class="badge text-danger">*</span></label>

              <div className='row'>
               <div className='col-4'>
                {this.makeDropdown(yearArr,'year',year,'select year')}
               </div>

               <div className='col-4'>
               {this.makeDropdown(montArr,'month',month,'select month')}
               </div>
               <div className='col-4'>
                {this.makeDropdown(dateArr,'date',date,'delect date')}
               </div>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Pan<span class="badge text-danger">*</span></label>
                <input type="text" class="form-control"  placeholder="enter pan" name='PAN' value={PAN} onChange={this.handleChange}/>
               </div> 

               <div className='row'>
                  <div className='col-6'>
                  <input type="text" class="form-control"  placeholder="Line1" name='addressLine1' value={addressLine1} onChange={this.handleChange}/> 
                  </div>

                  <div className='col-6'>
                  <input type="text" class="form-control"  placeholder="Line2" name='addressLine2' value={addressLine2} onChange={this.handleChange} />  
                 </div>
               </div>
               <div className='row'>
                  
                  <div className='col-6'>
                   <label className='form-label'>State<span class="badge text-danger">*</span></label> 
                  <input type="text" class="form-control"  placeholder="state" name='state' value={state} onChange={this.handleChange}/> 
                  </div>

                  <div className='col-6'>
                  <label className='form-label'>city<span class="badge text-danger">*</span></label> 
                  <input type="text" class="form-control"  placeholder="city" name='city' value={city} onChange={this.handleChange}/>  
                 </div>
               </div>
               <br/>
             {
              edit?<button className='btn btn-primary' onClick={this.handleAdd}>Add Detail</button>:''
             }

              

            </div>
        )
    }
}
export default BankCustomerDetail