import React,{Component} from 'react'
import auth from '../service3/authService3';
import httt from '../service3/htttService3';
class BankNomDetail extends Component{
    state={
    
        detail:{gender:'',nomineeName:'',relationship:'',jointsignatory:'',date:'',month:'',year:''},
        edit:false,
        genderArr:['Male','Female']
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
    componentDidMount(){
        let user=auth.getUser()
        let {name}=user;
        let url=`/getNominee/${name}`
        this.fetchData(url)
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
        console.log(input.checked)
       input.type=='checkbox'?s1.detail[input.name]=input.checked:s1.detail[input.name]=input.value
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
        let url='/nomineeDetails'
        let user=auth.getUser()
        let {name}=user
        let {detail}=this.state
        let  {gender,date,month,year,relationship,jointsignatory}=detail;
        let nomineeName=detail.nomineeName
        let dob=`${date}-${month}-${year}`
        let obj={name:name,dob:dob,jointsignatory:jointsignatory,nomineeName:nomineeName,gender:gender,relationship:relationship}
        console.log('object is',obj)
        this.postData(url,obj)
       }

    render(){
        let yearArr=this.makeYearArr()
        let dateArr=this.makeDateArr()
       let  montArr=['January', 'February', 'March', 'April', 'May', 'June','July','August','September', 'October', 'November','December']
       let {detail,genderArr,edit}=this.state
       let {gender,nomineeName,relationship,jointsignatory,date,month,year}=detail
      
        return (
            <div className='container'>
               <h5>Nomniee Detail</h5>  
               <label className='form-label'>Name<span class="badge text-danger">*</span></label> 
               <input className='form-control' placeholder='enter name' name='nomineeName' value={nomineeName} onChange={this.handleChange}/>
              <br/>
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
              <label className='form-label'>RelationShip<span class="badge text-danger">*</span></label> 
              <input className='form-control' placeholder='enter name' name='relationship' value={relationship} onChange={this.handleChange}/>
              
             <div class="form-check">
             <input class="form-check-input" type="checkbox" name='jointSignatory' checked={jointsignatory==true} onChange={this.handleChange}/>
            <label class="form-check-label" for="flexCheckDefault">
            jointsignatory
            </label>
         </div>
             {
              edit?<button className='btn btn-primary' onClick={this.handleAdd}>Add Detail</button>:''
             }
            

            </div>
        )
    }
}
export default BankNomDetail