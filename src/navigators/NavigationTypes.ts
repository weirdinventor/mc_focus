import { BrowserRouter } from 'react-router-dom';
import { ComponentProps } from 'react';

/**
 * In react-router-dom, the <BrowserRouter> is the top-level container
 * that provides routing context to the application.
 *
 * This type alias allows a custom router component to accept any of the
 * standard props that <BrowserRouter> can accept (like `basename`, `window`, etc.),
 * making the custom component a flexible wrapper.
 *
 * Using a `type` alias is preferred over an empty interface that extends another type.
 */
export type BrowserRouterProps = Partial<ComponentProps<typeof BrowserRouter>>;