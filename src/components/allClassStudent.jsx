import React,{Component} from 'react'
import httt from '../service3/htttService3'
import auth from '../service3/authService3'
class AllClassStudent extends Component{
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
     this.fetchData(`/getStudentClass/${name}`)
    }

    render(){
        let {courses}=this.state
        return (
            <div className='container mt-5'>
               <h4>All Classes</h4>
             <div className='row bg-secondary bg-opacity-25'>
                    <div className='col-2'>Course Name</div>
                    <div className='col-2'>Start Time</div>
                    <div className='col-2'>End Time </div>
                    <div className='col-3'>Faculty Name</div>
                    <div className='col-3'>Topic</div>
                    </div>     
                    {
                     courses.map(elem=>(
                        <div className='row border bg-danger bg-opacity-25'>
                        <div className='col-2'>{elem.course}</div>
                        <div className='col-2'>{elem.time}</div>
                        <div className='col-2'>{elem.endTime}</div>
                        <div className='col-3'>{elem.facultyName}</div>
                        <div className='col-3'>{elem.topic}</div>
                        </div>

                     ))
                    }
                   
            

            </div>
        )
        
    }

}
export default AllClassStudent