import React from "react";
import CategoryAside from "./CategoryAside";
import Carousel from "./Carousel";

const HomePage = () => {
    return (
        <div className="homepage-layout" style={{ display: "flex",marginTop:20,marginLeft:20,height:626 }}>
            {/* Aside: Category list */}
            <div style={{ flex: "1", maxWidth: "300px", marginRight: "20px" }}>
                <CategoryAside key={window.location.search}/>
            </div>

            {/* Main Content: Carousel */}
            <div style={{ flex: "3",marginRight:20 }}>
                <Carousel />
            </div>
        </div>
    );
};

export default HomePage;
