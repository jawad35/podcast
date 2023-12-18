import { configureStore } from "@reduxjs/toolkit";
import SelectedCategorySlice from "../SelectedCategorySlice";

const PodcastStore = configureStore({
    reducer:{
        selectedCategory:SelectedCategorySlice
    }
})

export default PodcastStore