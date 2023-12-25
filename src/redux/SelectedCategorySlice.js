import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name:'selectedCategory',
    initialState:{
        category:'',
        user:[]
    },
    reducers:{
        getPodcastCategory(state, action){
            state.category = action.payload
        },
        SetUserData(state, action){
            state.user = action.payload
        }
    }
})

export const {getPodcastCategory, SetUserData} = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer