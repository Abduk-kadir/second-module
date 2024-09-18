import React,{Component} from 'react'
import httt from '../service3/htttService3';
import auth from '../services/authService';
class StudentDetail extends Component{

    state={
        detail:{},
        monthwithdate:[
            {month:'January',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},
            {month:'February',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]},
            {month:'March',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},
            {month:'April',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
            {month:'May',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},
            {month:'June',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
            {month:'July',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},
            {month:'August',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},
            {month:'September',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
            {month:'October',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},
            {month:'November',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
            {month:'December',arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},
            
        ],
     
        montarr:['January','February','March','April','May','June','July','August','September','October','Nobember','December'],
        genderarr:['male','female']
    }

    async fetchData(url){
        let response=await httt.get(url)
        let {data}=response;
        let {dob}=data
        if(dob){
        let dateIndex=dob.indexOf('-')
        let date=dob.substring(0,dateIndex)
        let monthIndex=dob.indexOf('-',dateIndex+1)
        let month=dob.substring(dateIndex+1,monthIndex)
        let year=dob.substring(monthIndex+1)
        let detail={...data,date:date,month:month,year:year}
        this.setState({detail:{...data,date:date,month:month,year:year},edit:false})
        }
        else{
          this.setState({detail:{...data,date:'',date:'',month:'',year:''},edit:true})
        }
    }
    async postData(url,obj){
        let response=await httt.post(url,obj)
        alert(obj)
        this.props.history.push('/studentDashboard')
    }
    componentDidMount(){
        let user=auth.getUser()
        let {name}=user
        this.fetchData(`/getStudentDetails/${name}`)
    }
    handleChange=(e)=>{
        let s1={...this.state}
        let {currentTarget:input}=e
        s1.detail[input.name]=input.value;
        this.setState(s1)
    }
    makeyear(start,end){
        let arr=[]
        for(let i=start;i<=end;i++){
             arr.push(i)
        }
        return arr
    }
    makeDropdown=(arr,name,value,label)=>{
        return(
        <select class="form-select" aria-label="Default select example" name={name} value={value} onChange={this.handleChange}>
        <option disabled value=''>{label}</option>
          {
          arr.map(elem=>(
            <option value={elem}>{elem}</option>
          ))

          }
        
        </select>
        )
    }
    handleAdd=()=>{
        let s1={...this.state}
        let {detail}=s1
        let url='/postStudentDetail'
       let  {gender,name,about,date,month,year}=detail
        let dob=`${date}-${month}-${year}`
        let obj={name:name,gender:gender,dob:dob,about:about}
        this.postData(url,obj)
       
    }
    render(){
        let {genderarr,detail,montarr,monthwithdate,edit}=this.state
        let {gender,year,month,date,about}=detail
        let yeararr=this.makeyear(1990,2005)
        let datejs=monthwithdate.find(elem=>elem.month==month)
        let datearr=month&&year?datejs.arr:[]
        return(
            <div className='container'>
            <h4>Student Detail</h4>
            <label className='form-label'>Gender</label>
            {
                genderarr.map(elem=>(
                    <div class="form-check form-check-inline ms-5">
                      <input class="form-check-input" type="radio" name="gender" value={elem}
                       checked={elem==gender}
                       onClick={this.handleChange}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                     {elem}
                      </label>
                    </div>
                    ))
            }
            <br/>
            <label className='form-label'>Date of Birth</label>
            <div className='row'>
                <div className='col-3'>
                {this.makeDropdown(yeararr,'year',year,'select year')}
                </div>
                <div className='col-3'>
                {this.makeDropdown(montarr,'month',month,'select month')}
                </div>
                <div className='col-3'>
                {this.makeDropdown(datearr,'date',date,'select date')}
                </div>
                </div>
                <br/>
                
                <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><strong>About Myself</strong></label>
                  <textarea class="form-control" name='about' value={about} rows="3" onChange={this.handleChange}></textarea>
                </div>
             {  edit?<button className='btn btn-primary mt-1' onClick={this.handleAdd}>Add Detail</button>:''}
        
            </div>

        )
    }

}
export default StudentDetail