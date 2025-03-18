import React, { useEffect } from 'react';
import BestSellers from '../components/BestSellers';
import CompanyServices from '../components/CompanyServices';
import ProductCategories from '../components/ProductCategories';
import FlashSale from '../components/FlashSale';
import BannerCarousel from '../components/BannerCarousel';
import CartAsolute from '../components/CartAsolute';
import axios from 'axios';
function Home() {
   
    return (
        <div>
            <BannerCarousel/>
            <BestSellers />
            <CompanyServices />
            {/* <ProductCategories /> */}
            <FlashSale />
            {/* <CartAsolute /> */}
        </div>
    );
}

export default Home;
