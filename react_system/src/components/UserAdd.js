import React from 'react';
import { Form, Input, Button, DatePicker, message,Select  } from 'antd';
import axios from 'axios'
const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 }
};
class UserAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            record: {

            },
            registerDate: ""
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let  registerDate  = this.state.registerDate
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        this.props.form.validateFields(function (errors, value) {
            if (!errors) {
                let obj = {
                    ...value,
                    registerDate
                }
              
                axios.post(
                    `http://localhost:3001/api/token/addUser`,
                    obj,
                    { headers: { Authorization: `token ${userinfo.token}` } }
                )
                    .then(res => {
                        if (res.data.success != false) {
                            message.success('success add')
                        } else {
                            message.error(res.data.message)
                        }
                    });
            }
        });
    }

    onChange(date, dateString) {
        this.setState({ registerDate: dateString })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { record } = this.state;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="name" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'input user name!'
                        }],
                        initialValue: record ? record.name : ""
                    })(
                        <Input placeholder="input user name" />
                    )}
                </FormItem>
                <FormItem label="password" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'input password!'
                        }],
                        initialValue: record ? record.password : ""
                    })(
                        <Input placeholder="input password" />
                    )}
                </FormItem>
                <FormItem label="type"  {...formItemLayout}>
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true, message: 'personType!'
                        }],
                        initialValue: record ? record.type : ""
                    })(
                        <Select defaultValue="1" style={{ width: 120 }}>
                            <Option value="0">admin</Option>
                            <Option value="1">user</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem wrapperCol={{ span: 10, offset: 10 }}>
                    <Button type="primary" htmlType="submit">
                        confirm
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default UserAdd = Form.create()(UserAdd);