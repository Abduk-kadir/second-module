import React,{Component} from 'react'
class StoreLeftPanel extends Component{
    state={
      arr:['Sunglasses','Watches','Belts','Handbags','Formal Shoes','Sport Shoes','Floaters','Sandals']
    }
    
    handleClick=(elem)=>{
       this.props.onOptionChange(elem)
    }
    render(){
        let {arr}=this.state
        return(
            <ul class="list-group">
              {arr.map(elem=>(
                 <li class="list-group-item" onClick={()=>this.handleClick(elem)}>{elem}</li>
              ))}
             
             </ul>
        )
    }
}
export default StoreLeftPanel