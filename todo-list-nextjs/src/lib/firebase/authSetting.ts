import { RegisterType } from "../../models/register";
import { firebaseDb } from "./firestore";
import { doc, setDoc } from "firebase/firestore";
import bcript from "bcryptjs"

type RegisterUserType = RegisterType; 

export async function registerUser(data: RegisterUserType) {
    try {
        const hashedPassword = await bcript.hash(data.password, 10)
        const hashedConfirmPassword = await bcript.hash(data.confirmPassword, 10)

        const userData = {...data, password: hashedPassword, confirmPassword: hashedConfirmPassword}

        await setDoc(doc(firebaseDb, "users", data.email), userData);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


