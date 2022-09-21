import { createSlice } from '@reduxjs/toolkit'
const categorySlice = createSlice({
    name: 'category',
    initialState: {value:[]},
    reducers: {
        //参数二：为action, 内置payload可拿到分发action时的传参
        saveCategoryList: (state,{payload}) => {
            //底层内置immer,因此可直接修改，无需重新reture 
            state.value = payload
        }
    }
})

//导出action  -----> 供dispatch使用
export const {saveCategoryList} = categorySlice.actions
//导出reducer ------> 供store使用
export default categorySlice.reducer