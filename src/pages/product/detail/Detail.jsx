import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Button, List } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom'
import { reqProductDetail } from '../../../api'
import './detail.less'
export default function Detail() {
    const params = useParams()
    const navigate = useNavigate()
    const [productDetail, setProductDetail] = useState({})
    const productInfo = useSelector(state => state.productInfo.list)
    const { title, description, price, category, images, brand, rating } = productDetail

    useEffect(() => {
        if (productInfo.length !== 0) {
            const result = productInfo.find((item) => {
                return item.id === parseInt(params.id)
            })
            setProductDetail(result)
        } else {
            const reqDetail = async (value) => {

                const result = await reqProductDetail(value)
                setProductDetail(result.data)
            }
            reqDetail(params.id)
        }
    }, [])  //eslint-disable-line


    return (
        <>
            <Card
                title={
                    <div className='left-top'>
                        <Button type='link' size='small' onClick={() => { navigate(-1) }}>
                            <LeftCircleOutlined style={{ fontSize: '30px' }} />
                        </Button>
                        <div className='title'>商品详情</div>
                    </div>
                }
            >
                <List>
                    <List.Item className='item'>
                        <span className='prod_name'>商品名称：</span>
                        <span>{title}</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>商品描述：</span>
                        <span>{description}</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>商品价格：</span>
                        <span>{price}$</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>所属分类：</span>
                        <span>{category}</span>
                    </List.Item>
                    <List.Item className='img-container'>
                        <div className='prod_name'>商品图片：</div>
                        <div>
                            {images?.map((item) => {
                                return <img className='product-img' src={item} key={item} alt="商品图片" />
                            })}
                        </div>

                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>商品详情：</span>
                        <ul>
                            <li>商品名称：{title}</li>
                            <li>Nano商品编号：100027210414</li>
                            <li>商品毛重：2.01kg</li>
                            <li>商品产地：U.S</li>
                            <li>内存容量：16GB</li>
                            <li>系列：{brand}</li>
                            <li>机械硬盘：无机械硬盘</li>
                            <li>支持IPv6：支持IPv6</li>
                            <li>评价：{rating}</li>
                            <li>厚度：15.0mm及以下</li>
                            <li>屏幕刷新率：144hz</li>
                            <li>类别：{category}</li>
                        </ul>
                    </List.Item>
                </List >
            </Card>
        </>
    )
}


