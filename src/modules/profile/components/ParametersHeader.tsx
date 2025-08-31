import React from 'react';
import { SmallHeader } from './../../../components/Headers/SmallHeader';
import { t } from './../../../i18n';
import { ParametersStackRoutes } from './../../../navigators/routes';


// --- New Imports for Web Conversion ---
import { useLocation } from 'react-router-dom';

// --- Types and Data (kept in the same file) ---

// Type defining all possible route names in this section
export type ParametersRouteName =
  (typeof ParametersStackRoutes)[keyof typeof ParametersStackRoutes];

// Type for the data structure
type ParametersHeaderData = {
  [K in ParametersRouteName]?: string; // The value is the i18n key
};

// The actual data object that maps route names to i18n keys
export const parametersHeaderData: ParametersHeaderData = {
  [ParametersStackRoutes.PARAMETERS]: 'parameters.main', // This key is an empty string: ''
  [ParametersStackRoutes.MANAGE_SUBSCRIPTION]: 'parameters.items.main.subscription', // This key is 'manage-subscription'
};

// --- REMOVED PROPS INTERFACE ---
// The component no longer needs to receive props.
// interface ParametersHeaderProps {
//   routeName: ParametersRouteName;
// }


// --- REFACTORED COMPONENT ---
// No longer accepts props in its function signature.
export const ParametersHeader = () => {
  // Get the current location object from the router.
  const location = useLocation();

  // Determine the current route name based on the URL's path.
  // We check if the path ends with the 'manage-subscription' slug.
  // If it doesn't, we know we are at the base parameters screen ('').
  const currentRouteName: ParametersRouteName = 
    location.pathname.endsWith(ParametersStackRoutes.MANAGE_SUBSCRIPTION)
      ? ParametersStackRoutes.MANAGE_SUBSCRIPTION
      : ParametersStackRoutes.PARAMETERS;

  // Look up the i18n key using the derived route name.
  const titleKey = parametersHeaderData[currentRouteName];

  // Render the SmallHeader with the dynamically found title.
  return (
    <SmallHeader withSearch={false} title={t(titleKey || 'common.unknown')} />
  );
};