import React from "react";
import {
  Route,
  useLocation,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";

interface RouteCustomProps extends RouteProps {
  pageTitle: string;
  // component?:
  //   | React.ComponentType<RouteComponentProps<any>>
  //   | React.ComponentType<any>
  //   | undefined;
}

const RouteCustom: React.FC<RouteCustomProps> = ({
  component: Component,
  render,
  pageTitle,
  exact,
  path,
  ...rest
}) => {
  const location = useLocation();

  React.useEffect(() => {
    document.title = pageTitle;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Route
      {...rest}
      exact={exact}
      path={path}
      render={(props) => {
        return <>{Component ? <Component {...props} /> : null}</>;
      }}
    />
  );
};

export default RouteCustom;
