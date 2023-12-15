import { useState } from 'react';
import { collection, addDoc, getFirestore, serverTimestamp, getDocs } from 'firebase/firestore';

export type Project = {
    id: string
    numberOfUnits: string;
    numberOfFloors: string;
    name: string;
    address: string;
    type: string;
    numberOfBuildings: string;
    yearBuilt: string;
    unitMixFileUrl: string | null;
    floorPlans: ({
        fileUrl: string;
        type: string;
        numberOfUnits: string;
    } | {
        fileUrl: null;
        type: string;
        numberOfUnits: string;
    })[];
}
const useProjectsRequest = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(false)
    const saveProject = async (data: any): Promise<void> => {
        setIsSaving(true);
        try {
            const firestore = getFirestore();
            const projectsCollection = collection(firestore, 'projects');
            await addDoc(projectsCollection, {
                ...data,
                createdAt: serverTimestamp(),
            });

        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsSaving(false);
        }
    };

    const fetchProjects = async (): Promise<void> => {
        setLoadingProjects(true);
        try {
            const firestore = getFirestore();
            const projectsCollection = collection(firestore, 'projects');
            const projectsSnapshot = await getDocs(projectsCollection);
            const projectsData = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
            setProjects(projectsData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProjects(false);
        }
    };

    return {
        loadingProjects,
        fetchProjects,
        projects,
        saveProject,
        isSaving,
    };
};

export default useProjectsRequest;
