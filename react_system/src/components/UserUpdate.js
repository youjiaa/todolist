import React from 'react';
import { Form , Input , Button,Select, message } from 'antd';

import axios from 'axios'
const { Option } = Select;

const FormItem = Form.Item;
const formItemLayout = {
    labelCol : {span : 5},
    wrapperCol : {span : 15} 
};
class UserUpdate extends React.Component{
    
    handleSubmit(e){
        e.preventDefault();
        const comfirmHandle =  this.props.comfirmHandle;
        const fieldsValue = this.props.form.getFieldsValue();
        this.props.form.validateFields(function(errors,value){
            if(!errors){
               comfirmHandle(fieldsValue); 
            }
        });
    }



    render(){
        const { getFieldDecorator } = this.props.form;
        const  record  = this.props.record.record;
        return (
            <Form onSubmit= {this.handleSubmit.bind(this)}>
                <FormItem label="user id" {...formItemLayout} style={{display:'none'}}>
                    {getFieldDecorator('_id', { 
                        initialValue : record ? record._id : ""
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="user name" {...formItemLayout}>
                    {getFieldDecorator('name', { 
                        rules: [{ 
                            required: true, message: 'input user name!'
                        }],
                        initialValue : record ? record.name : ""
                    })(
                        <Input placeholder="input user name"/>
                    )}
                </FormItem>
                <FormItem label="user role"  {...formItemLayout}>
                    {getFieldDecorator('usertype', { 
                        rules: [{ 
                            required: true, message: 'typeName!' 
                        }],
                        initialValue : record ? record.typeName :""
                    })(
                        <Select defaultValue={record.typeName} style={{ width: 220 }} >
                            <Option key='1' value='1'>user</Option>
                            <Option key='0' value='0'>admin</Option>
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

export default UserUpdate = Form.create()(UserUpdate);