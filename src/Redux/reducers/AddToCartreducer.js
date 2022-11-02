
const initialData={
    cartItem:[]
}

const AddToCartReducers=((state=initialData,action)=>{
    console.log(action.payload,'------------------')
    switch(action.type){
        case 'Add_To_Cart':
            state.cartItem.push(action.payload)
            return {...state}
        case 'REMOVE_To_Cart':
            state.cartItem.pop(action.payload)
            return {...state}

        default: 
        return {...state}
    }
})

export default AddToCartReducers