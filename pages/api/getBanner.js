// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { app } from './fireBase'
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
  let queryResult = []
  const querySnapshot = await getDocs(collection(db, "featuredProduct"));

  querySnapshot.forEach((doc) => {
    queryResult.push(doc.data());
  });
  
  res.status(200).json({ result:queryResult });
}
