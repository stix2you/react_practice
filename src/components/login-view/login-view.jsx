import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {     // create the login form with submit button -- receiving onLoggedIn as a prop from MainView
    const [username, setUsername] = useState("");   // create a new piece of state called username, which is an empty string, and a function called setUsername to update it
    const [password, setPassword] = useState("");   // create a new piece of state called password, which is an empty string, and a function called setPassword to update it

    const handleSubmit = (event) => {
        event.preventDefault();   // prevent the default behavior of the form to reload page
        console.log("Button clicked");

        const data = {
            access: username,
            secret: password
        };

        fetch("https://openlibrary.org/account/login.json", {    // make a fetch request to the login endpoint
            method: "POST",                                 // make a POST request
            body: JSON.stringify(data)                      // convert the data to a JSON string
        }).then((response) => {
            if (response.ok) {
                onLoggedIn(username);
            } else {
                alert("login failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
            <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <button type="submit">Submit</button>
        </form>
    );
};