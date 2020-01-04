/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Layout, Card, Descriptions, Table, Form,
  Select, Button, Input, Icon, Spin, message
} from 'antd';

import { IApplicationState } from '../../interfaces/IApplicationState';
import { IUserState, ITypes } from '../../store/ducks/users/types';

import './styles.css';
import api from '../../services/api';


const Search: React.FC = (props: any) => {

  const { Option } = Select;

  const { isLogged, user }: IUserState = useSelector((state: IApplicationState) => state.user);
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({} as any);
  const [loading, setLoading] = useState(false);
  const dispath = useDispatch();
  const history = useHistory();

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age_key', key: 'age_key' },
    { title: 'Sex', dataIndex: 'sex_key', key: 'sex_key' },
    { title: 'Size', dataIndex: 'size_key', key: 'size_key' }
  ];

  useEffect(() => {
    populateData();
  }, [])

  useEffect(() => {
    if (!isLogged) {
      history.push('/');
    }
  }, [isLogged]);

  function sanatizeFilters() {
    Object.keys(filters).forEach(key => {
      if (!filters[key])
        delete filters[key]
    });
    return filters;
  }

  async function populateData() {
    try {
      setLoading(true);
      const _filters = sanatizeFilters();
      const _sort: string = _filters.sort || 'name';
      delete _filters.sort;
      const { data } = await api.post('pet/search', {
        search: { ..._filters },
        options: { sort: [_sort] }
      });
      setPets(data.data.result);
    } catch ({ message }) {
      message.error(message);
    } finally {
      setLoading(false);
    }
  }

  function onChange(prop: string, value: any) {
    setFilters({ ...filters, [prop]: value });
  }

  async function logoutHandle() {
    await dispath({ type: ITypes.LOGOUT });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    populateData();
  }

  return (

    <Layout className="container">
      <div className="logo">
        <img src={require('../../assets/logo.png')} alt="logo" />
      </div>
      <Card className="card-container">
        <Descriptions title="User Logged">
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="First Name">{user.first_name}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{user.last_name}</Descriptions.Item>
          <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        </Descriptions>
        <Button type="danger" onClick={logoutHandle}>Logout</Button>
      </Card>
      <Card className="card-container">
        <Form layout="inline" onSubmit={handleSubmit} className="login-form">
          <Form.Item label="Name">
            <Input
              placeholder="Type name for search..."
              onChange={e => onChange('name', e.target.value)}
              suffix={<Icon type="search" />}></Input>
          </Form.Item>
          <Form.Item label="Sex">
            <Select
              style={{ width: 200 }}
              placeholder="Sex"
              optionFilterProp="children"
              onChange={value => onChange('sex_key', value)}>
              <Option value="MALE">MALE</Option>
              <Option value="FEMALE">FEMALE</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Size">
            <Select
              style={{ width: 200 }}
              placeholder="Size"
              optionFilterProp="children"
              onChange={value => onChange('size_key', value)}>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Sort">
            <Select
              style={{ width: 200 }}
              placeholder="Sorting"
              optionFilterProp="children"
              onChange={value => onChange('sort', value)}>
              <Option value="name">Name</Option>
              <Option value="size_key">Size</Option>
              <Option value="sex_key">Sex</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="danger" htmlType="submit">
              <Icon type="search" />
              Search
            </Button>
          </Form.Item>
        </Form>

      </Card>
      <Card className="card-container">
        <Spin spinning={loading}>
          <Table dataSource={pets} columns={columns} />
        </Spin>
      </Card>
    </Layout>
  );
}

export default Search;
