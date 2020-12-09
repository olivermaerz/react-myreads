import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
    }

    updateShelf = (newShelf) => {
        newShelf.shelf = newShelf.shelf
    }

    render() {
        console.log('Props', this.props)
        return (
            <ol className="books-grid">
            {this.props.books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover"
                                 style={{backgroundImage: 'url("'+book.imageLinks.thumbnail+'")'}}
                            />
                            <div className="book-shelf-changer">
                                <select
                                    value={book.shelf}
                                    onChange={this.updateShelf}
                                >
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                            {/* Join authors and separate with a comma */}
                            {(book.authors !== undefined) && (book.authors.length > 0) ? (
                                (book.authors.map((author, i) => <span key={i}>
                                {i > 0 && ", "}
                                {author}
                            </span>))
                                ) : (
                                <span>No Author</span>
                            ) }
                        </div>

                    </div>
                </li>
            ))}
            </ol>
        )
    }
}

export default Book;