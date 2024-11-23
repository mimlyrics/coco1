import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import { selectCurrentToken } from "../../slices/auth/authSlice";

const RequireAuth = () => {
  //console.log("yess");
  const token = useSelector(selectCurrentToken);
  const {user} = localStorage.getItem('user');

  const location = useLocation();
  //console.log("location: ", location);
  console.log('token: ', token);
  return (
    user ? 
    <Outlet />
    : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default RequireAuth

