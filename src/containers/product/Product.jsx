import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Select, Input, Table } from 'antd';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';


export default function Product() {
  const { Option } = Select;
  const navigate = useNavigate()

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  const dataSource = [
    {
      key: '1',
      name: '西门子BCD-502W',
      desc: '西门子(SIEMENS) 502升变频风冷无霜冰箱双开对开门家用冰箱 超薄大容量 白色 以旧换新BCD-502W(KA50NE20TI)',
      price: 6399,
      status: '在售'
    },
    {
      key: '2',
      name: '戴森V15 detect total clean',
      desc: '戴森 DYSON V15 detect total clean手持无线吸尘器 除螨宠物家庭适用',
      price: 5490,
      status: '在售'
    },
    {
      key: '3',
      name: 'ThinkPadThinkPad X1',
      desc: 'ThinkPad X1 Nano 联想2021款 英特尔Evo平台 13英寸轻薄商务办公笔记本电脑 11代i5-1130G7 16G 512G 轻至907g重 2K高色域屏 Wifi6高速网卡',
      price: 7999,
      status: '在售'
    },
    {
      key: '4',
      name: '飞利浦（PHILIPS ）剃须刀',
      desc: '【官方旗舰】飞利浦（PHILIPS）电动剃须刀全新7系蜂巢系列肌能感应智能刮胡刀 S7735/55',
      price: 1590,
      status: '在售'
    },
    {
      key: '5',
      name: '益步（ELBOO）A9',
      desc: '德国（ELBOO）益步跑步机家用静音折叠运动器材健身房专用 A8标准版 54CM商用级跑带 16档电动坡度',
      price: 4799,
      status: '在售'
    },
  ];

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
      render: price => '￥' + price
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '10%',
      render: status => {
        return (
          <>
            <Button type='primary'>下架</Button><br />
            <span>{status}</span>
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      width: '10%',
      render: () => {
        return (
          <>
            <Button type='link' onClick={()=>{navigate('/admin/product-about/product/detail/0719')}}>详情</Button><br />
            <Button type='link' onClick={()=>{navigate('/admin/product-about/product/add_update/0719')}}>修改</Button>
          </>
        )
      }
    }
  ];
  return (
    <Card
      title={
        <>
          <Select defaultValue="name" style={{ width: 180, textAlign: 'center' }} onChange={handleChange}>
            <Option value="name">Search by name</Option>
            <Option value="desc">Search by description</Option>
          </Select>
          <Input
            style={{ width: '15%', margin: '0 10px' }}
            placeholder="Please input the search keyword"
            allowClear
          />
          <Button type='primary'>
            <SearchOutlined />Search
          </Button>
        </>
      }
      extra={
        <Button type='primary' onClick={()=>{navigate('/admin/product-about/product/add_update')}}>
          <PlusSquareOutlined />Add
        </Button>
      }
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
      />
    </Card>
  )
}
