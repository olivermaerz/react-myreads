import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Book from "./Book";

/**
 * Bookshelf component that maps books array to book component
 */
class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
    }
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
                                    <Book book={book} />
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