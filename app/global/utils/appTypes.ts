
export type TypeAppStatus = "idle" | "pending" | "error" | "success";

export type TypeDispatchResponse = {
    error?: any
    payload?: any
}

export type TypeErrorResponse = { message: string, status: string }


export type Profile = {
    _id: string;
    userId?: string;
    first_name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export type FileInputData= {
    fileName: string | undefined; file: File | null;
}