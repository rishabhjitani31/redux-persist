import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";

const CreateForm = lazy(() => import("./pages/MainForm"));

function App() {
  return (
    <div className="App">
      <main className="main-page">
        <Router>
          <Suspense fallback={<div>...Loading</div>}>
            <Switch>
              <Route path="/" exact component={CreateForm} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </div>
  );
}

export default App;
