import React, { useEffect, useState, useRef, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Card, Button, Form, Input, Select, message } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom'
import PictureWall from '../../../components/PictureWall';
import RichTextEditor from '../../../components/RichTextEditor';
import { reqCategoryList, reqProductDetail } from '../../../api'


const { Option } = Select;
const MyPictureWall = forwardRef(PictureWall)
const MyRichTextEditor = forwardRef(RichTextEditor)

export default function AddUpdate() {
  const navigate = useNavigate()
  const params = useParams()
  const [categoryList, setCategoryList] = useState([])
  const [productDetal, setproductDetal] = useState({})    //eslint-disable-line
  const [handleType, setHandleType] = useState('')
  const formInstance = useRef()
  const pictureWallInstance = useRef()
  const richTextInstance = useRef()
  const categoryInfo = useSelector(state => state.categoryInfo.value)
  const productListInfo = useSelector(state => state.productInfo.list)

  useEffect(() => {
    //from redux
    if (categoryInfo.length) {
      setCategoryList(categoryInfo)
    } else {
      //from API
      const getCategoryList = async () => {
        const result = await reqCategoryList()
        setCategoryList(result.data)
      }
      getCategoryList()
    }

    //判断此组件为修改or添加
    if (params.id) {
      //这里是组件 ----- 修改
      setHandleType('商品修改')
      if (productListInfo.length) { //from redux
        let result = productListInfo.find((item) => {
          return item.id === parseInt(params.id)
        })
        setproductDetal(result)
        //用于数据回显
        formInstance.current.setFieldsValue(result)
        pictureWallInstance.current.setImgsList(result.images)
      } else {                      // from server
        const getProductDetail = async () => {
          const result = await reqProductDetail(params.id)
          setproductDetal(result.data)
          formInstance.current.setFieldsValue(result.data)
          pictureWallInstance.current.setImgsList(result.data.images)
        }
        getProductDetail()
      }

    } else {
      //这里是组件 ----- 添加 
      setHandleType('商品添加')
    }
  }, [])    //eslint-disable-line

  const onFinish = (values) => {
    //Get the params of the upload images 
    const imgNameArr = pictureWallInstance.current.getImgNameArr()
    //get the params of the rich text
    const richTextParams = richTextInstance.current.getRichText()

    formInstance.current.validateFields()
      .then((res) => {
        console.log(`拿到参数${res}${imgNameArr}${richTextParams}`)
        if (handleType === '商品添加') {
          // 发送添加商品请求
        } else {
          // 发送修改商品请求
        }

      }, () => {
        message.error('输入有误，请重新输入')
      })

  };


  return (
    <Card
      title={
        <div style={{ display: 'flex' }}>
          <Button type='link' size='small' onClick={() => { navigate(-1) }}>
            <LeftCircleOutlined style={{ fontSize: '30px' }} />
          </Button>
          <div style={{ fontSize: '20px' }}>{handleType}</div>
        </div>
      }
    >
      <Form
        name="basic"
        wrapperCol={{ md: 7 }}
        labelCol={{ md: 1.2 }}
        onFinish={onFinish}
        ref={formInstance}
      >
        <Form.Item
          label="商品名称"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input the product name!',
            },
          ]}
        >
          <Input placeholder='product name' />
        </Form.Item>
        <Form.Item
          label="商品描述"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input the product description!',
            },
          ]}
        >
          <Input placeholder='product description' />
        </Form.Item>
        <Form.Item
          label="商品价格"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input the product price!',
            },
          ]}
        >
          <Input placeholder='product price' prefix="$" addonAfter="USD" type='number' />
        </Form.Item>
        <Form.Item
          label="商品分类"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please input the product category!',
            },
          ]}
          initialValue='请选择分类'
        >
          <Select>
            {categoryList.map((item) => {
              return <Option key={item} value={item}>{item}</Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="商品图片"
          name="images"
          rules={[
            {
              required: false,
              message: 'Please Please add the pictures!',
            },
          ]}
        >
          <MyPictureWall ref={pictureWallInstance} />
        </Form.Item>
        <Form.Item
          label="商品详情"
          wrapperCol={{ md: 16 }}
        >
          <MyRichTextEditor ref={richTextInstance} />
        </Form.Item>

        <Button size='large' type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

    </Card>
  )

}


