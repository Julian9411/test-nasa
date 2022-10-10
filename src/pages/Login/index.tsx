import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedUser } from "../../redux/reducers/user";
import logo from "../../assets/logo.png";
import { users } from "./login.const";
import { routes } from "../../routes/routes";
import './style.css'

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="login">
        <img src={logo} alt="logo" />
        <h3>Please select a user to use the API Key</h3>
        <div className="usersContainer">
          {users.map((user, index) => (
            <div
              key={user.label}
              onClick={() => {
                dispatch(selectedUser(user));
                navigate(routes.PHOTOS);
              }}
              
            >
              <Avatar>{index}</Avatar>
              <span>{user.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
