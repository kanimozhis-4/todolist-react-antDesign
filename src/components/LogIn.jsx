import React, { useContext, useState } from 'react'
import { Form, Input, Button ,Card,Spin,Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UsersContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LogIn = () => {
  const {logInUser}=useContext(UsersContext);
  const navigate = useNavigate(); 
  const [loginData,setLoginData]=useState({
    email:"",
    password_code:""
  })   
  const status = useSelector((state) => state.user.status);
  const handleFinish = async (loginData) => {
    const action=await logInUser(loginData)
    if(action?.meta?.requestStatus=='fulfilled'){  
      navigate('/homepage');
       
    }
  }; 
  const isLoading = status === 'loading';
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
       <Spin spinning={isLoading} size="large" className="absolute inset-0 flex justify-center items-center">
      <Card className="w-96 p-6 shadow-lg">
        <Form
          name="Login"
          className="Login-form"
          initialValues={{ remember: true }}
          onFinish={handleFinish}
        >
          <h2 className="text-center font-bold mb-4 text-2xl">Log In</h2>
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'The input is not a valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
              value={loginData?.email}
              onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
            />
          </Form.Item>

          <Form.Item
            name="password_code"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password"
              value={loginData?.password_code}
              onChange={(e) => setLoginData(prev => ({ ...prev, password_code: e.target.value }))}
            />
          </Form.Item>
          {status === 'failed' && (
              <Alert message={"Invalid data"} type="error" showIcon className="mb-4" />
          )}
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="signin-button w-full">
              Log In
            </Button>
          </Form.Item>
        </Form> 
       
          <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <Button type="link" onClick={()=>navigate('/signin')} className="text-blue-500">
            Create New Account
          </Button>
        </div>
      </Card> 
      </Spin>
    </div>
  );
}

export default LogIn