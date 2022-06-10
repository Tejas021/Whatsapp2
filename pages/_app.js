import "../styles/global.scss"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth,app,db} from "../firebaseConfig"
import Login from "./login"
import Loading from '../components/Loading'
import { useEffect } from "react"
import firebase from 'firebase/compat/app';
import {doc,getDoc,setDoc,serverTimestamp} from "firebase/firestore"
// import { } from "firebase/firestore"
export default function MyApp({ Component, pageProps }) {

    const [user,loading] = useAuthState(auth);

    useEffect(() => {
        if(user){
            // db.collection('user').doc(user.uid).set({
            //     email:user.email,
            //     lastSeen : firebase.firestore.FieldValue.serverStamp(),
            //     photoURL:user.photoURL
            // },{merge:true})

            setDoc(doc(db, "user", user.uid), {
                    email:user.email,
                lastSeen :serverTimestamp(),
                photoURL:user.photoURL,
                name:user.displayName
              },{merge:true});
              
        }
      


    }, [user]);


if(loading) return <Loading/>
    if (!user) return <Login/>

    return <Component {...pageProps} />
  }