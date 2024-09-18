import React,{Component} from 'react'

import httt from '../service3/htttService3';
class StudentCourse extends Component{
    state={
        courses:[],
        edit:false,
        studentarr:[]
    }

    async fetchData(url){
        console.log('fetching data')
        let response=await httt.get(url)
        let {data}=response;
        let response2=await httt.get('/getstudentname')
        this.setState({courses:data,studentarr:response2.data})
       }

    async postData(url,obj){
        let response=await httt.put(url,obj)
        this.setState({edit:false})

    } 
    componentDidMount(){
        let url='/getCourses'
        this.fetchData(url)
    }   
    addStudentToCourse=(id)=>{
     let s1={...this.state}
     let course =s1.courses.find(elem=>elem.courseId==id)
     console.log(course)
     console.log(id)
     this.setState({course:course,edit:true})
    }
    handleChange=(e)=>{
         let s1={...this.state}
         let {currentTarget:input}=e
         s1.course[input.name]=input.type=='checkbox'?this.updatCb(s1.course.students,input.value,input.checked):input.value
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
    hadleUpdate=()=>{
        let s1={...this.state}
        let val='student'
        let url=`/putCourse?value=${val}`
        let obj=s1.course;
        this.postData(url,obj)
    }
    makeForm(){
        let {courseId,code,description,students}=this.state.course
        let {studentarr}=this.state
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
                studentarr.map(elem=>(
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" name='students'
                    value={elem}
                    checked={students.findIndex(val=>val==elem)>-1}
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
        let {courses,edit}=this.state;
        return(   
            edit?this.makeForm():<div className='container'>
                <h6>Add student to a Course</h6>
                 <div className='row'>
                    <div className='col-2'>Id</div>
                    <div className='col-2'>Name</div>
                    <div className='col-2'>Code </div>
                    <div className='col-2'>Description</div>
                    <div className='col-2'>Students</div> 
                    <div className='col-2'></div> 
                </div>
                {
                    courses.map(elem=>(
                        <div className='row border bg-warning'>
                            <div className='col-2'>{elem.courseId}</div>
                            <div className='col-2'>{elem.name}</div>
                            <div className='col-2'>{elem.code}</div>
                            <div className='col-2'>{elem.description}</div>
                            <div className='col-2'>{elem.students.join(',')}</div>
                            <div className='col-2'>
                                <button className='btn btn-secondary' onClick={()=>this.addStudentToCourse(elem.courseId)}>Edit</button>
                            </div>
                        </div>
                    ))
                }
            
            </div>  
        )
     }
   
}
export default StudentCourse