import { Form, Input, Button, Icon, message } from "antd";
import React from 'react';
import axios from 'axios'
import "../layout/main.css";
import Link from "react-router-dom/Link";
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6 },
};


class Login extends React.Component {
  onFinish(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          name: values.username,
          password: values.password
        }
        const { history } = this.props
        axios
          .post("http://localhost:3001/api/token/login", JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          })
          .then(response => {
            console.log(response)
            if (response.data.success ) {
              message.info('success login');
              sessionStorage.setItem("userinfo",JSON.stringify(response.data))
              history.push('/UserList/personInfo')
            } else {
              message.error(response.data.message);
            }
          })
          .catch(function (error) {
            message.error('net error');
          });
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bg">
        <div className="logintitle">Management System</div>
        <div className="box1">
          <div className="middle1">
            <div className="middle_left">
              <img src={require("../static/images/login.jpg")} />
            </div>
            <div className="middle_right">
              <Form
                {...layout}
                name="basic"
                onSubmit={this.onFinish.bind(this)}
              >
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'input username!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="username"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'input password!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="password"
                    />,
                  )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 10, offset: 5 }} >
                  <Button type="primary" htmlType="submit" style={{ width: "200px" }}>
                    Login
                </Button>
                <Link to="/register">No acc? go register</Link>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


const WrappedRegistrationForm = Form.create()(Login)
export default WrappedRegistrationForm;
