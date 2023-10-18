import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/herosection/Herosection";
import Filter from "../../components/filter/Filter";
import Productcard from "../../components/productcard/Productcard";
import Testimonial from "../../components/Testmonial/Testmonial";
import { useDispatch, useSelector } from "react-redux";


function Home() {

  const cartitem = useSelector((state) => state.cart);
  console.log(cartitem);

  return (
    <Layout>
      <div></div>
      <HeroSection />
      <Filter />
      <Productcard />
      <Testimonial />
    </Layout>
  );
}

export default Home;
