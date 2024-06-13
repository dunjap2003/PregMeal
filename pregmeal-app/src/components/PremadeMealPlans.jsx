import React from "react";
import ExploreMealPlans from "./ExploreMealPlans";
import UserNavbar from "./UserNavbar";

const PremadeMealPlans = () => {
    return (
        <div className="flex flex-col">

            <UserNavbar />
            <h1 className="text-4xl font-bold mb-8 text-darkpink pl-4">Premade meal plans</h1>
            <ExploreMealPlans fetchUrl="http://localhost:8080/mealplans/premade" />
        </div>
    )
};

export default PremadeMealPlans;