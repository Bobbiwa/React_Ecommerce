import React, { Fragment, useState, useEffect } from 'react'
// 产品名称列表
const nameList = ['apple', 'peer', 'banana', 'lemon']

export default function Demo(props) {


    // 产品名称、价格
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('apple')

    // 假设有一个业务函数  获取产品的名字
    function getProductName() {
        console.log('getProductName触发')
        return name
    }

    useEffect(()=>{
        getProductName()
    },[name])

    // 只对price响应
    useEffect(() => {
        console.log('price effect 触发')
    }, [price])

    return (
        <Fragment>
            <p>{name}</p>
            <p>{price}</p>
            <p>{getProductName()}</p>
            <button onClick={() => setPrice(price + 1)}>价钱+1</button>
            <button onClick={() => setName(nameList[Math.random() * nameList.length << 0])}>修改名字</button>
        </Fragment>
    )
}

