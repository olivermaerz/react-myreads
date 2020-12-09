import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from "./BookSearch";
import {Link, Route} from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: [],
        query: '',
        bookSearchResult: [],
    }

    /* method to filter books based on bookshelf type (read, wantToRead ...) */
    filterBooks = (filter) => {
        return this.state.books.filter((book) => (
            book.shelf === filter
        ))
    }

    /* Once component has mounted get "all" books via API call */
    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))

        BooksAPI.search(query)
            .then((bookSearchResult) => {
                this.setState(() => ({
                    bookSearchResult
                }))
            })
    }

    render(messageA, messageB) {
        /* create three arrays with the books for each of the three bookshelves */
        const wantToRead = this.filterBooks('wantToRead');
        const read = this.filterBooks('read');
        const currentlyReading = this.filterBooks('currentlyReading');

        const {query, bookSearchResult} = this.state;

        return (
            <div className="app">

                {/* Route for the search page  */}
                <Route path='/search' render={() => (
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
                                    value={query}
                                    onChange={(event) =>
                                        this.updateQuery(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                            {(bookSearchResult !== undefined) &&
                            (bookSearchResult.length > 0) ? (
                                <BookSearch
                                    title='Search Results:'
                                    books={this.state.bookSearchResult}
                                />
                            ) : (
                                <ol className="books-grid">
                                    <li>No results.</li>
                                    <li>
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
                                    </li>
                                </ol>
                            )}
                        </div>

                    </div>
                )}/>

                {/* Route for the main page  */}
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    books={currentlyReading}
                                    title={'Currently Reading'}
                                />
                                <BookShelf
                                    books={wantToRead}
                                    title={'Want to Read'}
                                />
                                <BookShelf
                                    books={read}
                                    title={'Read'}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>
                                <button>Add a book</button>
                            </Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp;
