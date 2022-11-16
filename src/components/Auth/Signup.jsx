import { Button, Card, Form, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const Signup = () => {
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

      return navigate("/login");
    }, 1000);
  };
  return (
    <div className="signup">
      <Card>
        <Form>
          <Form.Item>
            <Input
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </Form.Item>
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
              Create account
            </Button>
          </Form.Item>
          <p>
            Already have an account? <Link to="/login">Log in</Link>{" "}
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
