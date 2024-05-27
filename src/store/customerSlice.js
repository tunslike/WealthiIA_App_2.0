import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customerData: [],
    providerChannel: '',
    providerType: ''
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        updateCustomerData: (state, action) => {
            state.customerData = action.payload
        },
        updateProviderChannel: (state, action) => {
            state.providerChannel = action.payload
        },
        updateProviderType: (state, action) => {
            state.providerType = action.payload
        }
    }
})

export const {
            updateCustomerData,
            updateProviderChannel,
            updateProviderType
    } = customerSlice.actions;

export default customerSlice.reducer;

