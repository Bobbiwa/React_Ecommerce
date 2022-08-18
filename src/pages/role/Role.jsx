import React, { useState, useRef } from 'react'
import { Card, Button, Table, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function Role() {
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
      name: '商品管理员',
      creatTime: '2022-8-11 00:00:01',
      authTime: '2022-8-11 00:00:01',
      authorizer: 'admin'
    },
    {
      key: '2',
      name: '角色管理员',
      creatTime: '2022-8-11 00:00:01',
      authTime: '2022-8-11 00:00:01',
      authorizer: 'admin'
    },
    {
      key: '3',
      name: '库存管理员',
      creatTime: '2022-8-11 00:00:01',
      authTime: '2022-8-11 00:00:01',
      authorizer: 'admin'
    },
    {
      key: '4',
      name: '测试1',
      creatTime: '2022-8-11 00:00:01',
      authTime: '2022-8-11 00:00:01',
      authorizer: 'admin'
    },
    {
      key: '5',
      name: '测试2',
      creatTime: '2022-8-11 00:00:01',
      authTime: '2022-8-11 00:00:01',
      authorizer: 'admin'
    },
  ];

  const columns = [
    {
      title: 'Role name',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    },
    {
      title: 'Creation time',
      dataIndex: 'creatTime',
      key: 'creatTime'
    },
    {
      title: 'Authorization time',
      dataIndex: 'authTime',
      key: 'authTime'
    },
    {
      title: 'Authorizer',
      dataIndex: 'authorizer',
      key: 'authorizer',
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
        return <Button type='link'>set authorization</Button>
      }
    },
  ];
  return (
    <>
      <Card title={
        <Button type='primary' onClick={showModal}><PlusOutlined />Add role</Button>
      }
      >
        <Table bordered dataSource={dataSource} columns={columns} />
      </Card>
      <Modal title="Add role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="categoryForm"
          initialValues={{ remember: true }}
          ref={formInstance}
        >
          <Form.Item
            label='Role name'
            name="roleName"
            rules={[{ required: true, message: 'Please input the role name!' }]}
          >
            <Input placeholder="Please input the role name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
