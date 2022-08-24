import React from 'react'
import Table from './CURD-component/Table'
import ModalButton from './CURD-component/ModalButton'

export default function Demo() {
    const dataSource = [
        {
            key: '1',
            categoryName:'smart',
            operation:'操作'
        },
        {
            key: '2',
            categoryName:'foods',
            operation:'操作'
        }
    ]
    return (
        <>
            <ul>
                <Table dataSource={dataSource} />
                <li>11111</li>
                <li>11111</li>
                <button style={{borderStyle:"none",backgroundColor:"transparent",color:"blue"}}>2222</button>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
            </ul>
            <ModalButton/>
        </>
    )
}
