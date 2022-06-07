import React, { Suspense, lazy } from "react";
import TopBar from "./components/TopBar";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from "react-router-dom";

import LazyPageLoader from "../../components/LazyPageLoader/index";
import { CssBaseline, Box, useTheme } from "@mui/material";
import CustomRoute from "./components/CustomRoutes";

export const drawerWidth = 240;

const Books = lazy(() => import("../books"));

interface PageInformationContextProps {
  pageTitle: string;
  changePageTitle: (pageTitle: string) => void;
}

export const PageInfomationContext =
  React.createContext<PageInformationContextProps>({
    pageTitle: "",
    changePageTitle: () => {},
  });

const Root: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LazyPageLoader />}>
          <Switch>
            <Box sx={{ display: "flex" }}>
              <TopBar />
              <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 10 }}>
                <CustomRoute
                  exact
                  path={`/books`}
                  pageTitle="Books"
                  component={Books}
                />
              </Box>
            </Box>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default Root;
