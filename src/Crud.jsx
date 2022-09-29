import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import produce from "immer";
import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';


export default function Crud({ columns, operationColumns, apiOperations, pageSize }, ref) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [operType, setOperType] = useState('') //为了复用modal框
    const [categoryList, setCategoryList] = useState([])
    const [modalCurrentValue, setModalCurrentValue] = useState({})
    const formInstance = useRef()

    const { getList, add, update } = apiOperations

    const defaultOperationColumns = [
        {
            title: 'button',
            key: 'button',
            render: (e) => (<Button type='link' onClick={() => { handleShowUpdate(e) }}>button</Button>),
            width: '25%',
            align: 'center'
        }
    ]

    useEffect(() => {
        getList()
            .then((res) => {
                setCategoryList(res)
            })
    }, [getList])

    const handleShowAdd = () => {
        setModalCurrentValue({})
        setOperType('Add category')
        setIsModalVisible(true);
    };
    const handleShowUpdate = (e) => {
        const { key, name } = e
        setModalCurrentValue({ key, name })
        setOperType('Update category')
        setIsModalVisible(true);
    };
    //向父组件暴露handleShowUpdate
    useImperativeHandle(ref, () => ({ handleShowUpdate }))


    const handleOk = () => {
        //表单统一验证
        formInstance.current.validateFields()
            .then((res) => {
                const { name } = res
                if (operType === 'Add category') {
                    //由于没有添加分类API，所以并未更新数据库
                    const newCategoryList = add(name)
                    setCategoryList([...newCategoryList, ...categoryList])
                    message.success('Added successfully!', 1)
                }
                if (operType === 'Update category') {
                    //immer: 让React更新做深度比较
                    setCategoryList(produce((categoryList) => { update(categoryList, modalCurrentValue, name) }))
                }
                formInstance.current.resetFields()
                setIsModalVisible(false);
            }, () => {
                message.error('输入有误')
            })
    };
    const handleCancel = () => {
        formInstance.current.resetFields()
        setIsModalVisible(false);
    };

    const dataSource = categoryList
    return (
        <>
            <Card
                // 若有添加操作，则渲染Add按钮
                extra={add ? <Button type='primary' onClick={handleShowAdd}><PlusCircleOutlined />Add</Button> : ""}
            >
                <Table
                    dataSource={dataSource}
                    columns={[...columns, ...operationColumns || defaultOperationColumns]}
                    bordered={true}
                    pagination={{ defaultPageSize: pageSize, showQuickJumper: true }}
                />;
            </Card>
            <Modal destroyOnClose title={operType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form ref={formInstance}>
                    {/* 修改过 */}
                    {columns.map(({ title, dataIndex }) => {
                        return (
                            <Form.Item
                                label={title}
                                name={dataIndex}
                                rules={[{ required: true, message: `Please input ${dataIndex}!` }]}
                                initialValue={modalCurrentValue.name}
                            >
                                <Input placeholder={`Please input ${dataIndex}`} />
                            </Form.Item>
                        )
                    }, [])}
                </Form>
            </Modal>
        </>
    )
}
