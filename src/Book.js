import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Book component to display a single book in the bookshelf component
 */
class Book extends Component {
    /**
     * Define the props
     * @type {{updateBookShelf: (function(*, *, *, *, *, *): undefined)|*, book: (function(*, *, *, *, *, *): undefined)|*}}
     */
    static propTypes = {
        book: PropTypes.object.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
    }

    /**
     * Define the state
     * @type {{book: {}, shelf: string}}
     */
    state = {
        book: {},
        shelf: '',
    }

    /**
     * Once the component has been mounted set the book and shelf state
     */
    componentDidMount() {
        this.setState(() => ({
            book: this.props.book,
            shelf: this.props.book.shelf,
        }))
    }

    /**
     * Update the shelf by calling paremnt component
     * @param newShelf
     */
    updateShelf = (newShelf) => {
        /* call the function in the parent component (bookshelf component) */
        this.props.updateBookShelf(this.props.book.id, newShelf);
    }

    /**
     * Render the book component
     * @returns {JSX.Element}
     */
    render() {
        const {book} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    {(book.imageLinks !== undefined) && (book.imageLinks.thumbnail !== undefined) ? (
                        <div className="book-cover"
                             style={{backgroundImage: 'url("' + book.imageLinks.thumbnail + '")'}}
                        />
                    ) : (
                        /* No book thumbnail url found, display the title instead of image */
                        <div className="book-cover">
                            <div className="book-cover-title">
                                {book.title}
                            </div>
                        </div>
                    )}
                    <div className="book-shelf-changer">
                        {/* display select to move book to other shelf */}
                        <select
                            value={this.state.book.shelf}
                            onChange={(event) => this.updateShelf(event.target.value)}
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
                    {/* Join authors in string and separate them with commas */}
                    {(book.authors !== undefined) && (book.authors.length > 0) ? (
                        (book.authors.map((author, i) => <span key={i}>
                        {i > 0 && ", "}
                            {author}
                    </span>))
                    ) : (
                        <span>No Author</span>
                    )}
                </div>
            </div>
        )
    }
}

export default Book;