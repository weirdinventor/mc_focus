/* eslint-disable @typescript-eslint/no-explicit-any */

// Interface for a navigation route
interface NavigationRoute {
  name: string;
  params?: Record<string, any>;
}

// Interface for navigation options
interface NavigationOptions {
  replace?: boolean;
  // The 'reset' option is less meaningful on the web in the same way as native,
  // but we keep the interface consistent. It will behave like 'replace'.
  reset?: boolean;
}

class NavigationAdapter {
  private static instance: NavigationAdapter;
  // This will hold the router instance from your web framework (e.g., Next.js, React Router)
  private webRouter: any = null; 

  private constructor() {
    // Singleton pattern: private constructor
  }

  public static getInstance(): NavigationAdapter {
    if (!NavigationAdapter.instance) {
      NavigationAdapter.instance = new NavigationAdapter();
    }
    return NavigationAdapter.instance;
  }

  // Initialisation for the web router
  public setWebRouter(router: any) {
    this.webRouter = router;
  }

  // Universal navigation method, now simplified for web
  public navigate(route: NavigationRoute, options?: NavigationOptions) {
    if (!this.webRouter) {
      console.warn('Web router has not been initialized. Call setWebRouter().');
      return;
    }

    // Build the URL path with query parameters
    let path = `/${route.name}`;
    if (route.params) {
      const searchParams = new URLSearchParams();
      Object.entries(route.params).forEach(([key, value]) => {
        // Ensure values are strings for the URL
        searchParams.append(key, String(value));
      });
      path += `?${searchParams.toString()}`;
    }

    // Handle navigation options
    if (options?.replace || options?.reset) {
      this.webRouter.replace(path);
    } else {
      this.webRouter.push(path);
    }
  }

  // Go back to the previous page
  public goBack() {
    if (this.webRouter) {
      // Use the router's back method if available
      this.webRouter.back();
    } else if (typeof window !== 'undefined') {
      // Fallback to the browser's history API
      window.history.back();
    }
  }

  // Get the current route's path name
  public getCurrentRoute(): string | null {
    if (typeof window !== 'undefined') {
      // Return the path, removing the leading '/'
      return window.location.pathname.slice(1);
    }
    return null;
  }

  // Get the query parameters from the current URL
  public getCurrentParams(): Record<string, any> {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const params: Record<string, any> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    }
    return {};
  }

  // Reset navigation stack (for web, this replaces the current history entry)
  public reset(routes: NavigationRoute[]) {
    // On the web, resetting the stack means navigating to the first route
    // and replacing the current state in history.
    if (routes.length > 0) {
      this.navigate(routes[0], { replace: true });
    }
  }
}

export default NavigationAdapter;
 