import React, { useState } from 'react';
import PropTypes from "prop-types";    // import the PropTypes library from the prop-types package

export const BookView = ({ book, onBackClick }) => {
    const [isLoading, setIsLoading] = useState(true); // Initialize state to track loading status

    return (
        <div className="book-list">
            <div className="book-detail">
                <div>
                    <div>
                        {isLoading && <div>Image Loading...</div>} {/* Display loading message if isLoading is true */}
                        <img
                            src={book.image}
                            alt={""}
                            onLoad={() => setIsLoading(false)} // Set isLoading to false when the image is loaded
                            style={{ display: isLoading ? 'none' : 'block' }} // Hide image while loading
                        />
                    </div>
                </div>
                <div>
                    <span>Title: </span>
                    <span>{book.title}</span>
                </div>
                <div>
                    <span>Author: </span>
                    <span>{book.author}</span>
                </div>
                <button onClick={onBackClick}>Back</button>
            </div>
        </div>
    );
};

// Here is where we define all the props constraints for the BookView
BookView.propTypes = {
    book: PropTypes.shape({            // book is a prop that's passed to the BookView component. It should be an object with the following shape
        title: PropTypes.string.isRequired,   // title is a string and is required
        image: PropTypes.string.isRequired,   // image is a string and is required
    }).isRequired,                          // book is required
    onBackClick: PropTypes.func.isRequired   // onBackClick is a function and is required
};
