import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgAtNpZiqufKJ3mT61Q5alE1onHlDyrKw",
  authDomain: "goit-react-native-8f12b.firebaseapp.com",
  projectId: "goit-react-native-8f12b",
  storageBucket: "goit-react-native-8f12b.appspot.com",
  messagingSenderId: "451271538613",
  appId: "1:451271538613:web:c40b3440138e270f474bfc",
  measurementId: "G-QBFFJRFLP3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
