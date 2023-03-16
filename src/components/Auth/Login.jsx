import React, { useEffect } from "react";
import { Card, notification } from "antd";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import moment from "moment";
import "./index.scss";
import { DISCOVERY_DOCS, SCOPES } from "../../constant/gapi";
import createSheet, { createSheetForUser } from "../../apis/createSheet";
import { getAllUsers } from "../../apis/getSheet";
import updateSheet from "../../apis/updateSheet";

const Login = () => {
  const spreadsheetId = process.env.REACT_APP_OVERALL_SHEET_ID;
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    const {
      accessToken: token,
      profileObj: { name, email },
    } = response;
    updateLocalStorage({ token, name, email });

    const isAdmin = checkIfUserIsAdmin(email);
    const hasLoggedIn = await checkIfUserLoggedIn(email);

    if (!hasLoggedIn) {
      if (isAdmin) await createSheet({ token });
      else await createSheetForUser({ user: name, token });

      await addLoggedInUser({ name, email });
    }

    return navigate("/");
  };

  const checkIfUserIsAdmin = (email) => {
    const adminEmails = [process.env.REACT_APP_ADMIN_EMAIL];
    return adminEmails.includes(email);
  };

  const checkIfUserLoggedIn = async (email) => {
    const users = await getAllUsers({
      spreadsheetId,
      ranges: "Users!B2:B1000",
    });

    return users.includes(email);
  };

  const addLoggedInUser = async ({ name, email }) => {
    const userSpreadsheetId = localStorage.getItem("spreadsheetId");

    await updateSheet({
      spreadsheetId,
      range: "Users!A2:D2",
      values: [[name, email, userSpreadsheetId, moment().format("lll")]],
    });
  };

  const updateLocalStorage = ({ token, name, email }) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("current_user", name);
    localStorage.setItem("current_user_email", email);
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
