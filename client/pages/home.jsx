import React from 'react';
import Header from './header';
import Footer from './footer';
import FetchData from './fetch-data';
export default function Home(props) {
  return (
    <>
    <Header />
    <FetchData />
    <Footer />
    </>
  );
}
