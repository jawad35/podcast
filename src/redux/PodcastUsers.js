import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name:'PodcastUsers',
    initialState:{
        user:[],
        shorts:[],
        refresh:'',
        userId:''
    },
    reducers:{
        SetUserData(state, action){
            state.user = action.payload
        },
        SetShortsData(state, action){
            state.shorts = action.payload
        },
        setRefresh(state, payload) {
            state.refresh = action.payload
        },
        SetUserId(state, action){
            state.userId = action.payload
        },
    }
})

export const {SetUserData, SetShortsData, setRefresh, SetUserId} = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer