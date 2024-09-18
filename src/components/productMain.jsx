import React,{Component} from 'react'
import { Route,Switch,Redirect } from 'react-router-dom'
import ProductNav from './productNav'
import Products from './products'
import Product from './product'
import AddProduct from './addProduct'
import DelProduct from './delProduct'
import Login from './login'
import Logout from './logout'
import auth from '../services/authService'
import Users from './users'
import NotAllowed from './notAllowed'
import DelUser from './delUser'
import AddUser from './addUser'
class ProductMain extends Component{
    
    render(){
       let user=auth.getUser()
       console.log('user is',user)
        return(
            <React.Fragment>
            <ProductNav user={user}/>
            <Switch>
            <Route path='/add product'
             render={(props)=>
                user?< AddProduct {...props} />:<Redirect  to='/notallowed' /> }/>
            <Route path='/products/:id/edit'
            
            render={(props)=>
                user?user.role=='admin'?<AddProduct {...props}/>:<Redirect to='/notallowed'  />: <Redirect to='/login'/> }
            />
            <Route path='/products/:id/delete' 
             render={(props)=>
                user?user.role=='admin'?<DelProduct {...props}/>:<Redirect to='/notallowed'  />: <Redirect to='/login'/> }
            />
           <Route path='/products/:id'  component={Product}/>
            <Route path='/products' component={Products}/>
            <Route path='/login' component={Login}/>
          
            <Route path='/users/:id/delete' 
              render={(props)=>user?user.role=='admin'? <DelUser {...props}/>:<Redirect to='/notallowed'/>: <Redirect to ='/login'/>}
            />
            <Route path='/users/:id/edit'
               render={(props)=>user?user.role=='admin'? <AddUser {...props}/>:<Redirect to='/notallowed'/>: <Redirect to ='/login'/>}
             />

            <Route path='/adduser'
            
            render={(props)=>user?user.role=='admin'? <AddUser {...props}/>:<Redirect to='/notallowed'/>: <Redirect to ='/login'/>}
            
            />
         

            <Route path='/users'
            render={(props)=>
                user?user.role=='admin'?<Users {...props}/>:<Redirect to ='/notallowed' />:<Redirect to='/login'/>}
            
            />
            <Route path={'/logout'} component={Logout}/>
            <Route path='/notallowed' component={NotAllowed}/>
            <Redirect from='/' to='/products'/>
            </Switch>  
            </React.Fragment>
        )

    }
}
export default ProductMain