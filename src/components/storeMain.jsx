import React,{Component} from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import StoreNavbar from './storeNavbar'
import StoreProduct from './storeProducts'
import auth from '../service3/authService3'
import StoreCart from './storeCart'
import StoreLogin from './storeLogin'
import StoreSummary from './storeSummary'
import StoreLogout from './storeLogout'
import StoreOrderSuccess from './storeOrderSuccess'
import StoreOrder from './storeOrder'
import StoreManageProd from './storeManageProd'
import StoreAddProd from './storeAddprod'
import StoreDelete from './storeDelete'
class StoreMain extends Component{
    
   
    render(){
        let cart=auth.getCart()
        let user=auth.getUser()
        return(
            <div>
                <StoreNavbar cart={cart} user={user}/>
                <Switch>
                   <Route path={'/delete/:id'} component={StoreDelete}  /> 
                   <Route path={'/addProduct'} component={StoreAddProd}  /> 
                   <Route path={'/manage product'} component={StoreManageProd}  />
                   <Route path={'/orders'} component={StoreOrder}  />
                   <Route path={'/summary'} component={StoreSummary}  />
                   <Route path={'/login'} component={StoreLogin}  />
                   <Route path={'/logout'} component={StoreLogout}  />
                   <Route path='/Products/:category' component={StoreProduct}/>
                   <Route path='/successfull' component={StoreOrderSuccess}/>
                   <Route path='/cart' component={StoreCart} ></Route>
                   <Route path='/' component={StoreProduct} ></Route>
                </Switch>
               
            </div>
        )
    }
    
}
export default StoreMain