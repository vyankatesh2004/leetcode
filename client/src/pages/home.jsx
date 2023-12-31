import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
/* eslint-disable react/prop-types */

const Home = ({userName, onUserNameChange }) => {
  const url = "https://leetcode-server-n9qv.onrender.com";
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        url,
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      onUserNameChange(user);
      return status
        ? console.log(user)
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  
  return (
    <>
      <div className="bg-info-subtle min-vh-100 pt-5 containe text-center mb-5">
        <h4 className="pt-5">
          Welcome <span className="text-primary">{userName}</span> 
        </h4>
      </div>
    </>
  );
};

export default Home;