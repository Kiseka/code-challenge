"use client"
import Image from 'next/image'
import backgroundImage from "@/assets/img/background.png"
import Logo from "@/assets/img/logo.png"
import AppButton from './global/components/AppButton';
import PasswordInput from './global/components/PasswordInput';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './global/state/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TypeDispatchResponse } from './global/utils/appTypes';
import { showToastMessage } from './global/state/features/generalSlice';
import { toast } from 'react-toastify';
import { APP_STATUS } from './global/utils/constants';
import { useAuth } from './global/contexts/AuthContext';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSigningIn, setIsSigningIn] = useState(false)
  const schema = yup.object({
    email: yup
      .string()
      .email("Email format is not valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { login } = useAuth()
  const onSubmit = async (data: FormValues) => {
    setIsSigningIn(true);
    try {
      await login(data.email, data.password)
      router.push('/projects');
      setIsSigningIn(false);
    } catch (e: any) {
      setIsSigningIn(false);
      dispatch(
        showToastMessage({
          message: e.toString(),
          type: 'error',
          position: toast.POSITION.TOP_RIGHT,
        })
      );
    }
  };

  return (
    <>
      <div className='min-h-screen flex justify-center items-center w-full bg-gray-50'>

        <div className='w-1/3 sm:w-full md:w-full lg:w-1/2 mx-3 my-3  rounded-2xl drop-shadow-md px-12 sm:px-4 md:px-4 lg:px-4 py-8 bg-white  justify-center items-center'>
          <div className=' flex justify-center'>
            <Image width={160} alt='Logo' src={Logo} />
          </div>
          <h2 className=' text-center text-2xl font-semibold mt-3'>Sign in</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className=" w-full mt-4">
              <label htmlFor="email" className="form-label ">Email address</label>
              <input id="email" type="email" {...register("email")} className="form-input" />
              <p className="text-xs text-red-600">{errors.email?.message}</p>
            </div>

            <div className=" mt-4">
              <label htmlFor="password" className="form-input-label">Password</label>
              <PasswordInput
                register={register}
                test-id="password"
                inputClass={"form-input peer"} />
              <p className="text-xs text-red-600">{errors.password?.message}</p>
            </div>

            <div className='flex mt-4 accent-pink-600'>
              <div className="flex flex-grow items-center gap-1">
                <input id="remember" type="checkbox" value="" className="w-3.5 h-3.5 text-pink-600 bg-gray-100 rounded-full focus:ring-pink-500 " />
                <label htmlFor="remember" className="form-label ">Remember me </label>
              </div>
              <div>
                <span className=' text-pink-600 text-sm cursor-pointer font-medium'>Forgot password?</span>
              </div>
            </div>
            <div className='mt-4 mb-4'>
              <AppButton
                type='submit'
                callBackFun={() => { }}
                showLoader={isSigningIn}
                spinnerClass="inline w-3 h-3 mr-2 text-white animate-spin fill-pink-900"
                className="btn-primary text-sm py-2.5 w-full" text="Sign in" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
