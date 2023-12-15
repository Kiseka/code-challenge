"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "~/app/global/state/hooks"
import { useAuth } from "../contexts/AuthContext"

const MyAccountSection = () => {
    const [showDropDown, setShowDropDown] = useState(false)
    const router = useRouter()
    const { logout } = useAuth()

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [])


    return (
        <div ref={dropdownRef}>
            <div onClick={() => setShowDropDown(!showDropDown)} className="flex gap-[3px] cursor-pointer">
                <div test-id="user-initials-container" className="w-5 h-5 bg-pink-600 bg-opacity-80 text-center flex flex-col justify-center rounded-full text-white text-xs">
                    MK
                </div>
            </div>
            <div className={!showDropDown ? 'hidden' : '' + 'z-50 right-4 border absolute min-w-[13rem] rounded min-h-[80px] text-base list-none bg-white bg-opacity-100 drop-shadow py-1 mt-8 overflow-y-auto top-4'} >
                <ul className="">
                    <li onClick={() => logout()} className="nav-dropdown-item text-sm text-gray-600 font-normal"> <span>Logout</span> </li>
                </ul>
            </div>
        </div>
    )
}
export default MyAccountSection;