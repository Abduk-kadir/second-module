import React,{Component} from 'react'
import httt from '../service3/htttService3'
import auth from '../service3/authService3'
class AllCourseFaculty extends Component{
    state={
        courses:[]
    }
    async fetchData(url){
        let response=await httt.get(url)
        let {data}=response;
        this.setState({courses:data})
    }
    componentDidMount(){
     let user=auth.getUser()
     let {name}=user
     this.fetchData(`/getFacultyCourse/${name}`)
    }

    render(){
        let {courses}=this.state
        return (
            <div className='container mt-5'>
               <h4>Course Assigned</h4>
             <div className='row bg-secondary bg-opacity-25'>
                    <div className='col-3'>Course Id</div>
                    <div className='col-3'>Course Name</div>
                    <div className='col-3'>Course Code </div>
                    <div className='col-3'>Description</div>
                    </div>     
                    {
                     courses.map(elem=>(
                        <div className='row border bg-primary bg-opacity-25'>
                        <div className='col-3'>{elem.courseId}</div>
                        <div className='col-3'>{elem.name}</div>
                        <div className='col-3'>{elem.code}</div>
                        <div className='col-3'>{elem.description}</div>
                        </div>

                     ))
                    }
                   
            

            </div>
        )
        
    }

}
export default AllCourseFaculty