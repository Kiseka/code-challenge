import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as yup from "yup";

export type StepOneFormValues = {
    name: string;
    address: string;
    type: string;
    numberOfBuildings: string;
    yearBuilt: string;
};

const StepOneComponent = ({ setData, defaultValues }:
    { setData: (data: StepOneFormValues) => void, defaultValues: StepOneFormValues }) => {

    const schema = yup.object({
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address is required"),
        type: yup.string().required("Type is required"),
        numberOfBuildings: yup.string()
            .required("Number of Buildings is required"),
        yearBuilt: yup.string().required("Year is required"),
    });

    const form = useForm<StepOneFormValues>({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });

    const { register, handleSubmit, formState, watch, setValue } = form;
    const { errors } = formState;
    const onSubmit = (data: StepOneFormValues) => {
        setData(data)
    }
    const currentYear = new Date().getFullYear();
    const years = [...Array(201)].map((_, index) => currentYear - index);


    return (
        <>
            <h3 className=" text-center text-pink-600 font-medium">Step 1</h3>
            <h4 className=" text-center font-semibold text-lg">Enter Your Project Details</h4>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mt-4">
                    <label htmlFor="name" className="form-label ">Name</label>
                    <input placeholder="The Carlyle" {...register("name")} id="name" type="text" className="form-input mt-0.5" />
                    <p className="text-xs text-red-600">{errors.name?.message}</p>
                </div>

                <div className="mt-4">
                    <label htmlFor="address" className="form-label ">Address</label>
                    <input placeholder="35 East 76th Street, #3006" {...register("address")} id="address" type="text" className="form-input mt-0.5" />
                    <p className="text-xs text-red-600">{errors.address?.message}</p>
                </div>

                <div className="mt-4">
                    <label htmlFor="type" className="form-label ">Type</label>
                    <select {...register("type")} className="form-input mt-0.5" id="type">
                        <option value="">Select</option>
                        <option value="Residential">Residential</option>
                        <option value="Business">Business</option>
                        <option value="Industrial">Industrial</option>
                    </select>
                    <p className="text-xs text-red-600">{errors.type?.message}</p>
                </div>

                <div className="mt-4">
                    <label htmlFor="numberOfBuildings" className="form-label ">Number of Buildings</label>
                    <input placeholder="31" {...register("numberOfBuildings")} id="numberOfBuildings" type="number" className="form-input mt-0.5" />
                    <p className="text-xs text-red-600">{errors.numberOfBuildings?.message}</p>
                </div>

                <div className="mt-4">
                    <label htmlFor="yearBuilt" className="form-label ">Year Built</label>
                    <select {...register("yearBuilt")} className="form-input mt-0.5" id="yearBuilt">
                        <option value="">Select</option>
                        {
                            years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))
                        }
                    </select>
                    <p className="text-xs text-red-600">{errors.yearBuilt?.message}</p>
                </div>

                <div className="mt-4 flex justify-center mb-4">
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

export default StepOneComponent;