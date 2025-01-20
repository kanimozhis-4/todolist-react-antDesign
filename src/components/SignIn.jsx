import React, { useContext, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { UsersContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [form] = Form.useForm();
    const {signInUser}=useContext(UsersContext); 
    const navigate = useNavigate(); 
    const [signinData,setSigninData]=useState({
      first_name:"",
      last_name:"",
      email:"",
      password_code:""
      
    })
    const handleFinish=async()=>{  
      console.log("signinData",signinData) 
      const action=await signInUser(signinData)
      if(action?.meta?.requestStatus=='fulfilled'){  
        navigate('/');
         
      }
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center font-bold mb-6 text-2xl">Sign In</h2>
        <Form
          form={form}
          name="sign_in"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input 
            placeholder="First Name" 
            value={signinData.first_name}
            onChange={(e)=>setSigninData({...signinData,first_name:e.target.value})}/>
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your Last Name!' }]}
          >
            <Input placeholder="Last Name"
            value={signinData.last_name}
            onChange={(e)=>setSigninData({...signinData,last_name:e.target.value})}/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input 
            placeholder="Email"
            value={signinData.email}
            onChange={(e)=>setSigninData({...signinData,email:e.target.value})}
             />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password_code"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password 
            placeholder="Password"
            value={signinData.password_code}
            onChange={(e)=>setSigninData({...signinData,password_code:e.target.value})}
             />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn