import React, { useState } from "react";
import LabeledInput from "../LabeledInput";
import Button from "../Button";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import AppSnackbar from "../AppSnackbar";
import { registerService } from "../../../services/authService";

function FormSignUp() {

  const [loading, setLoading] = useState(false);

const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    password: "",
  },

  validationSchema: Yup.object({
    name: Yup.string().required("Nama wajib diisi"),
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(6, "Minimal 6 karakter")
      .required("Password wajib diisi"),
  }),

  onSubmit: async (values) => {
    setLoading(true);

    try {
      const result = await registerService(
        values.name,
        values.email,
        values.password
      );

      setSnackbar({
        open: true,
        severity: "success",
        message: result.msg,
      });

      formik.resetForm();
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: err.msg,
      });
    }

    setLoading(false);
  },
});

  return (
    <>
      <h2 className="text-center text-[20px] font-semibold mb-8">
        Create an account
      </h2>

      <form onSubmit={formik.handleSubmit}>

  {/* Name */}
  <div className="mb-5">
    <LabeledInput
      label="Name"
      id="name"
      name="name"
      type="text"
      placeholder="Tanzir Rahman"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.name && formik.errors.name}
    />

    {formik.touched.name && formik.errors.name && (
      <p className="mt-1 text-xs text-red-500">
        {formik.errors.name}
      </p>
    )}
  </div>

  {/* Email */}
  <div className="mb-5">
    <LabeledInput
      label="Email Address"
      id="email"
      name="email"
      type="email"
      placeholder="hello@example.com"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.email && formik.errors.email}
    />

    {formik.touched.email && formik.errors.email && (
      <p className="mt-1 text-xs text-red-500">
        {formik.errors.email}
      </p>
    )}
  </div>

  {/* Password */}
  <div className="mb-5">
    <LabeledInput
      label="Password"
      id="password"
      name="password"
      type="password"
      placeholder=".............."
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.password && formik.errors.password}
    />

    {formik.touched.password && formik.errors.password && (
      <p className="mt-1 text-xs text-red-500">
        {formik.errors.password}
      </p>
    )}
  </div>

  {/* Terms */}
  <p className="text-[11px] text-gray-400 mb-5 leading-5">
    By continuing, you agree to our
    <span className="text-[#25B4A4] cursor-pointer">
      {" "}terms of service.
    </span>
  </p>

  {/* Sign Up Button */}
  <Button type="submit" disabled={loading}>
    {loading ? "Loading..." : "Sign Up"}
  </Button>

  {/* Divider */}
  <div className="flex items-center my-6">
    <div className="flex-1 h-[1px] bg-gray-200"></div>

    <span className="px-3 text-[11px] text-gray-400">
      or sign up with
    </span>

    <div className="flex-1 h-[1px] bg-gray-200"></div>
  </div>

  {/* Google Button */}
  <Button type="button" variant="secondary">
    <span className="flex items-center justify-center gap-2">
      {/* SVG tetap seperti milikmu */}
      Continue with Google
    </span>
  </Button>

  {/* Footer */}
  <p className="text-center text-[11px] text-gray-400 mt-7">
    Already have an account?
    <Link to="/login" className="text-primary font-bold">
      {" "}Sign In Here
    </Link>
  </p>

</form>
      <AppSnackbar
  open={snackbar.open}
  message={snackbar.message}
  severity={snackbar.severity}
  onClose={() =>
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }
/>
    </>
  );
}

export default FormSignUp;