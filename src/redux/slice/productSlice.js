import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reqProductList, reqSearchProduct } from '../../api'

//请求商品列表异步action
export const getProductListAsync = createAsyncThunk('/products',
    async () => {
        const res = await reqProductList()
        return res
    }
)

////请求商品搜索异步action
export const searchProductAsync = createAsyncThunk('/products/search',
    async (productDesc) => {
        const res = reqSearchProduct(productDesc)
        return res
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: { list: [] },
    reducers: {
        saveProduct: (state, { payload }) => {
            state.list = payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProductListAsync.pending, (state) => { console.log('进行中') })
            .addCase(getProductListAsync.fulfilled, (state, { payload }) => {
                //报错：A non-serializable value was detected in an action（貌似因为payload不是一个简单对象所造成）
                state.list = payload.data.products
            })
            .addCase(getProductListAsync.rejected, (state) => { console.log('err~') })
            .addCase(searchProductAsync.fulfilled, (state, { payload }) => {
                state.list = payload.data.products
            }) //此处仅添加了成功的回调
    }
})


export const { saveProduct } = productSlice.actions
export default productSlice.reducer