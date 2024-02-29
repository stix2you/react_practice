import { useState, useEffect } from "react";                   // import the useState and useEffect hooks from the react package
import { BookCard } from "../book-card/book-card";  // import the BookCard component from the book-card module
import { BookView } from "../book-view/book-view";  // import the BookView component from the book-view module 
import { LoginView } from "../login-view/login-view";  // import the LoginView component from the login-view module
import { PropTypes } from "prop-types";    // import the PropTypes library from the prop-types package
import '../../index.css'


export const MainView = () => {              // create a functional component called MainView
    const [books, setBooks] = useState([]);     // create a new piece of state called books, which is an empty array, and a function called setBooks to update it
    const [selectedBook, setSelectedBook] = useState(null);   // create a new piece of state called selectedBook, which is null, and a function called setSelectedBook to update it
    const [user, setUser] = useState(null);   // create a new piece of state called user, which is null, and a function called setUser to update it

    useEffect(() => {   // the purpose of this function is to fetch data from an API and update the books state with the data, 
        // useEffect is a hook that allows you to perform side effects in function components
        fetch("https://openlibrary.org/search.json?q=star+wars")
            .then((response) => response.json())
            .then((data) => {
                console.log("books from api:", data);
                const booksFromApi = data.docs.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
                        author: doc.author_name?.[0]
                    };
                });
                setBooks(booksFromApi);
            });
    }, []);

    if (!user) {
        return <LoginView onLoggedIn={(user) => setUser(user)}/>;   // if user is falsy, return a new LoginView component as a prop to login-view component
    }

    if (selectedBook) {                             // if selectedBook is truthy, return a new BookView component
        return (                                    // returns a new BookView component with the selectedBook as a prop
            <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />  // onBackClick is a prop that's passed to the BookView component
        );
    }

    if (books.length === 0) {                       // if the length of the books array is 0, return a message
        return <div><h2>The list is empty -- Attempting to load API ...</h2></div>;       // returns a message that says "The list is empty!"
    }

    return (                         // returns a new piece of UI
        <div className="book-list">
            {books.map((book) => (   // maps each element in the array to a new piece of UI, after execution will have <div>{book.title}</div> for each book in the array
                <BookCard            // returns a new BookCard component for each book in the array
                    key={book.id}    // key is a special attribute that's used by React to keep track of the elements in the array -- it should be unique for each element
                    book={book}      // book is a prop that's passed to the BookCard component
                    onBookClick={(newSelectedBook) => {       // onBookClick is a prop that's passed to the BookCard component
                        setSelectedBook(newSelectedBook);     // when the BookCard component calls onBookClick, it will call setSelectedBook with the newSelectedBook as an argument (newSelectedBook is the book that was clicked on
                    }} />
            ))}
        </div>
    );

};

// Here is where we define all the props constraints for the MainView
MainView.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,

    })),

    selectedBook: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,

    }))
};
