"use client"
import { useState } from "react"
import StepOneComponent, { StepOneFormValues } from "./StepOneComponent"
import StepTwoComponent, { StepTwoFormValues } from "./StepTwoComponent"
import StepThreeComponent, { StepThreeFormValues, TypeFloorPaln } from "./StepThreeComponent"
import useUploadFileRequest from "~/app/global/hooks/requests/useFileUploadRequest"
import { showToastMessage } from "~/app/global/state/features/generalSlice"
import { toast } from "react-toastify"
import { useAppDispatch } from "~/app/global/state/hooks"
import useProjectsRequest from "~/app/global/hooks/requests/useProjectsRequest"
import CompletedComponent from "./CompletedComponent"

interface IFormData {
    [key: string]: any;
}
export type FormData = StepOneFormValues & StepTwoFormValues & StepThreeFormValues;

export default function CreateProjectsPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const { uploadFile } = useUploadFileRequest()
    const { saveProject, isSaving } = useProjectsRequest()
    const dispatch = useAppDispatch();
    const [isUploading, setIsUploading] = useState(false)

    const [stepOneData, setStepOneData] = useState<StepOneFormValues>({
        name: "",
        address: "",
        type: "",
        numberOfBuildings: "",
        yearBuilt: "",
    })
    const [stepTwoData, setStepTwoData] = useState<StepTwoFormValues>({
        numberOfUnits: "",
        numberOfFloors: "",
        unitMixFile: undefined
    })
    const [stepThreeData, setStepThreeData] = useState<StepThreeFormValues>({
        floorPlans: [
            { type: "", numberOfUnits: "", uploadList: undefined, placeholder: "A" },
            { type: "", numberOfUnits: "", uploadList: undefined, placeholder: "B" },
            { type: "", numberOfUnits: "", uploadList: undefined, placeholder: "C" },
            { type: "", numberOfUnits: "", uploadList: undefined, placeholder: "D" },
            { type: "", numberOfUnits: "", uploadList: undefined, placeholder: "E" },
        ],
    })

    const submitData = async (lastStepData: StepThreeFormValues) => {
        setStepThreeData({ ...stepThreeData, ...lastStepData })
        const formData = {
            ...stepOneData, ...stepTwoData, floorPlans: lastStepData.floorPlans
        }
        try {
            const filesUploadResponse = await uploadProjectFiles(formData.unitMixFile, formData.floorPlans)
            const { unitMixFile, floorPlans, ...modifiedObject } = formData
            await saveProjectDetails({ ...modifiedObject, ...filesUploadResponse })
        } catch (error) { }
    }

    const saveProjectDetails = async (data: IFormData) => {
        try {
            await saveProject(data)
            dispatch(showToastMessage({
                message: `Project Saved`,
                type: "success",
                position: toast.POSITION.TOP_RIGHT
            }));
            setCurrentStep(4)
        } catch (error) {

            dispatch(showToastMessage({
                message: `Error Saving Project Details`,
                type: "error",
                position: toast.POSITION.TOP_RIGHT
            }));
        }
    }

    const uploadProjectFiles = async (unitMixFile: File | undefined, floorPlans: TypeFloorPaln[]) => {
        try {
            setIsUploading(true)
            let unitMixFileUrl = null;
            if (unitMixFile) {
                unitMixFileUrl = await uploadFile(unitMixFile)
            }
            const floorPlansData = await uploadFloorPlanFIles(floorPlans)
            setIsUploading(false)
            return {
                unitMixFileUrl: unitMixFileUrl,
                floorPlans: floorPlansData
            }
        } catch (error) {
            setIsUploading(false)

            dispatch(showToastMessage({
                message: `Error Uploading Files`,
                type: "error",
                position: toast.POSITION.TOP_RIGHT
            }));
            throw error
        }
    }


    const uploadFloorPlanFIles = async (floorPlans: TypeFloorPaln[]) => {
        const result = []
        for (const item of floorPlans) {
            if (item.uploadList.length > 0) {
                const url = await uploadFile(item.uploadList[0]);
                const { uploadList, placeholder, ...floorPlan } = item;
                result.push({ ...floorPlan, fileUrl: url })
            } else {
                const { uploadList, placeholder, ...floorPlan } = item;
                result.push({ ...floorPlan, fileUrl: null })
            }
        }
        return result;
    }

    return (
        <>
            <div className="flex pt-10  justify-center ">
                <div className={` ${currentStep < 3 ? 'w-3/6' : 'w-3/6'}  sm:w-full md:w-full`}>
                    <h3 className=" text-xl font-semibold mb-3">Add New Project</h3>

                    <div className="ml-5 flex gap-6 sm:gap-2 md:gap-2">
                        <div className=" flex justify-center text-sm flex-shrink-0 py-10">
                            <div>
                                <TimeLineComponent step={currentStep} />
                            </div>
                        </div>
                        <div className="card rounded-xl drop-shadow border-0 p-3 px-5 flex-grow mb-20">
                            {
                                currentStep == 1 &&
                                <StepOneComponent
                                    defaultValues={stepOneData}
                                    setData={(data) => {
                                        setStepOneData({ ...stepOneData, ...data })
                                        setCurrentStep(2)
                                    }} />
                            }
                            {
                                currentStep == 2 &&
                                <StepTwoComponent
                                    defaultValues={stepTwoData}
                                    goBack={(data) => {
                                        setStepTwoData({ ...stepTwoData, ...data })
                                        setCurrentStep(1)
                                    }}
                                    setData={(data) => {
                                        setStepTwoData({ ...stepTwoData, ...data })
                                        setCurrentStep(3)
                                    }} />
                            }
                            {
                                currentStep == 3 &&
                                <StepThreeComponent
                                    defaultValues={stepThreeData}
                                    goBack={(data) => {
                                        setStepThreeData({ ...stepThreeData, ...data })
                                        setCurrentStep(2)
                                    }}
                                    setData={(data) => submitData(data)}
                                    isSaving={isUploading || isSaving} />
                            }
                            {
                                currentStep == 4 && <CompletedComponent />
                            }

                            <p className=" text-sm text-center text-pink-500">
                                {isUploading && 'Uploading files , please wait...'}
                                {isSaving && 'Completing , please wait...'}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




const TimeLineComponent = ({ step }: { step: number }) => {
    const setLabelClass = (index: number) => {
        if (step >= index) {
            return "text-sm text-pink-600"
        } else {
            return "text-sm opacity-80"
        }
    }
    const setCircleClass = (index: number) => {
        if (step >= index) {
            return "bg-pink-600 border border-pink-600 text-white ring-8 ring-gray-50"
        } else {
            return "bg-gray-50 border border-pink-600 text-pink-600 ring-8 ring-gray-50"
        }
    }
    return (
        <ol className=" border-neutral-300  flex flex-col md:justify-center gap-28  border-l w-fit">

            <li className=" s">
                <div className="-ml-3">
                    <div className={`flex items-center justify-center -mt-3 h-5 w-5 rounded-full ${setCircleClass(1)}`}>
                        1
                    </div>
                </div>
                <div className="-ml-5 my-0.5 bg-gray-50">
                    <h4 className={`${setLabelClass(1)}`}>Building ID</h4>
                </div>
            </li>
            <li className="">
                <div className="-ml-3">
                    <div className={`flex items-center justify-center -mt-3 h-5 w-5 rounded-full ${setCircleClass(2)}`}>
                        2
                    </div>
                </div>
                <div className="-ml-4 my-0.5 bg-gray-50">
                    <h4 className={`${setLabelClass(2)}`}>Unit Mix</h4>
                </div>
            </li>
            <li className=" s">
                <div className="-ml-3">
                    <div className={`flex items-center justify-center -mt-3 h-5 w-5 rounded-full ${setCircleClass(3)}`}>
                        3
                    </div>
                </div>
                <div className="-ml-5 my-0.5 bg-gray-50">
                    <h4 className={`${setLabelClass(3)}`}>Floor Plans</h4>
                </div>
            </li>

        </ol>
    )
}