import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { doc, getDoc } from "firebase/firestore";

const useLogin = () => {
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth)
  const showToast = useShowToast()
  const loginUser = useAuthStore(state => state.login)

  const login = async (inputs) => {
    const { email, password } = inputs 
    if (!email || !password) {
        showToast('Error', 'Please fill all the fields', 'error')
        return
    }

    try {
        const userCred = await signInWithEmailAndPassword(email, password)

        if (userCred) {
            const docRef = doc(firestore, "users", userCred.user.uid)
            const docSnap = await getDoc(docRef)
            localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
            loginUser(docSnap.data())
        }
    } catch (error) {
        showToast('Error', error.message, 'error')
    }
  }
  
  return { login, loading, error }
}

export default useLogin