// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { app } from './fireBase'
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
  let queryResult = []
  let queryResult2 = []
  let categoryData = {}
  const querySnapshot = await getDocs(collection(db, "products"));
  const querySnapshot2 = await getDocs(collection(db, "featuredProduct"));
  const docRef = doc(db, "category", 'category');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    categoryData = docSnap.data();

  } else {
    categoryData = null
    console.log("No such document! from category");
  }

  querySnapshot.forEach((doc) => {
    queryResult.push({...doc.data(),docId: doc.id});
  });

  querySnapshot2.forEach((doc) => {
    queryResult2.push(doc.data());
  });

  res.status(200).json({ product:queryResult,featured:queryResult2,category:categoryData });
}
