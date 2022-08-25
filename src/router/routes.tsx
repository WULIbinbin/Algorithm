import { Navigate, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/layout/index";

const Index = lazy(() => import("@/views/index/index"));
const Array = lazy(() => import("@/views/data-structures/array/index"));
const Tree = lazy(() => import("@/views/data-structures/tree/index"));
const Sort = lazy(() => import("@/views/algorithm/sort/index"));

export default function RouteMain() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/index",
          element: (
            <Suspense>
              <Index />
            </Suspense>
          ),
        },
        {
          path: "/data-structures",
          childern: [
            {
              path: "/array",
              element: (
                <Suspense>
                  <Array />
                </Suspense>
              ),
            },
            {
              path: "/tree",
              element: (
                <Suspense>
                  <Tree />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "/algorithm",
          children: [
            {
              path: "/algorithm/sort",
              element: (
                <Suspense>
                  <Sort />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/",
      index: true,
      element: <Navigate to="/index" />,
    },
    {
      path: "*",
      element: <Navigate to="/index" />,
    },
  ];
  return useRoutes(routes);
}
