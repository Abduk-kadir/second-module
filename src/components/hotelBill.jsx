import React,{Component} from 'react'
import authService2 from '../service2/authService2';
import http from '../service2/httpservice2';
class HotelBill extends Component{
    state={
        bill:{},
        dayArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        monthArr:['January','February','march','april','may','june','july','August','September','October','November','December'],
        yearArr:[2018,2019,2020],
        day:''
    }
    async fetchData(url){

        let response=await http.get(url);
        let {data}=response;
        this.setState({bill:data})
    }
    componentDidMount(){
        let user=authService2.getUser()
        let {empuserid}=user
        let {id}=this.props.match.params
        let url=`/empapp/hotelbill/${empuserid}/${id}`
        this.fetchData(url)
    }
    makeDropdown(arr,name,value){
        return (
            <select className="form-select" name={name} value={value}>
              <option disabled value=''>Select one of these</option>
               {
                arr.map(elem=>(
                    <option value={elem}>{elem}</option>
                ))
               }
              
            </select>
        )
    }
    render(){
        let {bill,dayArr,monthArr,yearArr}=this.state;
        let {id}=this.props.match.params
        let {staystartdate=''}=bill

        let day=staystartdate.substring(0,2)
        return (
            <div className='container text-center'>
                <h4>Welcome to Employee Management Portal</h4>
                <h5>Hotel Stay Details</h5>
                <h6>Bill Id:{id}</h6>
                
                
            </div>
        )
    }
}
export default HotelBill