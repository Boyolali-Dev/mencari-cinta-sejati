"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RegisterType } from "../../../models/register";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

type FormValues = RegisterType;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({});
  const pwd = watch("password", "");
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.gapContainer}>
          <div className={style.gapForm}>
            <div className={style.formContainer}>
              <div className={style.formContainerContent}>
                <div className={style.title}>
                  <h1 className={style.h1}>Register</h1>
                </div>
                <div className={style.spacer}></div>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>Username</label>
                      </span>
                      <div className={style.formInput}>
                        <input
                          type="text"
                          placeholder="Enter your username..."
                          {...register("username", {
                            required: "Username is required",
                          })}
                          className={style.input}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.username && (
                    <p className={style.p}>{errors.username.message}</p>
                  )}

                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>First Name</label>
                      </span>
                      <div className={style.formInput}>
                        <input
                          type="text"
                          placeholder="Enter your first name..."
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          className={style.input}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.firstName && (
                    <p className={style.p}>{errors.firstName.message}</p>
                  )}

                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>Last Name</label>
                      </span>
                      <div className={style.formInput}>
                        <input
                          type="text"
                          placeholder="Enter your last name..."
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          className={style.input}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.lastName && (
                    <p className={style.p}>{errors.lastName.message}</p>
                  )}

                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>Email</label>
                      </span>
                      <div className={style.formInput}>
                        <input
                          type="email"
                          placeholder="Enter your email..."
                          {...register("email", {
                            required: "Email name is required",
                          })}
                          className={style.input}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.email && (
                    <p className={style.p}>{errors.email.message}</p>
                  )}

                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>Password</label>
                      </span>
                      <div className={style.formInput}>
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required: "You must specify a password",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be at least 8 characters long",
                            },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="password"
                              className={style.input}
                              placeholder="Enter your password..."
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.password && (
                    <p className={style.p}>{errors.password.message}</p>
                  )}

                  <div className={style.formGroup}>
                    <div className={style.formControl}>
                      <span className={style.formLabel}>
                        <label className={style.label}>Confirm Password</label>
                      </span>
                      <div className={style.formInput}>
                        <Controller
                          name="confirmPassword"
                          control={control}
                          rules={{
                            required: "You must specify a password",
                            validate: (value) =>
                              value === pwd || "The passwords do not match",
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="password"
                              className={style.input}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className={style.p}>{errors.confirmPassword.message}</p>
                  )}
                  <label className={style.label}>Gender</label>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className={style.selectInput}
                  >
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                  </select>
                  {errors.gender && <p>{errors.gender.message}</p>}

                  <div className={style.formSubmit}>
                    <input type="submit" className={style.input} />
                  </div>
                </form>
                <hr className={style.hr}></hr>
                <div className={style.loginContent}>
                  <p className={style.login}>
                    Already have an account?{" "}
                    <Link href="/Auth/Login" className={style.link}>
                      Go to login
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
