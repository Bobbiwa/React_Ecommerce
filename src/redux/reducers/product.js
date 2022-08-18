import { SAVE_PRODUCT_LIST } from '../constant'

export default function product(preState = [], action) {
    const { type, data } = action
    switch (type) {
        case SAVE_PRODUCT_LIST:
            return data
        default:
            return preState
    }
}