// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { app } from './fireBase'
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
  console.log(req.query.id)
  let userId = req.query.id
  let empty = {}
  const docRef = doc(db, "Users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let userData = docSnap.data();
    res.status(200).json(userData);

  } else {
    console.log("No such document!");
    res.status(200).json(empty);
  }
}
