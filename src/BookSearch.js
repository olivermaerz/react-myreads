import React, {Component} from 'react';
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

/**
 * Component for book search (calls bookshelf component to display results)
 */
class BookSearch extends Component {
    static propTypes = {
        booksOnShelf: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
    }

    state = {
        query: '',
        bookSearchResult: [],
    }

    /**
     * As the API does not return the shelf a book is on for search we
     * need to map the shelf with the data from the books on the three
     * bookshelves
     */
    getShelves = () => {
        const {booksOnShelf} = this.props;
        const newBookResult = this.state.bookSearchResult.map((book) => {
            /* first find the index of the book we are mapping on the array of the books we have on the three shelves */
            const bookIndexOnShelf = booksOnShelf.findIndex((bookOnShelf) => bookOnShelf.id === book.id);
            /* now check if the book was found on our three shelves */
            if (bookIndexOnShelf >= 0) {
                /* book has been found -> update the shelf of the book from the search */
                book.shelf = booksOnShelf[bookIndexOnShelf].shelf;
            } else {
                /* book has not been found (book is not on one of the three shelves) -> set shelf to 'none' */
                book.shelf = 'none';
            }
            return book;
        })
        /* finally update the state */
        this.setState({
            bookSearchResult: newBookResult,
        })
    }


    /**
     * Call API and search for books on remote server
     */
    updateSearch = () => {
        if (this.state.query !== '') {
            BooksAPI.search(this.state.query)
                .then((apiResults) => {
                    this.setState({
                        bookSearchResult: apiResults,
                    })
                    /* Check if the search return 1 or more results ... */
                    if (apiResults.length > 0) {
                        /* ... and then lookup if any of those books are already on one of the threes shelf */
                        this.getShelves()
                    }
                })
        } else {
            this.setState({
                bookSearchResult: [],
            })
        }
    }

    /**
     * Update the search query
     * @param query
     */
    updateQuery = (query) => {
        this.setState({
                query: query
            },
            /* use a callback to wait for this.state.query to be mutated */
            this.updateSearch
        )
    }


    /**
     * render the search component
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            className='search-books'
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) =>
                                this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {(this.state.bookSearchResult !== undefined) &&
                    (this.state.bookSearchResult.length > 0) ? (
                        <BookShelf
                            title='Search Results:'
                            books={this.state.bookSearchResult}
                            updateBookShelf={this.props.updateBookShelf}
                        />
                    ) : (
                        <div>
                            {(this.state.query.length > 0) &&
                            /* No book found, display some message */
                            <div className='search-error-text'>
                                Sorry, no books found. Please try a different search.
                            </div>
                            }
                            {/* No query entered yet, or no books found, display possible search terms */}
                            <div className='search-help-text'>
                                <strong>Supported search terms are:</strong> 'Android', 'Art', 'Artificial
                                Intelligence',
                                'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief',
                                'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
                                'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing',
                                'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film',
                                'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer',
                                'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson',
                                'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
                                'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
                                'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire',
                                'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time',
                                'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default BookSearch;
