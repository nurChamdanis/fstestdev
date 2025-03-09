import React, { useState } from "react";
import {UpdateButton} from "../components/UpdateButton";  
import {AddUsers} from "../components/AddUsers"; 

const Home = () => {
    const [activePage, setActivePage] = useState<"fetch" | "insert" | null>(null);

    return (
        <div>
            <h1>Firebase with Next JS State Redux</h1>
            <div>
                <button onClick={() => setActivePage("fetch")}>Load Data</button>
                <button onClick={() => setActivePage("insert")}>Insert Data</button>
            </div>
            <div>
            {activePage === "fetch" && <UpdateButton />}
            {activePage === "insert" && <AddUsers />}
            </div>
        </div>
    );
};

export default Home;
