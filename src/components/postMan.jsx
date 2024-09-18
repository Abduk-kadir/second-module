import React,{Component} from 'react'
import http from '../service5/httpService5'
class PostMan extends Component{
    state={
        reqArr:['Post','Get'],
        infor:{selectedValue:'',url:'',body:''},
        res:'',
        status:'',
        time:''
    }
    async fetchData(url){
      let date1;
      
        try{
            date1=Date.now()
            let response=await http.get(url)
            let {data}=response
           
            this.setState({res:JSON.stringify(data),status:response.status,statusText:response.statusText,time:Date.now()-date1})
        }
        catch(err){
          
            if(err.response){
            let {status,statusText,data}=err.response
            this.setState({status:status,statusText:statusText,res:data,time:Date.now()-date1})
            }
            else{
              let res=`<!DOCTYPE html>
               <html lang="en">
               
               <head>
                   <meta charset="utf-8">
                   <title>Error</title>
               </head>
               
               <body>
                   <pre>Cannot  ${this.state.infor.selectedValue} ${this.state.infor.url.substring(21)}</pre>
               </body>
               
               </html>`
               this.setState({res:res,status:404,statusText:'Not Found',time:Date.now()-date1})
            }
        }
    }
    async postData(url,obj){
      let date1;
      try{
        date1=Date.now()
        let response=await http.post(url,obj)
        let {data}=response
        this.setState({res:JSON.stringify(data),status:response.status,statusText:response.statusText,time:Date.now()-date1})
    }
    catch(err){
       console.log('post err is:',err.response)
        console.log(err.response==true)
        if(err.response){
        let {status,statusText,data}=err.response
      
        this.setState({status:status,statusText:statusText,res:JSON.stringify(data),time:Date.now()-date1})
        }
        else{
          let res=`<!DOCTYPE html>
           <html lang="en">
           
           <head>
               <meta charset="utf-8">
               <title>Error</title>
           </head>
           
           <body>
               <pre>Cannot  ${this.state.infor.selectedValue} ${this.state.infor.url.substring(21)}</pre>
           </body>
           
           </html>`
           this.setState({res:res,status:'404',statusText:'Not Found',time:Date.now()-date1})
        }
    }

    }


     handleChange=(e)=>{
        let {currentTarget:input}=e
        let s1={...this.state}
        s1.infor[input.name]=input.value;
        this.setState(s1)
     }
    handleSubmit=()=>{
        let s1={...this.state}
        let {selectedValue,url,body}=s1.infor
        switch(selectedValue){

           case 'Get':
            this.fetchData(url) 
            break;
            case 'Post':
            this.postData(url,JSON.parse(body)) 
            break;
           
            
        }
    } 
    render(){
       let {reqArr,infor,res,status,statusText,time}=this.state
       let {selectedValue,url,body}=infor
        return(
       <div className='container'>

         <div className='row'>
          <div className='col-2'>
            {
                <select class="form-select"  name='selectedValue' value={selectedValue} onChange={this.handleChange}>
                <option  disabled value=''>select Request type</option>
                 {
                    reqArr.map(elem=>(
                        <option value={elem}>{elem}</option>
                    ))
                 }
              </select>
            }
          </div>
          <div className='col-8'>
            <input type ='text' className='form-control' name='url' value={url} placeholder='enter url' onChange={this.handleChange} />
          </div>
          <div className='col-2'>
            <button className='btn btn-primary' onClick={this.handleSubmit}>submit</button>
          </div>
          </div>
          <div className='row mt-2'>
            <div className='col-8 border'>
            <textarea className="form-control" name='body' value={body} rows="4"  onChange={this.handleChange}></textarea>
            </div>
          </div>
          <div className='row mt-2 '>
            <div className='col-8 border'>
            <div className='row'>
              <div className='col-6'>Resoponse</div>
              <div className='col-3'>
                {status?`status ${status} ${statusText}` :''}
              </div>
              <div className='col-3'>
                {time?`time ${time} ms` :''}
              </div>
             
            </div>
            <textarea className="form-control" name='res' value={res} rows='6' onChange={this.handleChange}></textarea>
            </div>
          </div>


       </div>
        )
    }
}
export default PostMan