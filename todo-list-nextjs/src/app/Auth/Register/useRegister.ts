import { useForm, SubmitHandler } from "react-hook-form"
import { AuthType } from "../../../models/register"
import { registerUser } from "../../../lib/firebase/authSetting"

type FormValues = AuthType;

export const useRegister = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormValues>({});
    const pwd = watch("password", "");
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await registerUser(data);
        alert("Register Success");
        reset();
    };

    return {
        register,
        handleSubmit,
        control,
        formState: {errors},
        onSubmit,
        pwd
    }
}