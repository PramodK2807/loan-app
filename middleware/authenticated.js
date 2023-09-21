export default async function ({ store, route, redirect, req }) {
  if (process.client) {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const role = store.state.auth.role;

    const homeRoute = route.path === "/";
    const protectedRoute = route.path.match(/^\/protected\//);
    const userDb = route.path.match(/^\/user\//);
    const adminRoute = route.path.match(/^\/admin\//);

    if (!isAuthenticated && (protectedRoute || adminRoute || userDb)) {
      return redirect("/auth/login");
    }
  }
}
