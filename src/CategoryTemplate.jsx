import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Table from './CURD-component/Table'
import Button from './CURD-component/Button'
import Modal from './CURD-component/Modal'
import myAxios from './api/myAxios'

export default function CategoryTemplate({url}) {
    const [visibleModal, setVisibleModal] = useState(false)
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const getCategoryList = async () => {
            const { data } = await myAxios.get(url)
            let finalData = data.map((item, index) => {
                return { key: index, "categoryName": item }
            })
            setCategoryList(finalData)
        }
        getCategoryList()
    }, [])

    const showModal = (e) => {
        e.stopPropagation()
        setVisibleModal(true)
    }

    const handleOk = (value) => {
        //1.判断operationType
        //2.若OperationType为添加分类
        const newCategoryList = [{ "key": nanoid(), categoryName:value }]
        setCategoryList([...newCategoryList, ...categoryList])
        //3.若OperationType为修改分类
        setVisibleModal(false)
    }
    const handleCloseModal = () => {
        console.log('触发了关闭');
        setVisibleModal(false)
    }


    const dataSource = categoryList
    return (
        <>
            <header style={{ textAlign: 'right', width: "80%" }}>
                <div style={{ padding: '20px' }}>
                    <Button type='primary' onClick={showModal} >showModal</Button>
                    <Modal title="Category Name" visible={visibleModal} onOk={handleOk} onClose={handleCloseModal} />
                </div>
            </header>
            <ul>
                <Table dataSource={dataSource} />
            </ul>
        </>
    )
}
