"use client";

import {
  faCakeCandles,
  faUser,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@app/Button";
import { useFormik } from "formik";

import * as yup from "yup";
import FormInput from "../FormInput";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3)
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, "Please enter full name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  age: yup
    .number()
    .min(13, "Must be older than 13")
    .required("Age is required"),
});

function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      age: 13,
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
  });

  return (
    <form className="space-y-6 mt-4 sm:mb-4" onSubmit={formik.handleSubmit}>
      <div className="flex">
        <div className="w-2/3">
          <FormInput
            icon={faUser}
            label="Full name"
            onChange={formik.handleChange}
            value={formik.values.name}
            id="name"
            name="name"
            type="text"
            error={formik.values.name ? formik.errors.name : undefined}
          />
        </div>

        <div className="w-1/2 pl-6">
          <FormInput
            id="age"
            name="age"
            min="13"
            onChange={formik.handleChange}
            value={formik.values.age}
            label="Age"
            icon={faCakeCandles}
            error={formik.values.age ? formik.errors.age : undefined}
            type="number"
          />
        </div>
      </div>
      <div>
        <FormInput
          icon={faEnvelope}
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.values.email ? formik.errors.email : undefined}
        />
      </div>
      <div>
        <FormInput
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          icon={faKey}
          label="Password"
          error={formik.values.password ? formik.errors.password : undefined}
        />
      </div>
      <Button
        type="submit"
        className="w-full block"
        disabled={Object.values(formik.errors).length !== 0}
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
