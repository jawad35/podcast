import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name:'PodcastUsers',
    initialState:{
        user:[],
        shorts:[],
        refresh:''
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
        }
    }
})

export const {SetUserData, SetShortsDatam, setRefresh} = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer