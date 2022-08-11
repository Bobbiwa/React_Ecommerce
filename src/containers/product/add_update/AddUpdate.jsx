import React from 'react'
import { Card, Button, Form, Input, Select } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import PictureWall from './picture_wall/PictureWall';
import RichTextEditor from './rich_text_editor/RichTextEditor';

const { Option } = Select;
export default function AddUpdate() {
  const navigate = useNavigate()
  // (预留)const params = useParams()

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex' }}>
          <Button type='link' size='small' onClick={() => { navigate(-1) }}>
            <LeftCircleOutlined style={{ fontSize: '30px' }} />
          </Button>
          <div style={{ fontSize: '20px' }}>商品添加</div>
        </div>
      }
    >
      <Form
        name="basic"
        wrapperCol={{ md: 7 }}
        labelCol={{ md: 1.2 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="商品名称"
          name="name"
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
          name="desc"
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
          <Input placeholder='product price' prefix="￥" addonAfter="RMB" type='number' />
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
          initialValue='default'
        >
          <Select
            onChange={handleChange}
          >
            <Option value="default">请选择分类</Option>
            <Option value="3c">电子产品</Option>
            <Option value="baby">母婴用品</Option>
            <Option value="clothes">服装衣帽</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="商品图片"
          name="picture"
          rules={[
            {
              required: true,
              message: 'Please Please add the pictures!',
            },
          ]}
        >
          <PictureWall />
        </Form.Item>
        <Form.Item
          label="商品详情"
          wrapperCol={{md:16}}
        >
          <RichTextEditor />
        </Form.Item>

      </Form>

    </Card>
  )

}
