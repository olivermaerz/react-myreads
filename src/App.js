import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from "./BookSearch";
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
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

        const {query, bookSearchResult, showSearchPage} = this.state;

        return (
            <div className="app">
                {showSearchPage ? (
                    <Route path='/search' render={(
                    <div className="search-books">
                        <div className="search-books-bar">
                            <button className="close-search"
                                    onClick={() => this.setState({showSearchPage: false})}>Close
                            </button>
                            <div className="search-books-input-wrapper">
                                <input
                                    type="text"
                                    className='search-books'
                                    placeholder="Search by title or author"
                                    value={query}
                                    onChange={(event) => this.updateQuery(event.target.value)}
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
                                    <li>No results. Please enter a search term above.</li>
                                </ol>
                            )}
                        </div>
                    </div>
                    )}/>
                ) : (
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
                            <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp;
