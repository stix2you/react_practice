export const LoginView = () => {     // create the login form with submit button
    return (
        <form>
            <label>
                Username:
                <input type="text" />
            </label>
            <label>
                Password:
                <input type="password" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};