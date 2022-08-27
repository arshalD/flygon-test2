import { app } from './fireBase'
import { collection, addDoc, getFirestore, updateDoc, setDoc, getDoc, doc } from "firebase/firestore"; 

const db = getFirestore(app);

export default async function handler(req, res) {
    console.log(req.body.orderDetails)
    let data = req.body
    let orderDetails = data.orderDetails
    let user = orderDetails.user
    let userOrder = data.userOrder
    let paymentId = orderDetails.paymentId
    const docRef = await addDoc(collection(db, "Orders"),orderDetails);
    
    if(user !== null){
        const userdocRef = doc(db, "Users", user);
        const docSnap = await getDoc(userdocRef);

        if (docSnap.exists()) {

            await updateDoc(userdocRef, {
                [paymentId]: userOrder
              });
            res.status(200).json('orderPlaced');
        } else {
            let userData = {}
            userData[paymentId] = userOrder;
            await setDoc(doc(db, "Users", user), userData);
            res.status(200).json('orderPlaced');
        }
    }
    else{
        res.status(200).json('orderPlaced');
    }

  }
  