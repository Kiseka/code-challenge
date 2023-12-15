import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as yup from "yup";
import DropZone from "~/app/global/components/DropZone";
export type StepTwoFormValues = {
    numberOfUnits: string;
    numberOfFloors: string;
    unitMixFile?: File
};

const StepTwoComponent = ({ setData, goBack, defaultValues }:
    { setData: (data: StepTwoFormValues) => void, goBack: (data: StepTwoFormValues) => void, defaultValues: StepTwoFormValues }) => {
    const schema = yup.object({
        numberOfUnits: yup.string()
            .required("Number of Units is required"),
        numberOfFloors: yup.string()
            .required("Number of Floors is required"),
    });

    const form = useForm<StepTwoFormValues>({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });

    const { register, handleSubmit, formState, setValue } = form;
    const { errors } = formState;
    const onSubmit = (data: StepTwoFormValues) => {
        setData(data)
    }

    return (
        <>
            <h3 className=" text-center text-pink-600 font-medium">Step 2</h3>
            <h4 className=" text-center font-semibold text-lg">Upload Your Unit Mix</h4>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className="mt-4">
                    <label htmlFor="numberOfUnits" className="form-label ">Number of Units</label>
                    <input placeholder="200" {...register("numberOfUnits")} id="numberOfUnits" type="number" className="form-input mt-0.5" />
                    <p className="text-xs text-red-600">{errors.numberOfUnits?.message}</p>
                </div>

                <div className="mt-4">
                    <label htmlFor="numberOfFloors" className="form-label ">Number of Floors</label>
                    <input placeholder="15" {...register("numberOfFloors")} id="numberOfFloors" type="number" className="form-input mt-0.5" />
                    <p className="text-xs text-red-600">{errors.numberOfFloors?.message}</p>
                </div>


                <div className="mt-4 mb-4">
                    <label htmlFor="application-form" className="form-label">Upload Unit Mix File</label>
                    <div className=" mt-0.5">
                        <DropZone defaultFile={defaultValues.unitMixFile} componentId={"application-form-zone"} handleFileChange={(file) => setValue("unitMixFile", file)} >
                            <>
                                <p className=" text-sm text-center"><span className=" text-pink-500 text-sm">Upload Unit Mix File</span> <span className=" text-opacity-80">or drag and drop</span></p>
                                <p className=" text-sm text-gray-600">PNG, JPG, PDF up to 10MB</p>
                            </>
                        </DropZone>
                    </div>
                </div>

                <div className="mt-4 flex justify-center mb-4 gap-3">
                    <button onClick={() => goBack(form.getValues())} type="submit" className="btn-primary bg-pink-800 hover:bg-pink-900 text-sm py-2.5">
                        <span className="flex gap-1">
                            <span className=" flex flex-col justify-center"><FaArrowLeft /> </span>
                            Previous Step
                        </span>
                    </button>
                    <button type="submit" className="btn-primary text-sm py-2.5">
                        <span className="flex gap-1">
                            Next Step
                            <span className=" flex flex-col justify-center"><FaArrowRight /> </span>
                        </span>
                    </button>
                </div>
            </form>
        </>
    )
}

export default StepTwoComponent;