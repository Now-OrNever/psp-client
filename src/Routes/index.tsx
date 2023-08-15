import { Suspense,lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteList } from './RouteList';
const RootLayout = lazy(()=>import('./RootLayout') );

export default function AllRoutes() {
  return (
    // place a loading spinner here
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <h1>Loading ...</h1>
          {/* <CircularProgress /> */}
        </div>
      }
    >
      <div className="flex flex-col min-h-screen min-w-screen">
        <Routes>
          <Route element={<RootLayout />}>
            <Route>{RouteList}</Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}
