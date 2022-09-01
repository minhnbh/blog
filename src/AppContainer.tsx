import LazyLoadingFallback from 'app/components/LazyLoadingFallback';
import ConfirmModal from 'pages/_commons/ConfirmModal';
import ToastControl from 'pages/_commons/Toast';
import React, { Fragment, Suspense, useCallback } from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from 'routes/constants';
import MainLayout from 'routes/MainLayout';

const AppContainer: React.FC = () => {
  const RouteView = useCallback(
    (routeData: IRoute[]) =>
      routeData.map(({ key, Component, path, routes, index }) => (
        <Route
          index={index}
          key={key}
          element={
            <Suspense fallback={<LazyLoadingFallback />}>
              <Component />
            </Suspense>
          }
          path={path}
        >
          {routes && RouteView(routes)}
        </Route>
      )),
    []
  );

  return (
    <Fragment>
      <main className="position-relative">
        <ToastControl />
        <ConfirmModal />
        {/* <Routes>
            <Route path="/" element={<Navigate to={'login'} replace />} />
            {RouteView(AUTH_NAVIGATION)}
          </Routes>
          {authUserInfo && (
            <div className="h-100 pt-24">
              <MainLayout className="pt-40">
                <Routes>
                  {RouteView(
                    isAdmin() ? ADMIN_MAIN_NAVIGATION : MAIN_NAVIGATION
                  )}
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </MainLayout>
            </div>
          )} */}
        <MainLayout></MainLayout>
      </main>
    </Fragment>
  );
};

export default AppContainer;
