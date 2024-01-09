import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleLoginData(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  // console.log(loginData);

  function handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/v1/login",
        { ...loginData },
      )
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        onChange={handleLoginData}
        name="email"
        placeholder="email"
      />
      <input
        type="text"
        onChange={handleLoginData}
        name="password"
        placeholder="password"
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default Login;
