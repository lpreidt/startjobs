import { firestore } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  Timestamp,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

export async function createJobInDB(jobData, companyId) {
  const db = firestore;
  const jobsCollectionRef = collection(db, "jobs");
  const userRef = doc(jobsCollectionRef);
  const companyRef = doc(db, "companies", companyId);
  await setDoc(userRef, {
    created_at: serverTimestamp(),
    company: companyRef,
    description: jobData.description,
    location: jobData.location,
    name: jobData.name,
    type: jobData.type,
    documents: jobData.documents,
    qualifications: jobData.qualifications,
  });
}
export async function updateJobInDB(jobData, companyId) {
  const db = firestore;
  const companyRef = doc(db, "companies", companyId);
  const docRef = doc(db, "jobs", jobData.id);
  await setDoc(docRef, {
    created_at: serverTimestamp(),
    company: companyRef,
    description: jobData.description,
    location: jobData.location,
    name: jobData.name,
    type: jobData.type,
    documents: jobData.documents,
    qualifications: jobData.qualifications,
  });
}
export async function deleteJobInDB(jobId) {
  const db = firestore;
  const docRef = doc(db, "jobs", jobId);
  await deleteDoc(docRef);
}
