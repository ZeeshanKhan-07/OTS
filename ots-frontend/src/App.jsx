import { useState } from 'react'
import './App.css'

import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    </>
  );
}