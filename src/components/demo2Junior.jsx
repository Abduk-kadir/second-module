import React,{Component} from 'react'
import http from '../service6/httpService6'
class Demo2Junior extends Component{
     state={
        
     }
    async componentDidMount(){
        try{
         let response=await http.get('/myJunior')
         let {data}=response
         this.setState({user:data,errMsg:null})
        }
        catch(ex){
            let errMsg=`${ex.response.status} ${ex.response.statusText}`
            this.setState({errMsg:errMsg})
        }

    }
    render(){
        let {errMsg,user}=this.state
        return (
            <div className='container'>
                {errMsg&&<h4>{errMsg}</h4>}
                {
                    user&&user.map(elem=>(
                        <div className='row'>
                            <div className='col-2'>{elem.empCode}</div>
                            <div className='col-2'>{elem.name}</div>
                            <div className='col-2'>{elem.designation}</div>
                            <div className='col-2'>{elem.department}</div>
                        </div>    
                    ))
                }

            </div>
        )
    }
}
export default Demo2Junior