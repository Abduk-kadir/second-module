import React,{Component} from 'react'
import http from '../service6/httpService6'
class Demo2Detail extends Component{
    state={
    
    }

    async componentDidMount(){
        try{ 
        let response=await http.get('/myDetails')
        let {data}=response
        this.setState({user:data,errMsg:null})
        }
        catch(ex){
            console.log('excepton is:',ex.response)
           let errMsg=`${ex.response.status} ${ex.response.statusText}`
           this.setState({errMsg:errMsg})

        }
    }
    render(){
        let {user,errMsg}=this.state
       
        return(
          <div className='container'>
           {errMsg&&<h4>{errMsg}</h4>}
           {
             user&&<div>
              Name: {user.name}<br/>
              Code: {user.empCode}<br/>
              Department: {user.department}<br/>
              Designation: {user.designation}

             </div>
           }
           </div>
        )
    }
}
export default Demo2Detail