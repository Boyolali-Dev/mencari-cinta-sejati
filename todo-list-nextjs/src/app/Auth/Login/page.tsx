"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthType } from "../../../models/register";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { loginUser } from "../../../lib/firebase/authSetting";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

type FormValues = AuthType;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      });
      reset();
      router.push("/");
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.gapContainer}>
          <div className={style.gapForm}>
            <div className={style.formContainer}>
              <div className={style.formContainerContent}>
                <div className={style.title}>
                  <h1 className={style.h1}>Login</h1>
                </div>
                <div className={style.spacer}></div>
                <div className={style.auth}>
                  <button className={style.authContent}>
                    <FcGoogle className={style.icon} />
                    <hr />
                    Continue with Google
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>Email</label>
                      </span>
                      <div className={style.formInput}>
                        <input
                          type="email"
                          placeholder="Enter your email..."
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Invalid email format",
                            },
                          })}
                          className={style.input}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.email && (
                    <span role="alert" className={style.p}>
                      {errors.email.message}
                    </span>
                  )}
                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>Password</label>
                      </span>
                      <div className={style.formInput}>
                        <input
                          id="password"
                          placeholder="Enter your password..."
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                          })}
                          className={style.input}
                          type="password"
                        />
                        {errors.password && (
                          <span role="alert">{errors.password.message}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.password && (
                    <p className={style.p}>{errors.password.message}</p>
                  )}
                  <div className={style.formSubmit}>
                    <input
                      type="submit"
                      className={style.input}
                      value="login"
                    />
                  </div>
                </form>
                <hr className={style.hr}></hr>
                <div className={style.loginContent}>
                  <p className={style.login}>
                    Already have an account?{" "}
                    <Link href="/Auth/Register" className={style.link}>
                      Register
                    </Link>
                  </p>
                </div>
              </div>
              <div className={style.imageContainer}>
                <div className={style.imageContent}>
                  <div className={style.imageControl}>
                    <Image
                      src="/Untitled-1.png"
                      alt="Register"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
