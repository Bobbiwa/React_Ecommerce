import { reqCategoryList } from './api'
import { nanoid } from 'nanoid'

export const getList = async () => {
    const { data } = await reqCategoryList()
    return data.map((item, index) => ({ key: index, "name": item }))
}

export const add = (name) => [{ "key": nanoid(), name }]

export const update = (categoryList, modalCurrentValue, categoryName) => {
    categoryList.map((item) => {
        if (item.key === modalCurrentValue.key) {
            item.name = categoryName
            return item
        } else {
            return item
        }
    })
}