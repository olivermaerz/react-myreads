import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from "./BookSearch";
import {Link, Route} from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: [],
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



    render() {
        /* create three arrays with the books for each of the three bookshelves */
        const wantToRead = this.filterBooks('wantToRead');
        const read = this.filterBooks('read');
        const currentlyReading = this.filterBooks('currentlyReading');


        return (
            <div className="app">

                {/* Route for the search page  */}
                <Route path='/search' render={() => (
                    <BookSearch />
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
