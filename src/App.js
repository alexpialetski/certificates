import React from 'react';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.loadList = this.loadList.bind(this);
    // Bind book status to this component so that they can be passed down to children
    this.handleBookStatusUpdate = this.handleBookStatusUpdate.bind(this);
  }

  state = {
    // List of books on shelves
    // We use this to generate home page view and change search results' statuses
    bookList: [],
  }

  componentDidMount() {
    // Load the active shelves whenever component is mounted
    this.loadList();
  }

  loadList() {
    // query API for active shelves and add the books into state
    BooksAPI.getAll().then((books) => this.setState({ bookList: books }));
  }

  handleBookStatusUpdate(book, shelf) {
    // Function that gets passed down to children Components
    // Takes book and shelf it needs to go on and makes request to server
    // If request is successful it refreshes the book list in our application with the new data
    BooksAPI.update(book, shelf).then((res) => res && this.loadList()
  );
  }

  render() {
    return (
      <div className='app'>
        <h1>Hello Worlds</h1>
      </div>
    );
  }
}

export default BooksApp;
