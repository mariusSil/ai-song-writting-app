import React from 'react';
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility/supabaseClient";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";

// Components
import { Header } from "./components/header";

// Pages
// These will be properly implemented with TypeScript as we build them
const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;
const ForgotPassword = () => <div>Forgot Password Page</div>;
const SongList = () => <div>Song List</div>;
const SongCreate = () => <div>Song Create</div>;
const SongEdit = () => <div>Song Edit</div>;
const SongShow = () => <div>Song View</div>;
const Landing = () => <div>Landing Page</div>;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "songs",
                list: "/songs",
                create: "/songs/create",
                edit: "/songs/:id/edit",
                show: "/songs/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "silotech-songwriter",
            }}
          >
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                element={
                  <ThemedLayoutV2
                    Header={() => <Header sticky collapsed={false} setCollapsed={() => {}} />}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/songs">
                  <Route index element={<SongList />} />
                  <Route path="create" element={<SongCreate />} />
                  <Route path=":id">
                    <Route index element={<SongShow />} />
                    <Route path="edit" element={<SongEdit />} />
                  </Route>
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
