import React, { Component } from 'react';
import './App.css';
//Hacker news Path variables
const DEFAULT_QUERY = '';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//Tech Chrunch path variables
//Use NewsApi client library for this 
const TC_KEY=process.env.REACT_APP_TC_API_KEY

//TODO: Add attribution link for TechCrunch api NewsAPI.org

//Reddit Api configuration
const redditClientId = process.env.REACT_APP_REDDIT_CLIENT_ID
const redditSecret = process.env.REACT_APP_REDDIT_SECRECT
const redditUser = process.env.REACT_APP_REDDIT_USER
const redditPw = process.env.REACT_APP_REDDIT_PW

console.log(redditClientId)
console.log(redditSecret)
console.log(redditUser)
console.log(redditPw)
const snoowrap = require('snoowrap')
const otherRequester = new snoowrap({
	userAgent: 'News Ag page',
	clientId: redditClientId,
	clientSecret: redditSecret,
	username: redditUser,
	password: redditPw
})

class App extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
			results: null,
			query: DEFAULT_QUERY,
			searchKey: '',
 		};
		this.setHNTopstories = this.setHNTopstories.bind(this);
		this.fetchHNTopstories = this.fetchHNTopstories.bind(this);
 	}

 	setHNTopstories(result) {
		const { hits, page } = result;
		const { searchKey } = this.state;
		const oldHits = page === 0 ? [] : this.state.results[searchKey].hits;
		const updatedHits = [ ...oldHits, ...hits ];
		this.setState({
			results: { ...this.state.results, [searchKey]: { hits: updatedHits, page }}
		});
 	}

	fetchHNTopstories(query, page) {
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
		.then(response => response.json())
		.then(result => this.setHNTopstories(result));
	}

	componentDidMount() {
		const { query } = this.state;
		this.setState({ searchKey: query });
		this.fetchHNTopstories(query, DEFAULT_PAGE);
	}

	render() {
		const { query, results, searchKey } = this.state;
 		const page = (results && results[searchKey] && results[searchKey].page) || 0;
 		const list = (results && results[searchKey] && results[searchKey].hits) || [];
 		return (
 			<div className="page">
				<Table list={list} />
 			</div>
 		);
 	}
}

const Table = ({ list }) =>
 	<div className="table">
		{ list.map((item) =>
			<div key={item.objectID} className="table-row">
				<span style={{ width: '40%' }}>
          			<a href={item.url}>{item.title}</a>
        		</span>
 				<span style={{ width: '30%' }}>
  					{item.author}
				</span>
				<span style={{ width: '15%' }}>
  					{item.num_comments}
				</span>
				<span style={{ width: '15%' }}>
					{item.points}
				</span>
 			</div>
 		)}    
 	</div>

export default App;
