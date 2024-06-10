import { useForm, SubmitHandler } from "react-hook-form";
import { AuthType } from "../../../models/register";
import { loginUser } from "../../../lib/firebase/authSetting";
import { useRouter } from "next/navigation";

type FormValues = AuthType;

export const useLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({})

    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await loginUser({
                email: data.email,
                password: data.password,
            })
            reset();
            router.push("/");
        } catch (errors) {
            console.log(errors);
        }
    };

    return {
        onSubmit,
        register,
        handleSubmit,
        formState: { errors }
    }
}