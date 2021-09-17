import React from 'react';
import { Table, Button, Divider, Input, Row, Col, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import UserUpdate from './UserUpdate';
import axios from 'axios'
const Search = Input.Search;

const paginationProps = {
    pageSize: 8
}
class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            ModalShow: false,
            confirmLoading: false,
            formData: {},
            userList: [],
            operation: "",
        };
    }

    componentDidMount() {
        const { history } = this.props
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        if(userinfo.type === '1'){
            history.push('/login')
        }
        axios.post(
            `http://localhost:3001/api/token/AllUser`,
            {
                data: {}
            },
            { headers: { Authorization: `token ${userinfo.token}` } }
        )
            .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                    this.setState({ userList: res.data.data })
                } else {
                    message.error(res.data.message)
                }
            });
    }
   
    getData() {
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        axios.post(
            `http://localhost:3001/api/token/AllUser`,
            {
                data: {}
            },
            { headers: { Authorization: `token ${userinfo.token}` } }
        )
            .then(res => {
                if (res.data.success) {
                    this.setState({ userList: res.data.data })
                } else {
                    message.error(res.data.message)
                }
            });
    }

    modifyFunction(record) {
        let userList = this.state.userList
        this.setState({
            title: "update info",
            ModalShow: true,
            formData: {
                record,
                userList
            },
            operation: "modify"
        });
    }

    commitFunction(value) {
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        axios.put(
            `http://localhost:3001/api/token/updateUser/${value._id}`,
            {
                "_id": value._id,
                "type": value.usertype == "admin"?'0':'1',
                "name": value.name,
            },
            { headers: { Authorization: `token ${userinfo.token}` } }
        )
            .then(res => {
                if (res.data.success) {
                    this.getData()
                    message.success("success")
                    // if () {
                    //     history.push('/login');
                    // }
                } else {
                    message.error(res.data.message)
                }
            });
    }

    resetFunction() {
        this.setState({
            ModalShow: false,
            formData: {}
        });
    }

    removeUser(record){
        console.log(record)
        const { history } = this.props
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        // console.log(userinfo.token)
        axios.delete(
            `http://localhost:3001/api/token/delUser/${record._id}`,
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
        // const { bookList, removeBookData } = this.props;
        const { title, ModalShow, confirmLoading, userList } = this.state;
        let userListInfo = userList.map(Item => {
            let typeName = "user"
            if (Item.usertype === "0") {
                typeName = "admin"
            }
            return {
                ...Item,
                typeName
            }
        })

        const columns = [{
            title: 'name',
            dataIndex: 'name',
            key: 'userName'
        }, {
            title: 'userType',
            dataIndex: 'typeName',
            key: 'typeName'
        },
        {
            title: 'update',
            key: 'operation',
            render: (text, record) => (
                <span type="ghost">
                    <Button size="small" onClick={() => this.modifyFunction(record)}>Update</Button>
                    <Divider type="vertical" />
                    <Button size="small" onClick={() => this.removeUser(record)}>Delete</Button>
                    <Divider type="vertical" />
                </span>
            )
        }];

        return (
            <div>
                <Table pagination={paginationProps} columns={columns} dataSource={userListInfo} rowKey="id" />
                <Modal
                    title={title}
                    visible={ModalShow}
                    confirmLoading={confirmLoading}
                    onCancel={this.resetFunction.bind(this)}
                    footer={null}
                    destroyOnClose
                >
                    <UserUpdate record={this.state.formData} comfirmHandle={this.commitFunction.bind(this)} />
                </Modal>
            </div>
        );
    }
}

UserList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default UserList;