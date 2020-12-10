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
    }

    /**
     * Define the state
     * @type {{books: []}
     */
    state = {
        books: [],
    }

    /**
     * Update the state after the component has mounted initially
     */
    componentDidMount() {
        this.setState({
            books: this.props.books,
        })
    }

    /**
     * Once the component has been updates check if props have change and set the books state.
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.books !== this.props.books) {
            /* props have changed -> update state */
            this.setState({books: this.props.books})
        }
    }

    /**
     * Update the bookshelf for a book incl. call to the udacity API
     * @param bookID
     * @param shelf
     */
    updateBookShelf = (bookID, shelf) => {
        /* get the array index of the book we want to update */
        const bookIndex = this.state.books.findIndex((book => book.id === bookID));

        /* now update the book's shelf in the array */
        const newBooks = this.state.books.slice();
        newBooks[bookIndex].shelf = shelf;
        this.setState(previousState => ({
            books: newBooks,
        }))

        /* Update the data on the remote server with the API */
        update(this.state.books[bookIndex], shelf).then(r => {
            //console.log(r)
        })
        /* trigger an update of the page via parent - if function has been passed */
        if (typeof this.props.updatePage === "function") {
            this.props.updatePage();
        }
    }

    /**
     * Render the bookshelf component
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.state.books.map((book) => (
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