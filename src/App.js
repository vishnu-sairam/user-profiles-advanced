import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Modal, Form, Input, Button, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import UserCard from './components/UserCard';
import axios from 'axios';
import 'antd/dist/reset.css';
import './App.css';

const { Item } = Form;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    message.success('User deleted successfully');
  };

  const handleLike = (userId, isLiked) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            isLiked
          } 
        : user
    ));
  };

  const handleUpdateUser = () => {
    form.validateFields()
      .then(values => {
        const updatedUsers = users.map(user =>
          user.id === editingUser.id ? { ...user, ...values } : user
        );
        setUsers(updatedUsers);
        setIsModalVisible(false);
        message.success('User updated successfully');
      })
      .catch(error => {
        console.error('Validation failed:', error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>User Profiles</h1>
      </header>
      
      <div className="user-grid">
        <Row gutter={[16, 16]}>
          {users.map(user => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <UserCard 
                user={user} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                onLike={handleLike}
              />
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleUpdateUser}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateUser}>
            Update
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingUser || {}}
        >
          <Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Item>
          <Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input />
          </Item>
          <Item
            name="website"
            label="Website"
            rules={[{ required: true, message: 'Please input the website!' }]}
          >
            <Input />
          </Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
