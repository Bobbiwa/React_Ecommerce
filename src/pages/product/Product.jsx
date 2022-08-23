import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveProductAction } from '../../redux/actions/product'
import { Card, Button, Select, Input, Table, Popconfirm } from 'antd';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { reqProductList } from '../../api'
import { reqSearchProduct } from '../../api'
import { pageSize } from '../../config'
import { reProductData } from '../../components/reProductData'


export default function Product() {
  const { Option } = Select;
  const navigate = useNavigate()
  const [productList, setProductList] = useState([])
  const [keywords, setKeywords] = useState('')

  const dispatch = useDispatch()

  const getProductList = async () => {
    let result
    if (keywords.length) {
      result = await reqSearchProduct({ q: keywords })
      const { products } = result.data
      result = reProductData(products)  // eslint-disable-line
    } else {
      result = await reqProductList()
      const { products } = result.data
      //Save to Redux for future use by <Detal/> and <AddUp../>
      dispatch(saveProductAction(products))
      //Organize data for datasource
      result = reProductData(products)  // eslint-disable-line
    }
    setProductList(result)
  }

  useEffect(() => {
    getProductList()
    //刚更改完state并非不能立刻拿到，要注意副作用的依赖项
  }, []) // eslint-disable-line 

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const search = () => {

    getProductList()
  }

  //由于没有修改商品状态API，因此并未改变数据库
  const handleProductStatus = (item) => {
    const newProductList = productList.map((cur) => {
      if (cur.key === item.key) {
        cur.status = !item.status
      }
      return cur
    })
    setProductList(newProductList)
  }

  const dataSource = productList

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: '18%',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      width: '10%',
      render: price => '$' + price
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      width: '10%',
      render: item => {
        return (
          <>
            <Popconfirm onConfirm={() => { handleProductStatus(item) }} title="Are you sure？" okText="Yes" cancelText="No">
              <Button type={item.status ? "danger" : "primary"}>{item.status ? "下架" : "上架"}</Button>
            </Popconfirm>
            <br />
            <span>{item.status ? "在售" : "已停售"}</span>
          </>
        )
      }
    },
    {
      title: '操作',
      key: 'option',
      align: 'center',
      width: '10%',
      render: (item) => {
        return (
          <>
            <Button type='link' onClick={() => { navigate(`/admin/product-about/product/detail/${item.key}`) }}>详情</Button><br />
            <Button type='link' onClick={() => { navigate(`/admin/product-about/product/add-update/${item.key}`) }}>修改</Button>
          </>
        )
      }
    }
  ];
  return (
    <Card
      title={
        <>
          <Select defaultValue="desc" style={{ width: 180, textAlign: 'center' }} onChange={handleChange}>
            <Option value="name">Search by name</Option>
            <Option value="desc">Search by description</Option>
          </Select>
          <Input
            style={{ width: '15%', margin: '0 10px' }}
            placeholder="Please input the search keyword"
            allowClear
            onChange={(e) => { setKeywords(e.target.value) }}
          />
          <Button onClick={search} type='primary'>
            <SearchOutlined />Search
          </Button>
        </>
      }
      extra={
        <Button type='primary' onClick={() => { navigate('/admin/product-about/product/add-update') }}>
          <PlusSquareOutlined />Add
        </Button>
      }
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{ defaultPageSize: pageSize, showQuickJumper: true }}
      />
    </Card>
  )
}

