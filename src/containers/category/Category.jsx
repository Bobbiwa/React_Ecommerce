import React, { useState, useRef } from 'react'
import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
export default function Category() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operType, setOperType] = useState('') //为了复用modal框
  const formInstance = useRef()

  const showAdd = () => {
    setOperType('Add category')
    setIsModalVisible(true);
  };
  const showUpdate = () => {
    setOperType('Update category')
    setIsModalVisible(true);
  };

  const handleOk = () => {
    //表单同一验证
    formInstance.current.validateFields()
      .then((res) => {
        console.log(`输入项为${res}`);
        if (operType === 'Add category') console.log('发起添加分类请求~~');
        if (operType === 'Update category') console.log('发起更新分类请求~~');
        formInstance.current.resetFields()
        setIsModalVisible(false);
      }, (err) => {
        message.error('输入有误')
      })
  };

  const handleCancel = () => {
    formInstance.current.resetFields()
    setIsModalVisible(false);
  };

  //提交表单


  const dataSource = [
    {
      key: '1',
      categoryName: '玩具',
    },
    {
      key: '2',
      categoryName: '母婴用品',
    },
    {
      key: '3',
      categoryName: '化妆品',
    },
    {
      key: '4',
      categoryName: '首饰',
    },
    {
      key: '5',
      categoryName: '电子产品',
    },
  ];

  const columns = [
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (a) => { return <Button type='link' onClick={() => { showUpdate(a) }}>Update category</Button> },
      width: '25%',
      align: 'center'
    }
  ];
  return (
    <>
      <Card
        extra={<Button type='primary' onClick={showAdd}><PlusCircleOutlined />Add</Button>}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={true}
        />;
      </Card>
      <Modal title={operType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="categoryForm"
          ref={formInstance}
        >
          <Form.Item
            label='category name'
            name="categoryName"
            rules={[{ required: true, message: 'Please input your category name!' }]}
          >
            <Input placeholder="Please input your category name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
