import React, { useState, useEffect, useTransition, useMemo } from 'react'
import { Card, Input, Spin, Alert, AutoComplete } from 'antd'
import { reqProductList, reqSearchProduct } from '../api'
import { PRODUCT_PAGE_SIZE } from '../config'
import './produc-list.less'
const { Meta } = Card;
const { Search } = Input;

export default function ProductList() {
    const [productList, setProductList] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    // const [isLoading, setIsLoading] = useState(true)
    const [relatedOption, setRelatedOption] = useState([])
    const [openRelated, setOpenRelated] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [maxPage, setMaxPage] = useState(0)

    //当前展示
    const currentPageList = useMemo(() => {
        return productList.slice(0, (currentPage + 1) * PRODUCT_PAGE_SIZE) //slice截取超过arrlength不报错
    }, [productList, currentPage, PRODUCT_PAGE_SIZE])
    //当前isLoading
    // const isLoading = useMemo(() => {
    //     if (maxPage !== 0 && currentPage >= maxPage)  return false
    //     return true
    // }, [currentPage,maxPage])
    const isLoading = useMemo(() => maxPage !== 0 && currentPage < maxPage,[currentPage,maxPage])

    useEffect(() => {
        const getProductList = async () => {
            const result = await reqProductList()
            const { products } = result.data
            setMaxPage(Math.floor(products.length / PRODUCT_PAGE_SIZE))
            setProductList(products)
        }
        getProductList()

        //throttle
        function throttle(fn, ms) {
            let timer // 创建一个标记用来存放定时器
            return function () {
                // 没有定时器等待执行，则表示可以创建新的定时器来执行函数
                if (!timer) {
                    timer = setTimeout(() => {
                        // 定时器清空，表示可以执行下一次调用了
                        timer = null
                        fn.apply(this, arguments)
                    }, ms)
                }
            }
        }

        //监听滚动
        const handleScroll = () => {
            const { innerHeight } = window    //显示屏height
            let { scrollTop } = document.documentElement  //滚动出去的height
            const { scrollHeight } = document.documentElement //文档高度

            //若触底了，向productList添加商品数据
            if (innerHeight + scrollTop >= scrollHeight) {
                setTimeout(() => {
                    setCurrentPage((currentPage) => (currentPage + 1))
                }, 1000)
            }
        }
        window.addEventListener('scroll', throttle(handleScroll, 1000))
    }, [])

    //点击搜索
    const handleSearch = async (value) => {
        const result = await reqSearchProduct({ q: value })
        const { products } = result.data
        setProductList(products)
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
            setOpenRelated(true)
            startTransition(() => {
                setRelatedOption(newProducts)
            })
        } else {
            setOpenRelated(false)
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
        setProductList([product])
    }

    const options = relatedOption //关联词联想options

    return (
        <>
            <AutoComplete
                open={openRelated}
                onBlur={() => { setOpenRelated(false) }} //失去焦点 ----> 隐藏下拉框
                onFocus={handleSearchChange} //聚焦 ----> 继续搜索联想
                className='search-container'
                options={isPending ? [{ value: 'loading...' }] : options}
                onSelect={handleSelect}
            >
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    className='search'
                    onSearch={handleSearch}
                    onChange={handleSearchChange}
                />
            </AutoComplete >

            <ul className='product-list-container'>
                {currentPageList.map((item) => {
                    return (
                        <li key={item.id} className='product-list-item'>
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img alt="example" style={{ width: "240px", height: "240px" }} src={item.images[0]} />}
                            >
                                <Meta title={item.title} description={<div className='desc'>{item.description}</div>} />
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
