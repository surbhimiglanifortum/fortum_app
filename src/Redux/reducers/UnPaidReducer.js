const initialData = {
    unPaid:[]
}

const UnPaidReducer = ((state = initialData, action) => {
    switch (action.type) {
        case 'ADD_TO_UNPAID':
            state.unPaid.push(action.payload)
            return { ...state }
       
        default:
            return { ...state }
    }
})

export default UnPaidReducer