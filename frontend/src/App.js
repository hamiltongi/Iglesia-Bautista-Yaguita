import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Hero />
          <About />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;