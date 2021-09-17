import React from 'react';
import { Table, Button, message, Divider, Spin } from 'antd';
import axios from 'axios'
class todoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            ModalShow: false,
            confirmLoading: false,
            formData: {},
            operation: "",
            todoList: [],
        };
    }

    componentDidMount() {
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        axios.post(
            `http://localhost:3001/api/todolist/getTodo/${userinfo.userid}`,
            {
                data: {}
            },
            { headers: { Authorization: `token ${userinfo.token}` } }
        )
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        todoList: res.data.data
                    })
                } else {
                    message.error(res.data.message)
                }
            });
    }

    modifyFunction(record) {
        this.props.history.push({
            pathname: `/todolist/update/${record._id}`
        })
    }

    getData(){
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        axios.post(
            `http://localhost:3001/api/todolist/getTodo/${userinfo.userid}`,
            {
                data: {}
            },
            { headers: { Authorization: `token ${userinfo.token}` } }
        )
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        todoList: res.data.data
                    })
                } else {
                    message.error(res.data.message)
                }
            });
    }

    
    deleteTodo(record){
        // console.log(record)
        // const { history } = this.props
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        // console.log(userinfo.token)
        axios.delete(
            `http://localhost:3001/api/todolist/delTodo/${record._id}`,
           {
               data:{a:1}
           },
            { headers: { Authorization: `token ${userinfo.token}` } }
        )
            .then(res => {
                if (res.data.success) {
                    this.getData()
                    message.success("success delete")
                } else {
                    message.error(res.data.message)
                }
            });
    }


    render() {
        const { todoList } = this.state;

        const columns = [ {
            title: 'title',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: 'content',
            dataIndex: 'content',
            key: 'content'
        }, 
        {
            title: 'operation',
            key: 'operation',
            render: (text, record) => (
                <span type="ghost">
                    <Button size="small" onClick={() => this.modifyFunction(record)}>edit</Button>
                    <Divider type="vertical" />
                    <Button size="small" onClick={() => this.deleteTodo(record)}>delete</Button>
                    <Divider type="vertical" />
                </span>
            )
        }];

        return (
            <div>
                <Table columns={columns} dataSource={todoList} rowKey="id" />
            </div>
        );
    }
}


export default todoList;