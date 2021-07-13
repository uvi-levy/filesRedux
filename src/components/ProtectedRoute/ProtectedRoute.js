import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { LOGIN_PATH } from "../../utility/constants";

function redirectToLogin(routes) {
  window.location.href = routes ? `${LOGIN_PATH}?routes=${routes}` : LOGIN_PATH;
  return null;
}
const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let routes = rest.computedMatch.params.nameVideo;
  let userName = rest.computedMatch.params.userName;

  useEffect(() => {
    const isLocal = window.location.hostname == "localhost";
    const url = `https://files.codes/${userName}/isPermission?isLocal=${isLocal}`;

    const isPermission = async () => {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: user,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status == 401) {
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        setIsLoading(false);
      }
    };
    isPermission();
  }, []);

  return isLoading ? null : isLoggedIn ? (
    redirectToLogin(routes)
  ) : (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...rest} {...props} />;
      }}
    />
  );
};
export default ProtectedRoute;
