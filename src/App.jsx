import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Indexx from "./components/Indexx";
import Signup from "./components/Signup";
import Loginn from "./components/Loginn";
import Layout from "./components/Layout";
import Dashboards from "./components/Dasboards";
import MyHabits from "./components/MyHabits";
import TrackProgress from "./components/TrackProgress";
import ChallengesGoals from "./components/ChallengesGoals";
import Community from "./components/Community";
import Notifications from "./components/Notifications";
import Rewards from "./components/Rewards";
import Settings from "./components/Settings";
import AddHabit from "./components/AddHabit";
import Journal from "./components/Journal";
import Goals from "./components/Goals"; // ✅ Import Goals Page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = localStorage.getItem("username") || "User"; // ✅ Get username dynamically

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} username={username} />

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Indexx />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Loginn />} />

          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboards />} />
            <Route path="my-habits" element={<MyHabits />} />
            <Route path="track-progress" element={<TrackProgress />} />
            <Route path="challenges-goals" element={<ChallengesGoals />} />
            <Route path="community" element={<Community />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="settings" element={<Settings />} />
            <Route path="add-habit" element={<AddHabit />} />
            <Route path="journal/" element={<Journal />} /> {/* ✅ Dynamic username */}
            <Route path="goals/" element={<Goals />} /> {/* ✅ Goals Route Added */}
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
