import React from "react";
import LabeledInput from "../LabeledInput";
import Button from "../Button";
import { Link } from "react-router-dom";

function FormSignUp() {
  return (
    <>
      <h2 className="text-center text-[20px] font-semibold mb-8">
        Create an account
      </h2>

      <form>
        {/* Name */}
        <div className="mb-5">
          <LabeledInput
            label="Name"
            id="name"
            type="text"
            placeholder="Tanzir Rahman"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <LabeledInput
            label="Email Address"
            id="email"
            type="email"
            placeholder="hello@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <LabeledInput
            label="Password"
            id="password"
            type="password"
            placeholder=".............."
          />
        </div>

        {/* Terms */}
        <p className="text-[11px] text-gray-400 mb-5 leading-5">
          By continuing, you agree to our
          <span className="text-[#25B4A4] cursor-pointer">
            {" "}terms of service.
          </span>
        </p>

        {/* Sign Up Button */}
        <Button type="submit">
          Sign Up
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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.2 7.1l6.2 5.2C39 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"
              />
            </svg>
            Continue with Google
          </span>
        </Button>

        {/* Footer */}
        <p className="text-center text-[11px] text-gray-400 mt-7">
          Already have an account?
          <Link to="/login" className="text-primary font-bold">
          Sign In Here 
          </Link>
        </p>
      </form>
    </>
  );
}

export default FormSignUp;