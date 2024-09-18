import React,{Component} from 'react'
import httt from '../service3/htttService3'
import auth from '../service3/authService3'
class AllClassesFaculty extends Component{
    state={
        classes:[]
    }
    async fetchData(url){
        let response=await httt.get(url)
        let {data}=response;
        this.setState({classes:data})
    }
    componentDidMount(){
     let user=auth.getUser()
     let {name}=user
     this.fetchData(`/getFacultyClass/${name}`)
    }
    hadleEdit=(id)=>{
        let url=`/class/edit/${id}`
        this.props.history.push(url)

    }

    render(){
        let {classes}=this.state
        return (
            <div className='container mt-5'>
               <h4>All Scheduled Class</h4>
             <div className='row bg-secondary bg-opacity-25'>
                   
                    <div className='col-3'>Course Name</div>
                    <div className='col-3'>Start Time </div>
                    <div className='col-2'>end Time</div>
                    <div className='col-2'>Topic</div>
                    <div className='col-2'></div>
                    </div>     
                    {
                     classes.map(elem=>(
                        <div className='row border bg-primary bg-opacity-25'>
                      
                        <div className='col-3'>{elem.course}</div>
                        <div className='col-3'>{elem.time}</div>
                        <div className='col-2'>{elem.endTime}</div>
                        <div className='col-2'>{elem.topic}</div>
                        <div className='col-2'>
                            <button className='btn btn-secondary btn-sm' onClick={()=>this.hadleEdit(elem.classId)}>edit</button>
                        </div>
                        </div>

                     ))
                    }
                   
            

            </div>
        )
        
    }

}
export default AllClassesFaculty