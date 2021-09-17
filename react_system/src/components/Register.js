import { Form, Input, Button, Icon, message,Radio  } from "antd";
import React from 'react';
import axios from 'axios'
import "../layout/main.css";
import Link from "react-router-dom/Link";
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6 },
};
const options = [
  { label: 'admin', value: '0' },
  { label: ' user', value: '1' },
];
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};
class Login extends React.Component {
  state = {
    value1: '1'
  };
  onFinish(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          name: values.username,
          password: values.password,
          type: this.state.value1
        }
        console.log(data)
        const { history } = this.props
        axios
          .post("http://localhost:3001/api/token/register", data)
          .then(response => {
            if (response.data.success != false) {
              message.info('success register');
              localStorage.setItem("userinfo",JSON.stringify(response.data.data))
              history.push('/login')

            } else {
              message.error(response.data.message);
            }
            console.log(response)
          })
          .catch(function (error) {
            message.error('net error ');
          });
      }
    });

  }
  onChange1 = e => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      value1: e.target.value,
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
                      placeholder="account"
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
                <Form.Item>
                  <Radio.Group options={options} onChange={this.onChange1} value={this.state.value1} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 10, offset: 5 }} >
                  <Button type="primary" htmlType="submit" style={{ width: "200px" }}>
                    Register
                  </Button>
                <Link to="/login">Have acc, go login</Link>
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
