import Login from "../components/Auth/Login";

const login = {
  name: "login",
  exact: true,
  protected: false,
  path: "/login",
  component: <Login />,
};

export default login;
