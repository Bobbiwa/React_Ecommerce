import React from 'react'
import { Card, Button, List } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import './detail.less'
export default function Detail() {
    // (预留) const params = useParams()
    const navigate = useNavigate()
    return (
        <>
            <Card
                title={
                    <div className='left-top'>
                        <Button type='link' size='small' onClick={()=>{navigate(-1)}}>
                            <LeftCircleOutlined style={{ fontSize: '30px' }} />
                        </Button>
                        <div className='title'>商品详情</div>
                    </div>
                }
            >
                <List>
                    <List.Item className='item'>
                        <span className='prod_name'>商品名称：</span>
                        <span>ThinkPadX1 Nano</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>商品描述：</span>
                        <span>联想笔记本电脑ThinkPad X1 Nano 英特尔Evo平台 13英寸 11代酷睿i5 16G 512G 16:10微边框2K A面编织纹理</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>商品价格：</span>
                        <span>7999</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>所属分类：</span>
                        <span>手机/电脑</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>商品图片：</span>
                        <span>预留</span>
                    </List.Item>
                    <List.Item className='item'>
                        <span className='prod_name'>商品详情：</span>
                        <ul>
                            <li>商品名称：ThinkPadX1</li>
                            <li>Nano商品编号：100027210414</li>
                            <li>商品毛重：2.01kg</li>
                            <li>商品产地：中国大陆</li>
                            <li>内存容量：16GB</li>
                            <li>系列：ThinkPad - X1系列</li>
                            <li>机械硬盘：无机械硬盘</li>
                            <li>支持IPv6：支持IPv6</li>
                            <li>显卡芯片供应商：Intel</li>
                            <li>系统：Windows 10 带Office</li>
                            <li>屏幕尺寸：13.0-13.9英寸</li>
                            <li>厚度：15.0mm及以下</li>
                            <li>屏幕刷新率：144hz</li>
                            <li>其他处理器：intel i5</li>
                        </ul>
                    </List.Item>
                </List >
            </Card>
        </>
    )
}
