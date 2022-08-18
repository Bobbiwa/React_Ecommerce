import React, { useState, useRef, useEffect } from 'react'
import produce from "immer";
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { reqCategoryList } from '../../api/index'
import { pageSize } from '../../config'
import { saveCategoryListAction } from '../../redux/actions/category'

export default function Category() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operType, setOperType] = useState('') //为了复用modal框
  const [categoryList, setCategoryList] = useState([])
  const [isLoading, setIsloading] = useState(true) //Loading of table
  const [modalCurrentValue, setModalCurrentValue] = useState({})
  const formInstance = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const getCategoryList = async () => {
      let result = await reqCategoryList()
      let { data } = result
      dispatch(saveCategoryListAction(data))  //save redux
      let finalData = data.map((item, index) => {
        return { key: index, "categoryName": item }
      })
      setCategoryList(finalData)
      setIsloading(false)
    }
    getCategoryList()
  }, [])  //eslint-disable-line

  const handleShowAdd = () => {
    setModalCurrentValue({})
    setOperType('Add category')
    setIsModalVisible(true);
  };
  const handleShowUpdate = (e) => {
    const { key, categoryName } = e
    setModalCurrentValue({ key, categoryName })
    setOperType('Update category')
    setIsModalVisible(true);
  };

  const handleOk = (value) => {
    //表单统一验证
    formInstance.current.validateFields()
      .then((res) => {
        const { categoryName } = res
        if (operType === 'Add category') {
          //由于没有添加分类API，所以并未更新数据库
          const newCategoryList = [{ "key": nanoid(), categoryName }]
          setCategoryList([...newCategoryList, ...categoryList])
          message.success('Added successfully!', 1)
        }
        if (operType === 'Update category') {
          //immer: 让React更新做深度比较
          setCategoryList(produce((categoryList) => {
            categoryList.map((item) => {
              if (item.key === modalCurrentValue.key) {
                item.categoryName = categoryName
                return item
              } else {
                return item
              }
            })
          }))
        }
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


  const dataSource = categoryList

  const columns = [
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (e) => (<Button type='link' onClick={() => { handleShowUpdate(e) }}>Update category</Button>),
      width: '25%',
      align: 'center'
    }
  ];
  return (
    <>
      <Card
        extra={<Button type='primary' onClick={handleShowAdd}><PlusCircleOutlined />Add</Button>}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={true}
          pagination={{ defaultPageSize: pageSize, showQuickJumper: true }}
          loading={isLoading}
        />;
      </Card>
      <Modal destroyOnClose title={operType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="categoryForm"
          ref={formInstance}
        >
          <Form.Item
            label='category name'
            name="categoryName"
            rules={[{ required: true, message: 'Please input your category name!' }]}
            initialValue={modalCurrentValue.categoryName}
          >
            <Input placeholder="Please input your category name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}



