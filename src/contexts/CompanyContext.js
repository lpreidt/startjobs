import { firestore, auth } from '../firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export async function createCompanyInDB(user, companyData){
    const db = firestore;
    const userRef = doc(db, "companies", user.uid);
    await setDoc(userRef, {
        email: companyData.email,
        employee_count: companyData.employee_count,
        history: companyData.history,
        location: companyData.location,
        name: companyData.name,
        picture: companyData.picture,
        website: companyData.website,
        business_model: companyData.business_model,
    });
}
