import { firestore, auth } from "../firebase";
import {
  collection,
  getDoc,
  addDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { arrayUnion, arrayRemove } from "firebase/firestore";

export async function createUserInDB(user, firstName, lastName, email) {
  console.log("neuer User wird erstellt");
  const db = firestore;
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    savedJobs: [],
  });
}
export async function userIsInDB(user) {
  const db = firestore;
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}
export async function addToSavedJobs(user, id) {
  const db = firestore;
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    savedJobs: arrayUnion(id),
  });
}
export async function removeFromSavedJobs(user, id) {
  const db = firestore;
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    savedJobs: arrayRemove(id),
  });
}
