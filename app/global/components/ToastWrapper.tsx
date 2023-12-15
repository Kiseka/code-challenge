"use client";
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { ToastContainer, toast } from "react-toastify"
import { unSetToast } from "../state/features/generalSlice"

const ToastWrapper =()=>{
    const showToast = useAppSelector(state=> state.general.showToast)
    const toastData = useAppSelector(state=> state.general.toastData)
    const dispatch = useAppDispatch()
  
  
    useEffect(()=>{
      if (showToast) {
        if (toastData.type == "error") {
          toast.error(toastData.message, {
              position: toastData.position,
          });
        }else if(toastData.type == "success"){
          toast.success(toastData.message, {
              position: toastData.position
          });
        }
        dispatch(unSetToast(true));
      }
    },[showToast])
    return (
      <div>
          <ToastContainer />
      </div>
    );
  }

export default ToastWrapper;