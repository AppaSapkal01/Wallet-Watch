import { Navigate } from "react-router-dom";

import { getUserFromStorage } from "../../Utils/getUserFromStorage";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const token = getUserFromStorage();

  if (token) {
    return  <> {children} </>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
