import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      term:''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }
  //if we have a search field we only need to pass the value once we press search button otherwise API gets call every time we type something (no need dynamic search)
  handleSearchClick(){
    this.props.onSearch(this.state.term)
  }
  handleSearch(event) {
    this.setState({term: event.target.value})
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleSearch}
        />
        <button onClick={this.handleSearchClick} className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

export default SearchBar