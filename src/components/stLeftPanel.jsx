import React,{Component} from 'react'
class StLeftPanel extends Component{
    state={
        coursearr:['ANGULAR','REACT','CSS','JAVASCRIPT','BOOTSTRAP','NODE','REST AND MICROSERVICES']
        
    }

    handleChange=(e)=>{
        let {currentTarget:input}=e
        let qparams={...this.props.qparams}
        console.log('name',input.name)
        qparams[input.name]=this.updateCb(qparams[input.name],input.value,input.checked)
        this.props.onOptionChange(qparams)
    }
    updateCb(str,value,checked)
     {
         let arr=str?str.split(','):[]
         if(checked){
            arr.push(value)
         }
         else{
            let index=arr.findIndex(elem=>elem==value)
            arr.splice(index,1)
         }
        
         return arr.join(',')
     }

      render(){
       let {coursearr}=this.state
       let {qparams}=this.props
       let {course}=qparams;
       console.log('course is',course)
       let carr=course?course.split(','):[]


        return(
           <div className='container mt-5'>
              {
                coursearr.map(elem=>(
                    <div className='row'>
                     <div className='col-12 border'> 
                     
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" name='course'  value={elem} checked={carr.findIndex(val=>val==elem)>-1} onChange={this.handleChange}   />
                    <label class="form-check-label" for="flexCheckDefault">
                    {elem}
                    </label>
                    </div>
                    <br/>  
                    </div>
                    </div>
                ))
              }
           </div> 
          
        )
      }

}
export default StLeftPanel