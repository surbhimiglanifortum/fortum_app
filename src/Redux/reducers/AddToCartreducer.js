
const initialData = {
    cartItem: []
}

const AddToCartReducers = ((state = initialData, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            state.cartItem.push(action.payload)
            return { ...state }
        case 'ADD_CART_ITEM':
            let itemIndex = state.cartItem.findIndex(e => e.id == action.payload.id)
            if (itemIndex >= 0) {
                state.cartItem[itemIndex].cartItem = state.cartItem[itemIndex].cartItem + 1
            }
            return { ...state }
        case 'SUB_CART_ITEM':
            let itemIndexsub = state.cartItem.findIndex(e => e.id == action.payload.id)
            if (itemIndexsub >= 0) {
                state.cartItem[itemIndexsub].cartItem = state.cartItem[itemIndexsub].cartItem - 1
            }
            if (state.cartItem[itemIndexsub].cartItem <= 0) {
                // remove item
                state.cartItem.splice(itemIndexsub, 1)
            }
            return { ...state }
        case 'REMOVE_TO_CART':
            state.cartItem.pop(action.payload)
            return { ...state }
        case 'CLEAR_CART':
            state.cartItem=[]
            return { ...state }

        default:
            return { ...state }
    }
})

export default AddToCartReducers