import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name:'PodcastUsers',
    initialState:{
        user:[],
        shorts:[]
    },
    reducers:{
        SetUserData(state, action){
            state.user = action.payload
        },
        SetShortsData(state, action){
            state.shorts = action.payload
        }
    }
})

export const {SetUserData, SetShortsData} = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer