import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

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

// Import pages
import FEPROBAProgrammes from "./pages/FEPROBAProgrammes";
import ISLSeminaire from "./pages/ISLSeminaire";
import MinistryDetail from "./pages/MinistryDetail";
import AdminPanel from "./pages/AdminPanel";
import VirtualTour from "./pages/VirtualTour";
import Leadership from "./pages/Leadership";
import MemberPortal from "./pages/MemberPortal";
import Donations from "./pages/Donations";
import AdminDashboard from "./pages/AdminDashboard";

const HomePage = () => (
  <>
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
  </>
);

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feproba-programmes" element={<FEPROBAProgrammes />} />
            <Route path="/isl-seminaire" element={<ISLSeminaire />} />
            <Route path="/ministere/:id" element={<MinistryDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/visite-virtuelle" element={<VirtualTour />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portail-membre" element={<MemberPortal />} />
            <Route path="/dons" element={<Donations />} />
            <Route path="/dons/succes" element={<Donations />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;