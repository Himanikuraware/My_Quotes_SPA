import React, { Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AllQuotes from "./pages/AllQuotes";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";

// Lazy load the pages.
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/auth" exact>
              <AuthPage />
            </Route>
          )}
          <Route path="/profile" exact>
            {authCtx.isLoggedIn && <UserProfile />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            {authCtx.isLoggedIn && <NewQuote />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>

          {/* '*'  means except above routes all the routes*/}

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
