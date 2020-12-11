import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";

/**
 * Bookshelf component that maps books array to book component
 */
class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
    }

    /**
     * Define the state
     * @type {books: []}
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
        if (prevProps.books !== this.props.books) {
            /* props have changed -> update state */
            this.setState({books: this.props.books})
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
                                    <Book book={book} updateBookShelf={this.props.updateBookShelf}/>
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