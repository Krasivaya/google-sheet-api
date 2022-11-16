import Deposit from "../components/Payment/Deposit";

const deposit = {
  name: "deposit",
  exact: true,
  protected: true,
  path: "/deposit",
  component: <Deposit />,
};

export default deposit;
