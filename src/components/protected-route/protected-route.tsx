import { FC, PropsWithChildren } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { getUser } from "../../services/auth/selectors";
import { Routes } from "../../utils/routes";

const ProtectedRoute: FC<RouteProps & PropsWithChildren> = ({
  children,
  ...rest
}) => {
  const user = useSelector(getUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.signin,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
