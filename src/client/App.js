import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/TestComponent/MealsList";

function App() {
  return (
    <Router>
      <div>
        {/* Define routes */}
        <Switch>
          <Route exact path="/">
            <p>test</p>
          </Route>
          <Route exact path="/lol">
            <p>lol</p>
          </Route>
          <Route exact path="/test-component">
            <TestComponent></TestComponent>
          </Route>
          {/* Route to render MealsList component */}
          <Route exact path="/meals">
            <MealsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
