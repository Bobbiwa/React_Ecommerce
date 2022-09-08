import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductListAsync, searchProductAsync } from '../../redux/slice/productSlice'
import { Card, Button, Select, Input, Table, Popconfirm } from 'antd';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { pageSize } from '../../config'
import { formatProductData } from '../../components/formatProductData'



export default function Product() {
  const { Option } = Select;
  const navigate = useNavigate()
  const [productList, setProductList] = useState([])
  const [keywords, setKeywords] = useState('')
  const dispatch = useDispatch()

  const getProductList = async () => {
    if (keywords.length) {
      dispatch(searchProductAsync({q: keywords}))
    } else {
      dispatch(getProductListAsync())
    }
  }

  useEffect(() => {
    getProductList()
  }, []) // eslint-disable-line 

  const { list } = useSelector((store) => store.productInfo)
  const finalList = formatProductData(list)


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

  const dataSource = finalList

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

