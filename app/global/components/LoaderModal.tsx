import AppSpinner from "~/app/global/components/AppSpinner"
import { selectShowGlobalLoader } from "~/app/global/state/features/generalSlice"
import { useAppSelector } from "~/app/global/state/hooks"
const LoaderModal = () => {
    const showGlobalLoader = useAppSelector(selectShowGlobalLoader)
    return (
        <>
            {(showGlobalLoader) &&
                <div className="modal ">
                    <div className=" modal-content modal-md flex flex-col justify-center">
                        <AppSpinner TopClass="w-full flex justify-center" />
                        <p className=" text-center">Please Wait....</p>
                    </div>
                </div>
            }

        </>
    )
}

export default LoaderModal;