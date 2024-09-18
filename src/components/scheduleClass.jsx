import React,{Component} from 'react'
import httt from '../service3/htttService3';
import auth from '../services/authService';
class ScheduleClass extends Component{
    state={
      class:{course:'',time:'',endTime:'',topic:''}
    }
    async fetchData(url){
        let response=await httt.get(url)
        let {data}=response;
        let {id}=this.props.match.params
        if(id){
            let response2=await httt.get(`/getAClass/${id}`)
            this.setState({courses:data,class:response2.data,edit:true})
        }
        else{
            this.setState({courses:data,edit:false})
        }
        
    }
    async postData(url,obj){
        let response=await httt.post(url,obj) 
        this.props.history.push('/facultyDashboard')
    }
    async putData(url,obj){
        let response=await httt.put(url,obj) 
        this.props.history.push('/facultyDashboard')
    }
    
    componentDidMount(){
     let user=auth.getUser()
     let {name}=user
     this.fetchData(`/getFacultyCourse/${name}`)
    }
   
   handleChange=(e)=>{
    let {currentTarget:input}=e
   
    let s1={...this.state}
    s1.class[input.name]=input.value
    this.setState(s1)
   }
   handleSubmit=()=>{
    let s1={...this.state}
    let user=auth.getUser()
    let {name}=user
    if(s1.edit){
      let {id}=this.props.match.params
      let obj={...s1.class,facultyName:name}
      let url=`/postClass/${id}`
      this.putData(url,obj)
    }
    else{
        let obj={...s1.class,facultyName:name}
        let url='/postClass'
        this.postData(url,obj)
    }
   

    
   }

    render(){
        let {course,time,endTime,topic}=this.state.class
        let {courses=[]}=this.state
        return (
            <div className='container'>
                <h4>Schedule A Class</h4>
                <select class="form-select" aria-label="Default select example" 
                value={course} 
                name='course'
                onChange={this.handleChange}
                >
                <option selected>Select Course</option>
                {
                    courses.map(elem=>(
                        <option value={elem.name}>{elem.name}</option>
                    ))
                }
               
                </select>
               <label className='form-label'>Time</label> 
               <input type='time' className='form-control' name='time' value={time} onChange={this.handleChange} />
               <label className='form-label'>End Time</label> 
               <input type='time' className='form-control' name='endTime' value={endTime} onChange={this.handleChange} />
               <label className='form-label'>Topic</label> 
               <input type='text' className='form-control' name='topic' value={topic} onChange={this.handleChange} />
               <button className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
export default ScheduleClass