import { Button, Form, Input, } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
const layout = {
  labelCol: {
    xs: {
        span: 0,
        offset: 0,
        
      },
      sm: {
        span: 8,
      },
  },
  wrapperCol: {
    xs: {
        span: 0,
      },
      sm: {
        span: 8,
      },
  },
};
const validateMessages = {
    required: '${label} is required!',
  };
function AddCustomer() {
    const [contactName,setContactName] = useState('')
    const [contactTitle,setContactTitle] = useState('');
    const [companyName,setCompanyName] = useState('');
   const AddNewCustomer=()=>{
       let newCustomer = {
           companyName:companyName,
           contactTitle:contactTitle,
           contactName:contactName
       }
       axios.post('https://northwind.vercel.app/api/customers',newCustomer)
       .then(res=>{
           console.log(res.data);  
          window.location.href = "/customer"; 
       });
       
   }
  return (
    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
      <Form.Item
        name={[ 'contactName']}
        label="Kişi Adı"
        rules={[
          {
            required: true,
          },
        ]}
        
      >
        <Input type ='text' value={contactName} placeholder='Please enter the contact name' onChange={(e)=>{setContactName(e.target.value)}}/>
      </Form.Item>
      <Form.Item
        name={['contactTitle']}
        label="Kişi Ünvanı"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type ='text' value={contactTitle} placeholder='Please enter the contact title' onChange={(e)=>{setContactTitle(e.target.value)}}/>
      </Form.Item>
      
      <Form.Item
        name={[ 'companyName']}
        label="Şirket ismi"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type ='text' value={companyName} placeholder='Please enter the company name' onChange={(e)=>{setCompanyName(e.target.value)}}/>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={()=>AddNewCustomer()}>
          EKLE
        </Button>
      </Form.Item>
    </Form>
  );
  
};

export default AddCustomer