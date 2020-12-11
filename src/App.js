import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from "./BookSearch";
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {update} from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        books: [],
        wantToRead: [],
        read: [],
        currentlyReading: [],
    }

    /**
     *  helper method to filter books based on bookshelf type (read, wantToRead ...)
     */
    filterBooks = (filter) => {
        return this.state.books.filter((book) => (
            book.shelf === filter
        ))
    }

    updateBookShelf = (book, shelf) => {
        /* get the array index of the book we want to update */
        const bookIndex = this.state.books.findIndex((previousBook => previousBook.id === book.id));
        const newBooks = this.state.books.slice();

        /* check if book exists already on one of the three shelves */
        if (bookIndex >= 0) {
            /* now update the book's shelf in the array */
            newBooks[bookIndex].shelf = shelf;
        } else {
            /* not on shelf ... add it  */
            book.shelf = shelf;
            newBooks.push(book);
        }

        this.setState({
            books: newBooks,
        }, () => {
            /* update the three shelves */
            this.updateBookStates()
        })

        /* Update the data on the remote server with the API */
        update(book, shelf).then(r => {
            //console.log(r)
        })
    }

    /**
     * Update the states of the arrays for wantToRead, read, currentlyReading
     */
    updateBookStates = () => {
        this.setState({
            wantToRead: this.filterBooks('wantToRead'),
            read: this.filterBooks('read'),
            currentlyReading: this.filterBooks('currentlyReading'),
        })
    }

    /**
     *  Once component has mounted get "all" books via API call
     */
    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({
                    books: books,
                });
                this.updateBookStates();
            })
    }


    /**
     * Render the app
     * @returns {JSX.Element}
     */
    render() {
        /* create three arrays with the books for each of the three bookshelves */
        //const wantToRead = this.filterBooks('wantToRead');
        //const read = this.filterBooks('read');
        //const currentlyReading = this.filterBooks('currentlyReading');

        return (
            <BrowserRouter>
                <div className="app">

                    {/* Route for the search page  */}
                    <Route path='/search' render={() => (
                        <BookSearch
                            booksOnShelf={this.state.books}
                            updateBookShelf={this.updateBookShelf}
                        />
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
                                        books={this.state.currentlyReading}
                                        title={'Currently Reading'}
                                        updateBookShelf={this.updateBookShelf}
                                    />
                                    <BookShelf
                                        books={this.state.wantToRead}
                                        title={'Want to Read'}
                                        updateBookShelf={this.updateBookShelf}

                                    />
                                    <BookShelf
                                        books={this.state.read}
                                        title={'Read'}
                                        updateBookShelf={this.updateBookShelf}
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
            </BrowserRouter>
        )
    }
}

export default BooksApp;
