import React,{Component} from 'react'
import http from '../service5/httpService5'
class DemoUser extends Component{
    state={
    
    }

    async componentDidMount(){
        try{
        let response=await http.get('/user')
        let {data}=response
        this.setState({user:data})
        }
        catch(ex){
            console.log(ex)
            let errMsg=`${ex.response.status} ${ex.response.statusText}`
            this.setState({errMsg:errMsg})

        }
    }
    render(){
        let {user,errMsg}=this.state
       
        return(
          <div className='container'>
             <h4>Welcome to User Page</h4>
          {user&& <div>
         
           Id:{user.id}
           <br/>
           Name:{user.name}
           <br/>
           Role:{user.role}
           <br/>
           </div> 
        }
        {
         errMsg&&<h6>{errMsg}</h6>
        }
           </div>
        )
    }
}
export default DemoUser