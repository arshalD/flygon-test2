import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwDMpaSqJLF2CrGDuLZVJf4T9S9ZWeuJA",
  authDomain: "awesome-23720.firebaseapp.com",
  projectId: "awesome-23720",
  storageBucket: "awesome-23720.appspot.com",
  messagingSenderId: "644683392435",
  appId: "1:644683392435:web:bcc1f8b62dd0e9a62c57c6",
  measurementId: "G-X2K0DHSR2H"
};
const app = initializeApp(firebaseConfig);
export {app}