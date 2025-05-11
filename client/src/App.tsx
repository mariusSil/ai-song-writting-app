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
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility/supabaseClient";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";

// Components
import { Header } from "./components/header";
// Import the new Landing page component
import Landing from "./pages/landing";

// Pages
// These will be properly implemented with TypeScript as we build them
const SongList = () => <div>Song List</div>;
const SongEdit = () => <div>Song Editor</div>;



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
                list: "songs",
                edit: "songs/:id",
                show: "songs/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "silotech-songwriter"
            }}
          >
            <Routes>
              <Route index element={<Landing />} />
              <Route
                path="*"
                element={
                  <ThemedLayoutV2
                    Header={() => <Header collapsed={false} setCollapsed={() => {}} />}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="songs">
                  <Route index element={<SongList />} />
                  <Route path=":id" element={<SongEdit />} />
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
