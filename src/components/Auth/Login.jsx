import React, { useEffect } from "react";
import { Card, notification } from "antd";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import "./index.scss";
import { DISCOVERY_DOCS, SCOPES } from "../../constant/gapi";
// import createSheet from "../../apis/createSheet";

const Login = () => {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    localStorage.setItem("access_token", response.accessToken);
    localStorage.setItem("current_user", response.profileObj.name);
    localStorage.setItem("current_user_email", response.profileObj.email);
    // createSheet({ user: response.wt.Ad, token: response.accessToken });

    return navigate("/");
  };

  const onFailure = (response) => {
    notification.error({
      message: "Google Login",
      description: response.error.replace(/_/g, " "),
    });
  };

  useEffect(() => {
    const startGapi = () => {
      gapi.client.init({
        client_id: process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOCS],
        scope: SCOPES.join(" "),
      });
    };
    gapi.load("client:auth2", startGapi);
  }, []);

  return (
    <div className="login">
      <Card>
        <h2>Login</h2>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Connect with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </Card>
    </div>
  );
};

export default Login;
