import { AuthType } from "../../models/register";
import { firebaseDb } from "./firestore";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import bcript from "bcryptjs"

type RegisterUserType = AuthType; 

async function getNextUserId() {
    const counterDocRef = doc(firebaseDb, "counters", "userId");
    const counterDocSnap = await getDoc(counterDocRef)

    if(counterDocSnap.exists()) {
        const currentId = counterDocSnap.data().currentId;
        await updateDoc(counterDocRef, { currentId: currentId + 1})
        return currentId + 1
    } else {
        await setDoc(counterDocRef, {currentId: 1})
        return 1
    }
}

export async function registerUser(data: RegisterUserType) {
    try {
        const id = await getNextUserId();
        const hashedPassword = await bcript.hash(data.password, 10)
        const hashedConfirmPassword = await bcript.hash(data.confirmPassword, 10)

        const userData = {...data, password: hashedPassword, confirmPassword: hashedConfirmPassword, id: id.toString()}

        await setDoc(doc(firebaseDb, "users", data.email), userData);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function loginUser(data: RegisterUserType): Promise<AuthType> {
    if (!data.email) {
        throw new Error("Email is required");
    }

    try {
        const userDocRef = doc(firebaseDb, "users", data.email);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            throw new Error("User not found");
        }

        const userData = userDocSnap.data() as AuthType;
        const isPasswordMatch = await bcript.compare(data.password, userData.password);
        
        if (!isPasswordMatch) {
            throw new Error("Invalid password");
        }

        return userData;
    } catch (e) {
        console.error("Error during login: ", e);
        throw new Error("Login failed");
    }
}