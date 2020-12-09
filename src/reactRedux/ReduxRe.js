import { UPDATE_NHANVIEN, GET_INFO_NHANVIEN, DARK_LIGHT_MODE } from './ReduxAc'

var defaultStore = {
    imgNV: '',
    hoTenNV: '',
    isDarkMode: true,
}

//Reducer
export const reducer = (state = defaultStore, action) => {
    switch (action.type) {
        case GET_INFO_NHANVIEN: {
            const objDefaultNV = { ...action.value }
            // console.log(objDefaultNV)
            state.imgNV = objDefaultNV.imgDefaultStore
            state.hoTenNV = objDefaultNV.nameDefaultStore
            return state
        }
        case UPDATE_NHANVIEN: {
            const objNV = { ...action.value }
            // console.log(objNV)
            state.imgNV = objNV.newImg
            state.hoTenNV = objNV.newName
            // console.log('state new: ', state)
            return state
        }

        case DARK_LIGHT_MODE: {
            state.isDarkMode = action.value
            return state
        }

        default:
            return state
    }
}
