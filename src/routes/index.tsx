import { Outlet, Route, Routes as Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { PropsWithChildren } from "react";
import BlankLayout from "../components/layouts/BlankLayout";
import MainLayout from "../components/layouts/MainLayout";
import UnAuthenticateRoute from "./UnAuthenticateRoute";
import NotFound from "../pages/notfound";
import HomePage from "../pages/home";
import ProfilePage from "../pages/profile";
import LoginPage from "../pages/login";

type NestedRoute = {
  path: string;
  element: JSX.Element;
  index?: boolean;
  layout?: ({ children }: PropsWithChildren) => JSX.Element;
};

type RouteObject = {
  path: string;
  layout?: ({ children }: PropsWithChildren) => JSX.Element;
  variety?: "unauthenticate" | "public" | "protect";
  children: NestedRoute[];
};

const routes: RouteObject[] = [
  {
    path: "",
    variety: "public",
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "",
    layout: BlankLayout,
    variety: "unauthenticate",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];

export default function Routes() {
  return (
    <Switch>
      {routes.map(
        ({
          path,
          children,
          layout: RootLayout = MainLayout,
          variety = "protect",
        }) => {
          let wrapperElement = <ProtectedRoute />;

          switch (variety) {
            case "unauthenticate":
              wrapperElement = <UnAuthenticateRoute />;
              break;

            case "public":
              wrapperElement = <Outlet />;
              break;
          }

          return (
            <Route key={path} path={path} element={wrapperElement}>
              {children.map(
                ({
                  index,
                  path: nestedPath,
                  element,
                  layout: NestedLayout,
                }) => {
                  const Layout = NestedLayout || RootLayout;

                  return (
                    <Route
                      key={nestedPath}
                      path={nestedPath}
                      index={index}
                      element={<Layout>{element}</Layout>}
                    />
                  );
                }
              )}
            </Route>
          );
        }
      )}

      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
