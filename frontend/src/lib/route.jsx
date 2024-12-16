import { useNavigate } from "react-router-dom";

const route = () => {
  const navigate = useNavigate();
  return [navigate];
};

export default route;
