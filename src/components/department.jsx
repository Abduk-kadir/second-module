import React,{Component} from 'react'
import http from '../service2/httpservice2'

class Department extends Component{
    state={
        detail:{empuserid:'',manager:'',department:'',designation:''},
        dis:'',
        mess:'',
        missDet:''
    }
   async  fetchdata(url){
       let response=await http.get(url)
       let {data}=response;
        let {department,designation,manager}=data
      
        department&&designation&&manager?this.setState({detail:data,dis:true,mess:'desplaying department detail'}):this.setState({detail:data,missDet:'no Department found please enter them'})
      
    }
    componentDidMount(){
      let {id}=this.props.match.params
      let url=`/empapp/empdept/${id}`
      this.fetchdata(url)

    }
    validateAll(){
      let {detail}=this.state
      let errors={} 
      errors.department=this.validateDepartment(detail.department)
      errors.designation=this.validateDesignation(detail.designation)
      errors.manager=this.validateManager(detail.manager)
      console.log('all error',errors)
      let err=this.isError(errors)
      return err
    }
    isError(errors){
        let keys=Object.keys(errors)
        let count=keys.reduce((acc,curr)=>errors[curr]?acc+1:acc,0)
        return count==0
    }
    validateDepartment(dep){
        return !dep?'department is manadotry':''
    }
    validateDesignation(des){
        return !des?'desination is manadotry':''
    }
    validateManager(man){
        return !man?'manager is manadotry':''
    }
 async postdata(url,obj){
    let s1={...this.state}
    let response=await http.post(url,obj)
    s1.success='successfull added'
    s1.dis=true
    this.setState(s1)

 }
 handleSubmit=()=>{
   let {detail}=this.state
   this.postdata(`/empapp/empdept/${detail.empuserid}`,detail)

 }

    handleChange=(e)=>{
        let s1={...this.state}
        let {currentTarget:input}=e;
        s1.detail[input.name]=input.value;
        this.setState(s1)
     }

    render(){
        let {manager,department,designation}=this.state.detail
        let {dis,mess,missDet,success}=this.state
        return(
            <div className='container text-center'>
                <h4>Welcome to Employee Management Portal</h4>
                <h5>Department detail of new Employee</h5>
                <h6 className='text-success'>{mess}</h6>
              
                {success?<h6 className='text-success'>{success}</h6>: <h6 className='text-danger'>{missDet}</h6>}
                <br/>
                <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Department</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter department" name='department' value={department} onChange={this.handleChange}/>
                 </div>
                 </div>
                 </div>
                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Designation</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter designation" name='designation' value={designation} onChange={this.handleChange}/>
                 </div>
                 </div>
                 </div>
                 <div className='row '>
                 <div className='col-4'></div>
                 <div className='col-2'>Manager Name</div>
                 <div className='col-6'>
                 <div class="mb-3">
                 <input type="text" class="form-control"  placeholder="enter manage name" name='manager' value={manager} onChange={this.handleChange}/>
                 </div>
                 </div>
                 </div>
                 <button className='btn btn-primary' onClick={this.handleSubmit} disabled={dis?dis:!this.validateAll()}>Submit</button>
            </div>
        )
    }
}
export default Department