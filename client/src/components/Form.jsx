import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, useMediaQuery } from "@mui/material";
import { setLogin } from "../utils/userSlice";
import { AUTH_API } from "../utils/constants";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pageType, setPageType] = useState("register");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // Function to convert image file to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const register = async (values, onSubmitProps) => {
    // const formData = new FormData(); //allows us to send form info with image
    const formData = values;
    let pictureBase64 = "";
    if (values.picture) {
      pictureBase64 = await convertToBase64(values.picture);
    }
    formData.picturePath= pictureBase64;

    const response = await fetch(`${AUTH_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const savedUser = await response.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };
  // const register = async (values, onSubmitProps) => {
  //   const formData = new FormData(); //allows us to send form info with image
  //   for (let value in values) {
  //     formData.append(value, values[value]);
  //   }
  //   formData.append("picturePath", values.picture.name);

  //   const response = await fetch(`${AUTH_API}/register`, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const savedUser = await response.json();
  //   onSubmitProps.resetForm();

  //   if (savedUser) {
  //     setPageType("login");
  //   }
  // };
  const login = async (values, onSubmitProps) => {
    const response = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedUser = await response.json();
    onSubmitProps.resetForm();

    if (loggedUser) {
      dispatch(
        setLogin({ user: loggedUser.data?.user, token: loggedUser.data?.token })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => {
        return (
          <form className="" onSubmit={handleSubmit}>
            <div className="grid gap-8 grid-cols-2">
              {isRegister && (
                <>
                <TextField
                    className="text-white"
                    InputProps={{ className: "text-white" }}
                    InputLabelProps={{ className: "text-white" }}
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.firstName}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <div className="col-span-2 border-2 border-gray-300 rounded-md p-2">
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className="border-2 border-blue-500 border-dashed p-4 cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <div className="flex justify-between items-center">
                              <p>{values?.picture?.name}</p>
                              <EditOutlinedIcon />{" "}
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </div>
            <div className="flex flex-col items-center my-4">
              <button
                className="w-full px-8 py-2 my-4 text-xl font-medium bg-[#068af5] hover:bg-[#065ef5e4] rounded-md text-white"
                type="submit"
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </button>
              <p
                className="underline cursor-pointer text-[#068af5]"
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
              >
                {isLogin
                  ? "Don'h have an account? Sign Up here."
                  : "Already a member? Login here."}
              </p>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
