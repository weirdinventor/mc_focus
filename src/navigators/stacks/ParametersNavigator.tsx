// --- React & Library Imports ---
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// --- Route Definitions ---
import { ParametersStackRoutes } from '../routes';

// --- Screen & Component Imports (ensure paths are correct) ---
import { ParametersHeader } from '../../modules/profile/components/ParametersHeader';
import { ParametersScreen } from '../../modules/profile/screens/ParametersScreen';
import { ManageSubscriptionScreen } from '../../modules/profile/screens/ManageSubscriptionScreen';

// --- REMOVED NATIVE & UNUSED IMPORTS ---
/*
- createNativeStackNavigator, NativeStackScreenProps: Replaced by react-router-dom.
- navigatorConfig: Web styling is handled directly in components or with CSS.
- CompositeScreenProps, RootStackParamList, etc.: All complex prop types are no longer needed.
*/


// --- Layout Component for Screens WITH a Header ---
/**
 * This component acts as a template for all screens in the parameters section.
 * It renders the shared `ParametersHeader` and then provides an `<Outlet />` as a placeholder
 * where the actual screen component will be rendered.
 *
 * NOTE: This assumes `ParametersHeader` has been refactored to be web-compatible
 * and no longer requires a `route` prop.
 */
const ParametersLayout = () => (
  <div>
    <ParametersHeader />
    <main>
      <Outlet />
    </main>
  </div>
);


/**
 * The main router for the Parameters section. It defines all possible routes
 * within `/parameters/*` and uses the shared layout.
 */
export function ParametersNavigator() {
  return (
    <Routes>
      {/* All routes nested inside this parent will be rendered within the ParametersLayout. */}
      <Route element={<ParametersLayout />}>
        {/* The `index` route corresponds to the empty path `''` from your original config. */}
        {/* It will render when the user is at the base path (e.g., /parameters). */}
        <Route
          index
          element={<ParametersScreen />}
        />
        
        {/* This route handles the path for the manage subscription screen. */}
        <Route
          path={ParametersStackRoutes.MANAGE_SUBSCRIPTION}
          element={<ManageSubscriptionScreen />}
        />
      </Route>
    </Routes>
  );
}