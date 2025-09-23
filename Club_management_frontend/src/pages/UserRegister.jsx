import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react"; // eye icons

// ✅ Validation schema
const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .required("Age is required"),
  gender: yup.string().required("Gender is required"),
  year: yup
    .string()
    .matches(/^\d{4}$/, "Year must be a 4-digit number")
    .required("Year is required"),
  photo: yup
    .mixed()
    .test("fileSize", "File is too large (max 2MB)", (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 2000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (!value || value.length === 0) return true;
      return ["image/jpeg", "image/png"].includes(value[0].type);
    }),
});

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Registration successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        {/* Use a grid layout for side-by-side fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* First Name */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">First Name</label>
            <input
              type="text"
              placeholder="John"
              {...register("first_name")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <p className="text-red-500 text-sm">{errors.first_name?.message}</p>
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              {...register("last_name")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <p className="text-red-500 text-sm">{errors.last_name?.message}</p>
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Username</label>
            <input
              type="text"
              placeholder="johndoe123"
              {...register("username")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password with Eye Toggle */}
          <div className="relative " >
            <label className="block mb-1 text-gray-600 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter your password"
              {...register("password")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-11 content-center justify-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              {...register("age")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <p className="text-red-500 text-sm">{errors.age?.message}</p>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Gender</label>
            <select
              {...register("gender")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p className="text-red-500 text-sm">{errors.gender?.message}</p>
          </div>

          {/* Year */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Year</label>
            <input
              type="text"
              placeholder="2025"
              {...register("year")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <p className="text-red-500 text-sm">{errors.year?.message}</p>
          </div>

          {/* Photo */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Profile Photo</label>
            <input
              type="file"
              {...register("photo")}
              accept="image/*"
              className="w-full p-2 border rounded-lg bg-gray-50"
            />
            <p className="text-red-500 text-sm">{errors.photo?.message}</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Register
        </button>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
