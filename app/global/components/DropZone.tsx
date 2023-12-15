import { forwardRef, useEffect, useState } from "react";
import { FaFilePdf, FaFileWord, FaFileImage } from "react-icons/fa";

type DropFileProps = {
    children: React.ReactNode;
    componentId: string,
    handleFileChange: (file: File | undefined) => void
    defaultFile:File | undefined
};

export interface DropFileFunctions {
    removeFile: () => void;
}

const DropZone = forwardRef<DropFileFunctions, DropFileProps>(
    ({ children, componentId, handleFileChange, defaultFile }: DropFileProps, ref) => {
        const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

        useEffect(()=>{
            console.log(defaultFile)
            setSelectedFile(defaultFile)
            handleFileChange(defaultFile)
        },[defaultFile])

        useEffect(() => {
            handleFileChange(selectedFile)
        }, [selectedFile])

        const handleFileSelect = (file: File) => {
            setSelectedFile(file);
        };

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
                handleFileSelect(file);
            }
        };

        const getFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            const file = files?.[0];
            e.target.value = ""; // Reset the input field value
            if (file) {
                handleFileSelect(file);
            }
        };

        return (
            <div className="w-full relative">
                <label
                    htmlFor={componentId}
                    className="flex flex-col items-center justify-center w-full h-44 border-2 px-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {

                        <div>
                            {!selectedFile ?
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        aria-hidden="true"
                                        className="w-10 h-10 mb-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        ></path>
                                    </svg>
                                    {children}
                                </div> : <SelectedFileSection file={selectedFile} />
                            }
                            <input onChange={(e) => getFile(e)} id={componentId} type="file" className="hidden" />
                        </div>

                    }
                </label>
            </div>
        );
    }
);
DropZone.displayName = "DropZone"
export default DropZone;

const SelectedFileSection = ({ file }: { file: File }) => {
    const fileName = file.name;
    const fileType = fileName.split(".").pop()?.toLowerCase();
    let fileIcon = null;
    let textColor = ""

    if (fileType === "pdf") {
        fileIcon = <FaFilePdf />;
        textColor = "text-red-700"
    } else if (fileType === "docx" || fileType === "doc") {
        fileIcon = <FaFileWord />;
        textColor = "text-blue-700"

    } else if (fileType === "jpg" || fileType === "jpeg" || fileType === "png" || fileType === "gif") {
        fileIcon = <FaFileImage />;
        textColor = "text-amber-600"
    }

    return (
        <div>
            <div>
                <p className={`flex justify-center text-4xl ${textColor}`}>{fileIcon}</p>
                <p>{fileName}</p>
            </div>
        </div>
    );
}