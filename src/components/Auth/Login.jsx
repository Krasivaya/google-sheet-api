import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e?.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = () => {
    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      return navigate("/");
    }, 1000);
  };
  return (
    <div className="login">
      <Card>
        <Form>
          <Form.Item>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              onClick={handleSubmit}
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>{" "}
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
