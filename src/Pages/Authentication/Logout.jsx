import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({ name: "", roleName: "", avatar: null });
    navigate("/Login");
  }, [navigate, setUser]);

  return null;
};

export default Logout;
