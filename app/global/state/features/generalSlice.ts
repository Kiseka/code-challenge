"use client"

import { createSlice } from "@reduxjs/toolkit";
import { ToastPosition, toast } from "react-toastify";
import { RootState } from "../store";

export type TypeToastData = {
    message: string
    type: string
    position: ToastPosition
}

 type TypeState ={
    toastData:TypeToastData,
    showToast:boolean,
    showGlobalLoader:boolean
}

const initialState:TypeState ={
    toastData:{
        message:"",
        type: "",
        position: toast.POSITION.TOP_RIGHT
    },
    showToast:false,
    showGlobalLoader:false
}

const generalSlice = createSlice({
    initialState:initialState,
    name:"general",
    reducers:{
        showGlobalLoader(state){
            state.showGlobalLoader = true;
        },
        hideGlobalLoader(state){
            state.showGlobalLoader = false;
        },
        showToastMessage(state,actions: { payload: TypeToastData; type: string;}){
            state.showToast = true;
            state.toastData = actions.payload
        },
        unSetToast(state,actions){
            state.showToast = false;
            state.toastData = {
                message:"",
                type: "",
                position: toast.POSITION.TOP_RIGHT
            }
        }
    }
})

export const {
    showToastMessage,unSetToast,hideGlobalLoader,showGlobalLoader
} = generalSlice.actions
export default generalSlice.reducer

export const selectShowGlobalLoader = (state: RootState) => state.general.showGlobalLoader;
