
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const CompletedComponent = () => {
    return (
        <>
            <h4 className=" text-center font-semibold text-lg mt-4">You&apos;re all Done</h4>
            <div className=" flex justify-center py-12">
                <h1 className=" text-7xl text-pink-600"><FaCheckCircle /></h1>
            </div>
            <div className="mt-4 flex justify-center mb-4 gap-3">
                <Link href="/projects">
                    <button type="submit" className="btn-primary bg-pink-800 hover:bg-pink-900 text-sm py-2.5">
                        <span className="flex gap-1">
                            <span className=" flex flex-col justify-center"><FaArrowRight /> </span>
                            Go to Projects
                        </span>
                    </button>
                </Link>
            </div>
        </>
    )
}

export default CompletedComponent;