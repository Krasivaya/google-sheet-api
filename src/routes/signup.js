import Signup from "../components/Auth/Signup";

const signup = {
  name: "signup",
  exact: true,
  protected: false,
  path: "/signup",
  component: <Signup />,
};

export default signup;
