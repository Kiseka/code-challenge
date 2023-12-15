import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import * as yup from "yup";
import AppSpinner from "~/app/global/components/AppSpinner";

export type TypeFloorPaln = {
    type: string;
    numberOfUnits: string;
    uploadList: any;
    placeholder?: string,
}
export type StepThreeFormValues = {
    floorPlans: TypeFloorPaln[];
};

const StepThreeComponent = ({ setData, goBack, defaultValues, isSaving }:
    { setData: (data: StepThreeFormValues) => void, goBack: (data: StepThreeFormValues) => void, defaultValues: StepThreeFormValues, isSaving: boolean }) => {

    const schema = yup.object({
        floorPlans: yup
            .array()
            // .of(
            //     yup.object({
            //         type: yup.string().required('Type is required'),
            //         numberOfUnits: yup.string().required('Number of units is required'),
            //         uploadList: yup.mixed().required('Floor plan is required'),
            //     })
            // )
            .required('At least one floor plan is required'),
    });

    const form = useForm<StepThreeFormValues>({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, control, watch } = form;

    const { fields: floorPlanFields } = useFieldArray({
        name: "floorPlans",
        control,
    });

    const onSubmit = (data: StepThreeFormValues) => {
        setData(data)
    }

    const watchFloorPlans = watch("floorPlans")

    return (
        <>
            <h3 className=" text-center text-pink-600 font-medium">Step 3</h3>
            <h4 className=" text-center font-semibold text-lg">Upload Floor Plans</h4>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className=" grid grid-cols-5 gap-2 mt-4">
                    <div className="col-span-2">
                        <label htmlFor="type" className="form-label ">Type</label>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="numberOfUnits" className="form-label "># of Units</label>
                    </div>
                    <div className="col-span-2 flex justify-end ">
                        <label htmlFor="uploadList" className="form-label ">Upload Floor Plan</label>
                    </div>
                </div>
                {
                    floorPlanFields.map((field, index) =>
                        <div key={field.id} className=" grid grid-cols-5 gap-2 mb-3">
                            <div className="col-span-2">
                                <input placeholder={floorPlanFields[index].placeholder}  {...register(`floorPlans.${index}.type`)} type="text" className="form-input mt-0.5" />
                            </div>
                            <div className="col-span-1">
                                <input placeholder="#" {...register(`floorPlans.${index}.numberOfUnits`)} type="number" className="form-input mt-0.5" />
                            </div>
                            <div className="col-span-2 flex justify-end ">
                                <div className="">
                                    <FileInput
                                        floorPlans={watchFloorPlans}
                                        register={register}
                                        index={index} />
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    isSaving ?
                        <AppSpinner TopClass="w-full flex justify-center py-0" />
                        :
                        <div className="mt-4 flex justify-center mb-4 gap-3">
                            <button onClick={() => goBack(form.getValues())} type="submit" className="btn-primary bg-pink-800 hover:bg-pink-900 text-sm py-2.5">
                                <span className="flex gap-1">
                                    <span className=" flex flex-col justify-center"><FaArrowLeft /> </span>
                                    Previous Step
                                </span>
                            </button>
                            <button type="submit" className="btn-primary text-sm py-2.5">
                                <span className="flex gap-1">
                                    Finish
                                    <span className=" flex flex-col justify-center"><FaArrowRight /> </span>
                                </span>
                            </button>
                        </div>
                }

            </form>
        </>
    )
}

export default StepThreeComponent;


const FileInput = ({ register, index, floorPlans }: { register: UseFormRegister<any>, index: number, floorPlans: TypeFloorPaln[] }) => {

    const [file, setFile] = useState<File | undefined>(undefined)
    useEffect(() => {
        if (floorPlans.length) {
            if (floorPlans[index].uploadList) {
                if (floorPlans[index].uploadList.length > 0) {
                    setFile(floorPlans[index].uploadList[0])
                }
            }
        }
    }, [floorPlans[index].uploadList])

    return (
        <>
            <div className="w-full relative">
                <label
                    htmlFor={`floorPlan_${index}`}
                    className={`flex flex-col items-center justify-center w-full h-full py-2.5 border-2 px-5  rounded-lg cursor-pointer ${file ? ' bg-gray-00 text-pink-500 border-pink-500' : 'border-gray-300 bg-gray-50  border-dashed'}`}
                >
                    {
                        <div>
                            {file ?
                                <div className="flex flex-col items-center justify-center">
                                    <FiImage />
                                </div> :
                                <div>
                                    <span className=" invisible"><FiImage /></span>
                                </div>
                            }
                            <input
                                {...register(`floorPlans.${index}.uploadList`)}
                                id={`floorPlan_${index}`} type="file" className="hidden" />
                        </div>
                    }
                </label>
            </div>
        </>
    )
}