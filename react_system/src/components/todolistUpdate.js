import React from 'react';
import { Form , Input , Button,Select,message } from 'antd';
import axios from 'axios'

const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol : {span : 9},
    wrapperCol : {span : 15} 
};
class FormLayout extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            ModalShow: false,
            confirmLoading: false,
            formData: {
                title:"",
                content:"",
                id: ""
            },
            operation: "",
            record:{

            }
        };
    }

    componentDidMount() {
        const { history } = this.props
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        let id = this.props.match.params.id
        // console.log(id)
        axios.post(
            `http://localhost:3001/api/todolist/getTodoByid/${id}`,
            {
                data: {}
            },
            { headers: { Authorization: `token ${userinfo.token}` } }
        )
            .then(res => {
                    console.log(res.data)
                if (res.data.success) {
                    this.setState({ formData: res.data.data })
                } else {
                    message.error(res.data.message)
                }
            });
    }

    handleSubmit(e){
        e.preventDefault();
        const  record  = this.state.formData;
        this.props.form.validateFields(function(errors,value){
            if(!errors){
                console.log(value)
                let userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
                let obj = { 
                    "title": value.title,
                    "content": value.content, 
                    "userid": userinfo.userid,
                    "id": record._id
                }
                axios.put(
                    `http://localhost:3001/api/todolist/updateTodolist/${record._id}`,
                    obj,
                    { headers: { Authorization: `token ${userinfo.token}` } }
                )
                    .then(res => {
                        if (res.data.success) {
                            message.success('success updates')
                        } else {
                            message.error(res.data.message)
                        }
                    });
                }
            });
    }




    render(){
        const { getFieldDecorator } = this.props.form;
        const  record  = this.state.formData;
        return (
            <Form onSubmit= {this.handleSubmit.bind(this)}>
         
                <FormItem label="title" {...formItemLayout}>
                    {getFieldDecorator('title', { 
                        rules: [{ 
                            required: true, message: 'input title!'
                        }],
                        initialValue : record ? record.title : ""
                    })(
                        <Input placeholder="input title"/>
                    )}
                </FormItem>
                <FormItem label="content"  {...formItemLayout}>
                    {getFieldDecorator('content', {
                        rules: [{ 
                            required: true, message: 'content!' 
                        }],
                        initialValue : record ?  record.content : ""
                    })(
                        <Input placeholder="content" />
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

export default FormLayout = Form.create()(FormLayout);