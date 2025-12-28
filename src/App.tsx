import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import Spinner from "./ui/Spinner";

// Lazy Loading
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Apartments = lazy(() => import("./pages/Apartments"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/index.html                         0.46 kB │ gzip:   0.29 kB
// dist/assets/index-DgF7gAb1.css         20.86 kB │ gzip:   4.60 kB
// dist/assets/Signup-W_UiKPR_.js          0.39 kB │ gzip:   0.27 kB
// dist/assets/PageNotFound-4k5-f4aD.js    0.45 kB │ gzip:   0.33 kB
// dist/assets/Login-DqkZtXnG.js           0.52 kB │ gzip:   0.35 kB
// dist/assets/Filter-Dl-1fqnd.js          1.97 kB │ gzip:   0.78 kB
// dist/assets/index-B1EoBlKu.js           2.34 kB │ gzip:   0.89 kB
// dist/assets/AuthPage-DHZFRMQs.js        3.03 kB │ gzip:   0.90 kB
// dist/assets/Bookings-DfR-J3QF.js        3.05 kB │ gzip:   1.26 kB
// dist/assets/Booking-CSF6a64i.js         4.65 kB │ gzip:   1.59 kB
// dist/assets/Settings-BOUJ2-aH.js        4.82 kB │ gzip:   1.21 kB
// dist/assets/Apartments-C3ECsaDs.js      9.08 kB │ gzip:   2.78 kB
// dist/assets/index.esm-BHIzbUI1.js      23.27 kB │ gzip:   8.79 kB
// dist/assets/helpers-Bi5bTQUP.js        23.89 kB │ gzip:   7.23 kB
// dist/assets/MoreVert-DY_mMXcE.js      131.87 kB │ gzip:  45.12 kB
// dist/assets/Dashboard-CXMDM3YR.js     353.94 kB │ gzip: 106.46 kB
// dist/assets/index-3NETQRPl.js         445.08 kB │ gzip: 131.34 kB

// Wihtout lazy loading
// ✓ 1523 modules transformed.
// dist/index.html                     0.46 kB │ gzip:   0.29 kB
// dist/assets/index-DgF7gAb1.css     20.86 kB │ gzip:   4.60 kB
// dist/assets/index-DmYON5we.js   1,008.32 kB │ gzip: 305.29 kB

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="apartments" element={<Apartments />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
