import React from 'react'; 
import HomeLayout from './layouts/HomeLayout';

import todolistList from './components/todolistList';
import todolistAdd from './components/todolistAdd';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router ,Route,Switch  } from 'react-router-dom';
import todolistUpdate from './components/todolistUpdate';

class App extends React.Component{
    render (){
        return (
            <div style={{width:"100vw",height:"100vh"}}>
            <Router>
                <Switch>
                <Route path="/login" component={Login} exact></Route>
                <Route path="/register" component={Register} exact></Route>
                <HomeLayout>  
                    <div>
                        <Route path="/todolist/list" component={todolistList}></Route>
                        <Route path="/todolist/add" component={todolistAdd}></Route>
                        <Route path="/todolist/update/:id" component={todolistUpdate}></Route>
                        <Route path="/UserList/list" component={UserList}></Route>
                        <Route path="/UserList/add" component={UserAdd}></Route>
                    </div>
                </HomeLayout>
                </Switch>
            </Router>
            <Router>
            </Router>
            </div>
        );
    
    }
}


export default App;

