import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserCard = ({ user, onEdit, onDelete, onLike }) => {
  const { id, name, email, phone, website, username } = user;
  // Encode the username to handle special characters and use the latest DiceBear API
  const encodedUsername = encodeURIComponent(username);
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodedUsername}&mood=happy`;

  return (
    <Card
      hoverable
      style={{ width: '100%', marginBottom: 16 }}
      cover={
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', backgroundColor: '#f5f5f5' }}>
          <img
            alt={name}
            src={avatarUrl}
            style={{ width: 150, height: 150, borderRadius: '50%' }}
          />
        </div>
      }
      actions={[
        <Button 
          type="text" 
          icon={user.isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />} 
          onClick={() => onLike(id, !user.isLiked)}
          key="like"
        >
          {user.isLiked ? 'Liked' : 'Like'}
        </Button>,
        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(user)} key="edit">Edit</Button>,
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(id)} key="delete">Delete</Button>
      ]}
    >
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ marginBottom: 16 }}>{name}</Title>
        <div style={{ textAlign: 'left', marginBottom: 12 }}>
          <MailOutlined style={{ marginRight: 8 }} />
          <Text>{email}</Text>
        </div>
        <div style={{ textAlign: 'left', marginBottom: 12 }}>
          <PhoneOutlined style={{ marginRight: 8 }} />
          <Text>{phone}</Text>
        </div>
        <div style={{ textAlign: 'left' }}>
          <GlobalOutlined style={{ marginRight: 8 }} />
          <Text>{website}</Text>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
