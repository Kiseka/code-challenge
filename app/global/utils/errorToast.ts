import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAppDispatch } from '../state/hooks';
import { TypeErrorResponse } from './appTypes';
import { showToastMessage } from '../state/features/generalSlice';
import { toast } from 'react-toastify';

const useErrorToast = () => {
    const dispatch = useAppDispatch()
    const dispatchErrorMessage=(error: any)=>{
        error = error as AxiosError;
    
        let message =""
        if (error.response) {
            const data = error.response.data as TypeErrorResponse
            message = data.message??"Something went wrong";
        } else {
            message = "Something went wrong"
        }
     
        dispatch(showToastMessage({
            message: message,
            type: "error",
            position: toast.POSITION.TOP_RIGHT
        }));
    }
    return dispatchErrorMessage;
};

export default useErrorToast;
