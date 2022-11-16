import Deposit from "../components/Payment/Deposit";

const dashboard = {
  name: "dashboard",
  exact: true,
  protected: true,
  path: "/",
  component: <Deposit />,
};

export default dashboard;
