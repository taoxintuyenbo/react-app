// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google"; // Make sure this package is installed
// import UserService from "../../../services/UserService"; // Adjust path if needed

// const Login = () => {
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//     username: "", // store username after login
//   });
//   const [errors, setErrors] = useState({});
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const token = credentialResponse.credential; // Google ID token
//       // Send token to backend (adjust endpoint if needed)
//       const res = await UserService.googleLogin({ token });
//       console.log("respone", res);
//       const loggedInUser = res.user;
//       setUser((prev) => ({ ...prev, username: loggedInUser.name }));
//       sessionStorage.setItem("user", JSON.stringify(loggedInUser));
//       setError("");
//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       console.error("Google login failed:", error);
//       setError("Đăng nhập bằng Google thất bại");
//     }
//   };

//   const handleError = () => {
//     console.error("Google login failed");
//     setError("Đăng nhập bằng Google thất bại");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setError("");

//     try {
//       const response = await UserService.login(user);
//       setUser((prev) => ({
//         ...prev,
//         username: response.user.name,
//       }));
//       sessionStorage.setItem("user", JSON.stringify(response.user));
//       setError("");
//       navigate("/");
//       window.location.reload();
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.errors) {
//         setErrors(err.response.data.errors);
//       } else {
//         setError("Đăng nhập thất bại. Hãy kiểm tra thông tin và thử lại.");
//       }
//     }
//   };

//   return (
//     <section className="content">
//       <div className="container mx-auto py-6">
//         <h1 className="text-3xl font-semibold mb-4">Đăng nhập</h1>
//         {error && <div className="text-red-500 mb-4">{error}</div>}

//         <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
//           <form onSubmit={handleSubmit}>
//             {/* Email */}
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleChange}
//                 className={`border border-gray-300 p-2 w-full ${
//                   errors.email ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.email && (
//                 <span className="text-red-500 text-sm">{errors.email}</span>
//               )}
//             </div>

//             {/* Password */}
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1" htmlFor="password">
//                 Mật khẩu
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={user.password}
//                 onChange={handleChange}
//                 className={`border border-gray-300 p-2 w-full ${
//                   errors.password ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.password && (
//                 <span className="text-red-500 text-sm">{errors.password}</span>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="btn bg-green-500 text-white py-2 px-4 rounded mt-4 w-full"
//             >
//               Đăng nhập
//             </button>
//           </form>

//           <div className="my-6 text-center">
//             <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
//           </div>

//           <p className="mt-4 text-gray-600 text-center">
//             Chưa có tài khoản?{" "}
//             <Link to="/register" className="text-blue-500">
//               Đăng ký
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import UserService from "../../../services/UserService"; // chỉnh đường dẫn nếu cần

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Xử lý login Google thành công
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await UserService.googleLogin({ token });
      const loggedInUser = res.user;
      setUser((prev) => ({ ...prev, username: loggedInUser.name }));
      sessionStorage.setItem("user", JSON.stringify(loggedInUser));
      setError("");
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Đăng nhập bằng Google thất bại");
    }
  };

  const handleGoogleError = () => {
    setError("Đăng nhập bằng Google thất bại");
  };

  // Xử lý login Facebook thành công
  const handleFacebookResponse = async (response) => {
    if (response.accessToken) {
      try {
        const res = await UserService.facebookLogin({
          access_token: response.accessToken,
        });
        const loggedInUser = res.user;
        setUser((prev) => ({ ...prev, username: loggedInUser.name }));
        sessionStorage.setItem("user", JSON.stringify(loggedInUser));
        setError("");
        navigate("/");
        window.location.reload();
      } catch (err) {
        setError("Đăng nhập bằng Facebook thất bại");
      }
    } else {
      setError("Đăng nhập Facebook bị hủy hoặc thất bại");
    }
  };

  // Xử lý input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit form email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setError("");

    try {
      const response = await UserService.login(user);
      setUser((prev) => ({
        ...prev,
        username: response.user.name,
      }));
      sessionStorage.setItem("user", JSON.stringify(response.user));
      setError("");
      navigate("/");
      window.location.reload();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError("Đăng nhập thất bại. Hãy kiểm tra thông tin và thử lại.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Đăng nhập</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className={`border p-2 w-full ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className={`border p-2 w-full ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded w-full"
            >
              Đăng nhập
            </button>
          </form>

          {/* OAuth buttons */}
          <div className="my-6 text-center space-y-4 max-w-sm mx-auto">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            {/* <FacebookLogin
              appId="684685780864943" // Thay bằng Facebook App ID của bạn
              // autoLoad
              callback={handleFacebookResponse}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
              textButton="Đăng nhập bằng Facebook"
              scope={["email"]}
            /> */}
            <div
              className="facebook-login-container"
              style={{
                display: "flex",
                // justifyContent: "center", // Center the button
                margin: "20px 0", // Add margin if needed
                padding: "10px", // Add padding around the button
                border: "4px", // Facebook blue border
                borderRadius: "8px ", // Rounded corners for the container
                height: "50px", // Adjust height to match the Google button
              }}
            >
              {/* Facebook icon */}
              <i
                className="fab fa-facebook-f"
                style={{
                  color: "#095895",
                  fontSize: "20px",
                  marginRight: "100px",
                }}
              ></i>

              <FacebookLogin
                appId="684685780864943" // Thay bằng Facebook App ID của bạn
                callback={handleFacebookResponse}
                cssClass="facebook-login-button" // Apply custom CSS class
                textButton="Đăng nhập bằng Facebook"
                scope={["email"]}
              />
            </div>
          </div>

          <p className="mt-4 text-gray-600 text-center">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-500">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
