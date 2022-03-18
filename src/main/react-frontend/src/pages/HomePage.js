// Import Dependencies
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

// Import Components
import ItemList from "../components/items/ItemList";

// Import Styling
import style from "../assets/styles/Layout.module.css";

export default function HomePage() {
    const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
    var [datajson, setDataJson] = useState([]); // used to store data TODO rename var

    const token = useContext(UserContext).contextData.token;

    // function that will be called when the page loads purpose is to handle and process the axios get request
    async function gatherData() {


        return await axios
            .get(FETCH_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }) // preform get request
            .then((res) => {
                return res.data; // return response
            })
            .catch((err) => console.error(err));
    }

    // runs the gatherdata function when the page loads
    useEffect(() => {
        gatherData().then((data) => {
            setDataJson(data || "no data returned"); // store returned data in a variable
        });
    }, []);

    console.log(datajson);

    if (datajson === "no data returned") {
        return (
            <section>
                {/*TODO implement navigation on front end please*/}
                <Link to="/admin/manageItems">Try Manage Items Page</Link>
                <p>{datajson}</p>
            </section>
        );
    } else {
        return (
            <div className={style.homepage}>
                <h1>Homepage</h1>
                <ItemList items={datajson} target="regularList" />
            </div>
        );
    }
}
