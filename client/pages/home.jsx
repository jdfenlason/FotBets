import React from 'react';
import Header from './header';
import Footer from './footer';
import FetchData from './fetch-data';
export default function Home(props) {
  return (
    <>
<div className = "container">
<div className = "header">
    <Header />
</div>
<div className = "main">
    <FetchData />
</div>
<div className = "footer">

    <Footer />
</div>
</div>
</>
  );
}
