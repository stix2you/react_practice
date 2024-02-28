import PropTypes from "prop-types";    // import the PropTypes library from the prop-types package

export const BookCard = ({ book, onBookClick }) => {    // create a functional component called BookCard, which takes two props: book and onBookClick
    return (                           // returns a new piece of UI
        <div className="book-card"      // returns a new div with a class of "book-card
            onClick={() => {           // when the div is clicked, it will call onBookClick with the book as an argument
                onBookClick(book);     // onBookClick is a prop that's passed to the BookCard component
            }}
        >
            {book.title}
        </div>                // returns the title of the book
    );
};

// Here is where we define all the props constraints for the BookCard
BookCard.propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      author: PropTypes.string
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };