import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../services/auth/selectors";
import { routes } from "../../utils/routes";

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector(getUser);

  return (
    <Route
      {...rest}
      render={(location) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.signin,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
