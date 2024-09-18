import React,{Component} from 'react'
class RComp extends Component{
    state={
       students:[
         {name:'Arman khan',math:40,eng:15},
         {name:'Arman khan',math:45,eng:35},
         {name:'Arman khan',math:50,eng:15},
       ]
    }
    getColor(elem){

      return (elem.math+elem.eng)>60?'bg-success':'bg-danger'
      
    }
    render(){
        let {students}=this.state
        let ps=students.filter(elem=>elem.math+elem.eng>60)
           
       
        return (
        
          <React.Fragment>
            <div className='row'>
                   <div className='col-4 border bg-dark text-white'>Name</div>
                   <div className='col-4 border  bg-dark text-white'>Sub1</div>
                   <div className='col-4 border  bg-dark text-white'>Sub2</div>
                  </div>

           {
            ps.map(elem=>{
               return(
                  <div className={'row '+this.getColor(elem)}>
                   <div className='col-4 border'>{elem.name}</div>
                   <div className='col-4 border'>{elem.math}</div>
                   <div className='col-4 border'>{elem.eng}</div>
                  </div>
               )
            })
           }


         </React.Fragment>
         
        
      
        
        
        )
     
    
      }
}
export default RComp