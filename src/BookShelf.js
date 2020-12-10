import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";
import {update} from "./BooksAPI";

/**
 * Bookshelf component that maps books array to book component
 */
class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        updatePage: PropTypes.func.isRequired,
    }

    /**
     * Update the bookshelf for a book incl. call to the udacity API
     * @param bookID
     * @param shelf
     */
    updateBookShelf = (bookID, shelf) => {
        /* get the array index of the book we want to update */
        const bookIndex = this.props.books.findIndex((book => book.id === bookID));
        /* now update the book's shelf in the array */
        this.props.books[bookIndex].shelf = shelf;
        /* Update the data on the remote server with the API */
        update(this.props.books[bookIndex], shelf).then(r => {
            console.log('Request to API sent...' + shelf)
            console.log(r)
        })
        /* rerender the page */
        this.props.updatePage();
        //this.forceUpdate();
    }

    /**
     * Render the bookshelf component
     * @returns {JSX.Element}
     */
    render() {
        console.log(this.props.books)
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} updateBookShelf={this.updateBookShelf}/>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;