import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Book from "./Book";

class BookSearch extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
    }

    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                        <Book
                            books={this.props.books}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearch;