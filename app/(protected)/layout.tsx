"use client";
import Logo from "@/assets/img/logo.png"
import Image from 'next/image'
import { FiBell } from 'react-icons/fi';
import AppSpinner from "../global/components/AppSpinner";
import { useEffect } from "react";
import { useAuth } from "../global/contexts/AuthContext";
import { useRouter } from "next/navigation";
import MyAccountSection from "../global/components/MyAccountSection";

const ProtectedLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { authenticated,firebaseUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authenticated === false) {
            router.push("/");
        }
    }, [authenticated]);

    if (authenticated === true) {
        return (
            <MainLayout>
                {children}
            </MainLayout>
        );
    } else {
        return <AppSpinner />;
    }
}

export default ProtectedLayout;

const MainLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="bg-gray-50 bg-opacity-80  min-h-screen">
            <div className="h-max">
                <div className=" ">
                    <div className="h-20 border-b flex  px-app-edges bg-white">
                        <div className="flex flex-col justify-center h-full w-2/5 sm:w-4/5 md:w-4/5 lg:w-1/2 ">
                            <Image width={130} className="" src={Logo} alt="Urbanmix Logo" />
                        </div>
                        <div className="flex flex-col justify-center h-full flex-grow">
                            <div className=" flex justify-end gap-3">
                                <span className=" h-auto flex flex-col justify-center text-lg"><FiBell /></span>
                                <MyAccountSection />
                            </div>
                        </div>
                    </div>
                    <div className="px-app-edges">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}


