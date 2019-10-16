import React, { Component } from 'react';
import { getSearch } from './../../webAPI';
import { Link } from "react-router-dom";

const Suggestions = ({ results, handleReset }) => (
  results &&
  <ul className="search__result">
    {
      results.map(list => (
        <li key={list.id}>
          <Link to={`/posts/${list.id}`} onClick={handleReset}>{list.title}</Link>
        </li>
      ))
    }
  </ul>
)

class Search extends Component {
  state = {
    query: '',
    results: null
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      if (query.length === 0) {
        this.handleReset();
        return;
      }
      this.getInfo(query);
    }
  }

  getInfo = (query) => {
    getSearch(query)
      .then(({ data }) => {
        this.setState({
          results: data
        })
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleReset = () => {
    this.setState({
      query: '',
      results: null
    })
  }


  render() {
    const { query, results } = this.state;
    return (
      <form className="search">
        <div className="input">
          <input
            placeholder="Search"
            name='query'
            onChange={this.handleChange}
            autoComplete="off"
            value={query}
          />
        </div>
        <button className="submit">
          <span className="fas fa-search"></span>
        </button>
        <Suggestions results={results} handleReset={this.handleReset} />
      </form>
    )
  }
}


export default Search;
