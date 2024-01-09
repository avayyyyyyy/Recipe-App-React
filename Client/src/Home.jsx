import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLoggedIn } from "./Store/isLoggedInSlice";

axios.defaults.withCredentials = true;

const Home = () => {
  const isLogged = useSelector((state) => state.isLoggedIn.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onButtonClick = () => {
    // You'll update this function later
    axios.post("http://localhost:3000/api/v1/logout");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(toggleLoggedIn());
        }
      });
  }, []);

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={isLogged ? "Log out" : "Log in"}
        />
        {isLogged ? <div>You have Logged In!</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
