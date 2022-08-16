import React, { useState, useRef } from 'react'
import { Card, Button, Table, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function User() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formInstance = useRef()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dataSource = [
    {
      key: '1',
      name: '张三',
      email: '7438746@163.com',
      number: '1852355545',
      time: '2022-8-11 00:00:01',
      role:'商品管理员'
    },
    {
      key: '2',
      name: '李四',
      email: '7438746@163.com',
      number: '1852355545',
      time: '2022-8-11 00:00:01',
      role:'库存管理员'
    },
    {
      key: '3',
      name: '王五',
      email: '7438746@163.com',
      number: '1852355545',
      time: '2022-8-11 00:00:01',
      role:'角色管理员'
    },
    {
      key: '4',
      name: '赵六',
      email: '7438746@163.com',
      number: '1852355545',
      time: '2022-8-11 00:00:01',
      role:'测试2'
    },
  ];

  const columns = [
    {
      title: 'User name',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Telephone number',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Registration time',
      dataIndex: 'time',
      key: 'time',
      width: '15%',
      align: 'center'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '10%',
      align: 'center'
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
      width: '15%',
      align: 'center',
      render: () => {
        return (
          <>
            <Button type='link'>Modify</Button>
            <Button type='link'>Delete</Button>
          </>
        )
      }
    },
  ];
  return (
    <>
      <Card title={
        <Button type='primary' onClick={showModal}><PlusOutlined />Add user</Button>
      }
      >
        <Table bordered dataSource={dataSource} columns={columns} />
      </Card>
      <Modal title="Add user" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="categoryForm"
          initialValues={{ remember: true }}
          ref={formInstance}
        >
          <Form.Item
            label='User name'
            name="userName"
            rules={[{ required: true, message: 'Please input your user name!' }]}
          >
            <Input placeholder="Please input your user name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

