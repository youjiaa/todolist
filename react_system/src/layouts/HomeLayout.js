import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Layout, Menu, Icon ,Dropdown} from 'antd';

const { SubMenu  } = Menu;
const { Header, Content, Sider } = Layout;

class HomeLayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            systemName : "",
            userType: "1"
        };
    }
    componentDidMount(){
        let userinfo = sessionStorage.getItem("userinfo")
        const { history } = this.props
        if(userinfo){
            userinfo = JSON.parse(userinfo)
            this.setState({
                systemName: userinfo.name,
                userType: userinfo.type,
            })
            // console.log(userinfo)
        }else{
            history.push('/login');
        }
    }

    clickMenu(e){
        const { history } = this.props
        // console.log(e.key)
        if(e.key === "logout"){
            history.push('/login');
        }
    }

    render(){
        const { children } = this.props;
        const menu = (
            <Menu onClick={e => this.clickMenu(e)}>
               <Menu.Item key="logout">logout</Menu.Item>
            </Menu>
          );

        return (
            <Layout style={{width:"100vw",height:"100vh"}}>
                <Header className="header">
                    <div className="logo">
                        <span style={{color:"#fff",fontSize:22,fontWeight:"bold"}}>User Dashboard</span>
                        <span style={{color:"#fff",fontSize:16,fontWeight:"bold",float:'right'}}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                             {this.state.systemName} <Icon type="down" />
                            </a>
                        </Dropdown>
                            
                        </span>
                    </div>
                </Header>

                <Layout>
                    <Sider width={300} style={{ background: '#fff' }}>
                        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                            {
                                this.state.userType === '1'?(
                                    <SubMenu key="sub2" title={<span><Icon type="book" />todolist management</span>}>
                                        <Menu.Item key="3">
                                            <Link to="/todolist/list">todolistList</Link>
                                        </Menu.Item>
        
                                        <Menu.Item key="4">
                                            <Link to="/todolist/add">Addtodolist</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                ):""
                            }
                        
                            {
                                this.state.userType === '0' ? (
                                    
                                    <SubMenu key="sub4" title={<span><Icon type="user" />User management</span>}>
                                        <Menu.Item key="7">
                                            <Link to="/UserList/list">User List</Link>
                                        </Menu.Item>
                                        <Menu.Item key="8">
                                            <Link to="/UserList/add">Add User</Link>
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <Link to="/todolist/list">todolistList</Link>
                                        </Menu.Item>
        
                                        <Menu.Item key="4">
                                            <Link to="/todolist/add">Addtodolist</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                    /* <SubMenu key="sub2" title={<span><Icon type="book" />todolist management</span>}>

                                        </SubMenu> */
                                    
                                ):""
                            }
                        </Menu>
                    </Sider>

                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight:480 }}>
                            { children }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default  withRouter(HomeLayout);;