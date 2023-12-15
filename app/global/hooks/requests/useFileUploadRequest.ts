import { ref, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from "firebase/storage";
import { genUUID } from "../../utils/commons";
import { storage } from "../../utils/firebase";

interface UseUploadFileRequest {
  uploadFile: (file: File) => Promise<string>;
}
const useUploadFileRequest = (): UseUploadFileRequest => {
  const uploadFile = async (file: File): Promise<string> => {
    try {
      const storageRef = ref(storage, `uploads/${genUUID()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => { /* You can handle snapshot updates here if needed */ },
          (error) => {
            reject(error); // Reject the promise if there's an error during upload
          },
          async () => {
            // Upload completed successfully
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(url);
              resolve(url); // Resolve the promise with the file URL
            } catch (error) {
              reject(error); // Reject the promise if getting the URL fails
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error uploading file: " + error);
    }
  };

  return {
    uploadFile,
  };
};

export default useUploadFileRequest;
