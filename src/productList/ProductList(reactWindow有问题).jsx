import React, { useState, useEffect, useTransition } from 'react'
import { Card, Input, Spin, Alert, AutoComplete } from 'antd'
import { reqProductList, reqSearchProduct } from '../api'
import './produc-list.less'
import { FixedSizeGrid as Grid } from 'react-window';



const { Meta } = Card;
const { Search } = Input;

let cutArr = [] //用来存放切割后的数组
let cutArrKey = 1

export default function ProductList() {
    const [productList, setProductList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [option, setOption] = useState([])
    const [open, setOpen] = useState(false)
    const [isPending, starTransition] = useTransition()


    useEffect(() => {
        const getProductList = async () => {
            const result = await reqProductList()
            const { products } = result.data
            handleCutArr(products)
        }

        //如果是first 才调用getProduct
        //（由于Effect依赖了productList，若不加此判断，getProductList()方法将会不停调用,以至于productList数据重复紊乱）
        if (productList.length === 0) {
            getProductList()
        }

        //监听滚动
        const handleScroll = () => {
            const { innerHeight } = window    //显示屏height
            let { scrollTop } = document.documentElement  //滚动出去的height
            const { scrollHeight } = document.documentElement //文档高度

            if (cutArrKey >= cutArr.length - 1) {
                setIsLoading(false)
                return;
            }
            //若触底了，向productList添加商品数据
            if (innerHeight + scrollTop >= scrollHeight) {
                setTimeout(() => {
                    cutArrKey++
                    let newArr = [...productList, ...cutArr[cutArrKey]]
                    setProductList(newArr)
                }, 1000)

            }
        }
        window.addEventListener('scroll', handleScroll)
        //移除监听滚动
        return () => { window.removeEventListener('scroll', handleScroll) }
    }, [productList, open])

    //处理切割数组
    const handleCutArr = (data) => {
        if (data.length > 8) {
            //大于8项切割数组
            for (let i = 0; i < Math.ceil(data.length / 8); i++) {
                cutArr.push(data.slice(8 * i, 8 * (i + 1)))
            }

            setProductList([...cutArr[cutArrKey - 1], ...cutArr[cutArrKey]])
        } else {
            //小于8项不拆分
            setProductList(data)
            //loading(到底了)
            setIsLoading(false)
        }
    }

    //点击搜索
    const handleSearch = async (value) => {
        const result = await reqSearchProduct({ q: value })
        const { products } = result.data
        handleCutArr(products)
    }

    //当搜索框内容改变 -----> 搜索联想
    const handleSearchChange = async (e) => {
        const { value } = e.target
        if (value !== '') {
            const result = await reqSearchProduct({ q: value })
            const { products } = result.data
            const newProducts = products.map((item) => {
                return { value: item.title }
            })
            setOpen(true)
            starTransition(() => {
                setOption(newProducts)
            })
        } else {
            setOpen(false)
        }
    }

    //当点击关联词 ------> 展示商品
    const handleSelect = async (value) => {
        const result = await reqProductList()
        const { products } = result.data
        //由于没有根据商品名搜索的API
        const product = products.find((item) => {
            return item.title = value
        })
        handleCutArr([product])
    }
    const options = option //关联词联想options

    const Cell = ({ columnIndex, rowIndex, style }) => (
        <div style={style}>
            {productList.map((item) => {
                return (
                    <li key={item.id} className='product-list-item'>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={<img alt="example" style={{ width: "240px", height: "240px" }} src={item.images[0]} />}
                        >
                            <Meta title={item.title} description="www.instagram.com" />
                        </Card>
                    </li>
                )
            })}
        </div>
    );

    return (
        <>
            <AutoComplete
                open={open}
                onBlur={() => { setOpen(false) }} //失去焦点 ----> 隐藏下拉框
                onFocus={handleSearchChange} //聚焦 ----> 继续搜索联想
                style={{ width: '30%', display: 'block', margin: '0 auto' }}
                options={isPending ? [{ value: 'loading...' }] : options}
                onSelect={handleSelect}
            >
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                    onChange={handleSearchChange}
                />
            </AutoComplete >

            <Grid
                height={700}
                width={1200}
                columnCount={4}
                columnWidth={200}
                rowCount={8}
                rowHeight={300}
                itemCount={10}
            >
                {Cell}
            </Grid>

            <ul className='product-list-container'>
                {productList.map((item) => {
                    return (
                        <li key={item.id} className='product-list-item'>
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img alt="example" style={{ width: "240px", height: "240px" }} src={item.images[0]} />}
                            >
                                <Meta title={item.title} description="www.instagram.com" />
                            </Card>
                        </li>
                    )
                })}
            </ul>
            <Spin spinning={isLoading} size='large' tip="Loading...">
                <Alert
                    message="已经到底啦~"
                    description="There's nothing to show you..."
                    type="info"
                    style={{ display: isLoading ? "none" : "block", textAlign: "center" }}
                />
            </Spin>
        </>
    )
}
