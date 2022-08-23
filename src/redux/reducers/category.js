import { SAVE_CATEGORY_LIST } from '../constant'

export default function category(preState = [], action) {
    const { type, data } = action
    switch (type) {
        case SAVE_CATEGORY_LIST:
            return data
        default:
            return preState
    }
}