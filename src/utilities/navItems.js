import {
  VerticalLeftOutlined,
  RetweetOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";

const navItems = [
  {
    key: "deposit",
    label: "Deposit",
    icon: <VerticalLeftOutlined />,
  },
  {
    key: "loan",
    label: "Loan",
    icon: <VerticalRightOutlined />,
  },
  {
    key: "logout",
    label: "Logout",
    icon: <RetweetOutlined />,
  },
];

export default navItems;
