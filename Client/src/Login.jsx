import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoggedIn } from "./Store/isLoggedInSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onButtonClick = (e) => {
    e.preventDefault();
    // You'll update this function later...
    axios
      .post(
        "http://localhost:3000/api/v1/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          dispatch(toggleLoggedIn());
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form onSubmit={onButtonClick} className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(e) => setEmail(e.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(e) => setPassword(e.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input className={"inputButton"} type="submit" value={"Log in"} />
      </div>
    </form>
  );
};

export default Login;
