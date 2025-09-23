import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import FEPROBA from "./components/FEPROBA";
import ISL from "./components/ISL";
import Ministries from "./components/Ministries";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <FEPROBA />
          <ISL />
          <Ministries />
          <Events />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;