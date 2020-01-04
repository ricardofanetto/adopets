/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Form, Icon, Input, Button, Card, Spin, message, Layout } from 'antd';

import api from '../../services/api';
import { login } from '../../store/ducks/users/actions';

import { IUser } from '../../interfaces/IUser';
import { ISessionRequest } from '../../interfaces/ISessionRequest';
import { IApplicationState } from '../../interfaces/IApplicationState';
import { IUserState } from '../../store/ducks/users/types';

import './styles.css';

const Login: React.FC = (props: any) => {

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user: IUserState = useSelector((state: IApplicationState) => state.user)

  useEffect(() => {
    _getInitialToken();
  }, []);


  useEffect(() => {
    if (user.isLogged || !!user.token) {
      history.push("/search");
    }
  }, [user]);

  async function _getInitialToken() {
    const sender: ISessionRequest = { system_api_key: '505763d6-4202-4b05-9efc-93b366939bcf' };
    const { status, data } = await api.post('auth/session-request', sender);
    if (status === 200) {
      api.defaults.headers.common['Authorization'] = `Bearer ${data.data.access_key}`;
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const result = (await dispatch(login((form as IUser))) as any);
    if (result.data.status !== 200) {
      message.warning(result.data.message);
    }
    setLoading(false);
  }

  const { getFieldDecorator } = props.form;

  return (
    <Layout className="container-login">
      <Card className="card-container">
        <Spin spinning={loading}>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              <img src={require('../../assets/logo.png')} alt="logo" />
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  onChange={input => setForm({ ...form, email: input.target.value })}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  onChange={input => setForm({ ...form, password: input.target.value })}
                />,
              )}
            </Form.Item>
            <Button type="danger" htmlType="submit"> Log in </Button>
          </Form>
        </Spin>
      </Card>
    </Layout>

  )
}
const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

export default WrappedLogin;