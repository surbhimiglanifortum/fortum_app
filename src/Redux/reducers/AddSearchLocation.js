const initialData = {
    searchItem: []
}

const AddSearchLocationReducer = ((state = initialData, action) => {
    switch (action.type) {
        case 'ADD_TO_SEARCH':
            state.searchItem.push(action.payload)
            return { ...state }
       
        default:
            return { ...state }
    }
})

export default AddSearchLocationReducer
