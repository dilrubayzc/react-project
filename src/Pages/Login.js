
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useParams } from 'react-router';

function Login() {
 const [email,setEmail] = useState('');
 const[password,setPassword]=useState('');
 const { isAuth } = useParams();


 const handleSubmit=()=>{
     if(email==='dgpays@email.com' && password==='123'){
         localStorage.setItem('email' ,email);
         localStorage.setItem('password',password)
         localStorage.setItem('isAuth',true)
         window.location.href = "customer"; 

     }
     else{
        localStorage.setItem('isAuth',false)
     }
 }
 const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
      <>
    <Form
    onSubmitCapture={handleSubmit}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 8,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        },
      ]}
    >
      <Input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Giriş Yap
      </Button>
    </Form.Item>
  </Form>
  </>
);
}

export default Login
