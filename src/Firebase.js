import {initializeApp} from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCG1Np4Y17zt7KGDDbjr2RNUU8qQvaiAtw",
    authDomain: "whatsapp-clone-40840.firebaseapp.com",
    projectId: "whatsapp-clone-40840",
    storageBucket: "whatsapp-clone-40840.appspot.com",
    messagingSenderId: "938402819299",
    appId: "1:938402819299:web:2b8563cc26b34a147fa9d6"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {app,auth,provider};