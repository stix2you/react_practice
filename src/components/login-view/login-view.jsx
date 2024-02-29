import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {     // create the login form with submit button -- receiving onLoggedIn as a prop from MainView
    const [username, setUsername] = useState("");   // create a new piece of state called username, which is an empty string, and a function called setUsername to update it
    const [password, setPassword] = useState("");   // create a new piece of state called password, which is an empty string, and a function called setPassword to update it

    const handleSubmit = (event) => {
        event.preventDefault();   // prevent the default behavior of the form to reload page
        console.log("Button clicked");

        const data = {                  // this part needs to be different for myFlix API
            access: username,
            secret: password
        };

        fetch("https://openlibrary.org/account/login.json", {    // for myFlix API, the URL will be different
            method: "POST",                                 // for myFlix API, the method will be POST with headers: { "Content-Type": "application/json" }
            body: JSON.stringify(data)                      // same convert the data to a JSON string
        }).then((response) => {                             // will have to convert the response to JSON object first so we can extract the JWT sent by myFlix API
            if (response.ok) {                               // if data.user  ... 
                onLoggedIn(username);                       // will then pass user and token back to MainView so they can be used in subsequent requests
            } else {                                        // something like   onLoggedIn(data.user, data.token);     
                alert("login failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    );
};