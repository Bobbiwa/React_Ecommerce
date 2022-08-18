import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { Card, Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqUserList, reqCategoryList } from '../../api'
import { pageSize } from '../../config'

const { Option } = Select;
export default function User() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userList, setUserList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const formInstance = useRef()
  const categoryInfo = useSelector(state => state.categoryInfo)

  useEffect(() => {
    //get user list
    const getUserList = async () => {
      const result = await reqUserList()
      const { users } = result.data
      const newList = users.map((item) => {
        return {
          key: item.id,
          name: item.firstName,
          email: item.email,
          number: item.phone,
          time: "2022-8-11 00:00:01",
          role: item.company.department
        }
      })
      setUserList(newList)
    }
    getUserList()

    //get category list
    if (categoryInfo.length) {
      setCategoryList(categoryInfo)
    } else {
      const getCategory = async () => {
        const result = await reqCategoryList()
        setCategoryList(result.data)
      }
      getCategory()
    }

  }, []) //eslint-disable-line


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    formInstance.current.validateFields()
      .then((res) => {
        //由于没有添加用户API，所以并未更新数据库
        const final = {
          key: nanoid(),
          name: res.userName,
          email: res.email,
          number: res.number,
          role: res.role,
          time: "2022-8-11 00:00:01"
        }
        setUserList([final, ...userList])
      }, () => {
        message.err('Please enter the correct format')
      })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dataSource = userList

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
      key: 'email',
      align: 'center'
    },
    {
      title: 'Telephone number',
      dataIndex: 'number',
      key: 'number',
      align: 'center'
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
        <Button type='primary' onClick={showModal}>
          <PlusOutlined />Add user
        </Button>
      }
      >
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{ defaultPageSize: pageSize, showQuickJumper: true }}
        />
      </Card>
      <Modal title="Add user"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          name="categoryForm"
          initialValues={{ remember: true }}
          ref={formInstance}
          labelCol={{ md: 6 }}
          wrapperCol={{ md: 15 }}
        >
          <Form.Item
            label='User name'
            name="userName"
            rules={[{ required: true, message: 'Please input your user name!' }]}
          >
            <Input placeholder="Please input your user name" />
          </Form.Item>
          <Form.Item
            label='Password'
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder="Please input your password" />
          </Form.Item>
          <Form.Item
            label='Phone number'
            name="number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder="Please input your phone number" />
          </Form.Item>
          <Form.Item
            label='Email'
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Please input your email" />
          </Form.Item>
          <Form.Item
            label='Role'
            name="role"
            rules={[{ required: true, message: 'Please input your role!' }]}
            initialValue="请选择分类"
          >
            <Select>
              {categoryList.map((item, index) => (<Option key={index} value={item}>{item}</Option>))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}



