import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name:'selectedCategory',
    initialState:{
        category:'',
        user:[],
        shorts:[]
    },
    reducers:{
        getPodcastCategory(state, action){
            state.category = action.payload
        },
        SetUserData(state, action){
            state.user = action.payload
        },
        SetShorts(state, action){
            state.shorts = action.payload
        }
    }
})

export const {getPodcastCategory, SetUserData, SetShorts} = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer