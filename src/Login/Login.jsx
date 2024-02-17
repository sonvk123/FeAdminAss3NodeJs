import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import queryString from "query-string";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true" ? true : false;
    isLogin && navigate("/");
  }, []);

  const handleSubmit = () => {
    // nếu ko có email
    console.log("email:", email);
    console.log("emapasswordil:", password);
    if (!validateEmail(email)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
      if (!validatePassword(password)) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
        const fetchData = async () => {
          const params = {
            email: email,
            password: password,
          };
          console.log("params:", params);
          const query = "?" + queryString.stringify(params);
          console.log("query:", query);
          const response = await UserAPI.postSignIn(query);
          if (response.error) {
            console.log("lỗi");
            console.log(response);
          } else {
            console.log("không lỗi");
            console.log(response);
            console.log(response.user);
            const user = {
              email: response.user.email,
              name_user: response.user.name_user,
            };
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            localStorage.setItem("name_user_", JSON.stringify(user));
            navigate("/");
          }
        };
        fetchData();
      }
    }
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const isValid = password.length >= 8;
    return isValid;
  }
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div class="login">
            <div class="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
