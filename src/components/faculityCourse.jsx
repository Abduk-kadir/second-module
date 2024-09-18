import React,{Component} from 'react'

import httt from '../service3/htttService3';
class FaculityCourse extends Component{
    state={
        courses:[],
        edit:false,
        facultyarr:[]
    }

    async fetchData(url){
        let response=await httt.get(url)
        let {data}=response;
        let response2=await httt.get('/getfacultyname')

        this.setState({courses:data,facultyarr:response2.data,edit:false})
       
       }
       async postData(url,obj){
        let response=await httt.put(url,obj)
        this.setState({edit:false})

    } 
    componentDidMount(){
        let url='/getCourses'
        this.fetchData(url)
    } 
    handleEdit=(id)=>{
       let s1={...this.state} 
       let f=s1.courses.find(elem=>elem.courseId==id)
       this.setState({course:f,edit:true}) 
    } 
    hadleUpdate=()=>{
        let s1={...this.state}
        let url='/putCourse'
        let obj=s1.course;
        this.postData(url,obj)
    }
    handleChange=(e)=>{
        let s1={...this.state}
        let {currentTarget:input}=e
        s1.course[input.name]=input.type=='checkbox'?this.updatCb(s1.course.faculty,input.value,input.checked):input.value
        this.setState(s1)
   }
   updatCb(arr,value,checked){
       if(checked){
           arr.push(value)
       }
       else{
           let index=arr.findIndex(elem=>elem==value)
           arr.splice(index,1)
       }
       return arr
   }
    makeForm(){
        let {courseId,code,description,faculty}=this.state.course
        let {facultyarr}=this.state
        return (
         
            <div className='container'>
             <h4>Edit the Form</h4>   
             <label className='form-label'>Name</label>
             <input className='form-control' name='courseId' value={courseId} onChange={this.handleChange} />

             <label className='form-label'>Course Code</label>
             <input className='form-control' name='code' value={code} onChange={this.handleChange}/>

             <label className='form-label'>Description</label>
             <input className='form-control' name='description' value={description} onChange={this.handleChange}/>
             {
                facultyarr.map(elem=>(
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" name='faculty'
                    value={elem}
                    checked={faculty.findIndex(val=>val==elem)>-1}
                    onChange={this.handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      {elem}
                    </label>
                  </div> 
                ))
             }

            <button className='btn btn-primary' onClick={this.hadleUpdate}>Update</button> 
            </div>
        )
    }
 

     render(){
        let {courses}=this.state;
        let {edit}=this.state
        return(
            edit?this.makeForm():
            <div className='container'>
                <h6>Add Faculty to a Course</h6>
                 <div className='row'>
                    <div className='col-2'>Id</div>
                    <div className='col-2'>Name</div>
                    <div className='col-2'>Code </div>
                    <div className='col-2'>Description</div>
                    <div className='col-2'>Faculty</div> 
                    <div className='col-2'></div> 
                </div>
                {
                    courses.map(elem=>(
                        <div className='row border bg-warning'>
                            <div className='col-2'>{elem.courseId}</div>
                            <div className='col-2'>{elem.name}</div>
                            <div className='col-2'>{elem.code}</div>
                            <div className='col-2'>{elem.description}</div>
                            <div className='col-2'>{elem.faculty.join(',')}</div>
                            <div className='col-2'>
                                <button className='btn btn-secondary' onClick={()=>this.handleEdit(elem.courseId)}>Edit</button>
                            </div>
                          
                          
                        </div>
                    ))
                }
            </div>
        )
     }
   
}
export default FaculityCourse