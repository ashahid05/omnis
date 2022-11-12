"use client";

import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Button from "@app/Button";
import { useFormik } from "formik";
import FormInput from "../FormInput";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Please enter a password"),
  rememberMe: yup.bool().notRequired(),
});

function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    onSubmit: async (values) => {
      setLoading(true);
      const result = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await result.json();

      router.push("/");
      setLoading(false);
    },
    validationSchema,
  });
  return (
    <form className="space-y-4 mt-4 sm:mb-4" onSubmit={formik.handleSubmit}>
      <div>
        <FormInput
          id="email"
          type="text"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          icon={faEnvelope}
          error={formik.values.email ? formik.errors.email : undefined}
          disabled={loading}
        />
      </div>
      <div>
        <div>
          <FormInput
            id="password"
            type="password"
            label="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            icon={faKey}
            error={formik.values.password ? formik.errors.password : undefined}
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2 md:space-y-0 sm:space-x-0 md:flex-row md:justify-between md:items-center">
        <div className="space-x-1 flex items-center justify-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={formik.values.rememberMe}
            onChange={(e) =>
              formik.setFieldValue("rememberMe", e.target.checked)
            }
            className="h-5 w-5"
            disabled={loading}
          />
          <label
            htmlFor="remember-me"
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Remember me
          </label>
        </div>
        <p className="text-primary-450 text-sm">Forgot your password?</p>
      </div>
      <div className="flex space-x-2">
        <Button
          type="submit"
          className="w-full block"
          disabled={Object.values(formik.errors).length !== 0}
          loading={loading}
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
