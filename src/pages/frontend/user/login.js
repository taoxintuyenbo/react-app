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
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import UserService from "../../../services/UserService";

const FACEBOOK_APP_ID = "684685780864943"; // Thay bằng Facebook App ID của bạn

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

  // // Xử lý input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Facebook SDK loader
  useEffect(() => {
    if (window.FB) return;
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };
    (function (d, s, id) {
      if (d.getElementById(id)) return;
      var js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk.js";
      var fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Move async logic here
  const handleFacebookLoginResponse = async (response) => {
    if (response.status === "connected" && response.authResponse) {
      try {
        const res = await UserService.facebookLogin({
          access_token: response.authResponse.accessToken,
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

  // Facebook Login Handler
  const handleFacebookLogin = () => {
    if (!window.FB) {
      setError("Không thể tải Facebook SDK");
      return;
    }
    window.FB.login(
      (response) => {
        handleFacebookLoginResponse(response); // Not async here!
      },
      { scope: "email,public_profile" }
    );
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
        <h1 className="text-3xl font-semibold mb-4 text-center">Đăng nhập</h1>
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

            <button
              type="button"
              onClick={handleFacebookLogin}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "50px",
                margin: "20px 0 0 0",
                padding: "0",
                border: "none",
                borderRadius: "18px",
                backgroundColor: "#1877f3",
                color: "#fff",
                fontWeight: 600,
                fontSize: "16px",
                boxShadow: "0 2px 8px #0001",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#145db2")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1877f3")
              }
            >
              <i
                className="fab fa-facebook-f"
                style={{
                  color: "#fff",
                  fontSize: "22px",
                  marginRight: "14px",
                  marginLeft: "-8px",
                }}
              ></i>
              Đăng nhập bằng Facebook
            </button>
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
