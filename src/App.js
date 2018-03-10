import React, { Component } from 'react';
import './App.css';
//Hacker news Path variables
const DEFAULT_QUERY = '';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PATH_SEARCH_TAGS = 'tags='
const PATH_SEARCH_LENGTH = 'length='
const PATH_SEARCH_OFFSET = 'offset='
const PARAM_TAGS='front_page'
const PARAM_LENGTH='5'
const PARAM_OFFSET='0'
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//Tech Chrunch path variables
//Use NewsApi client library for this 
const TC_KEY=process.env.REACT_APP_TC_API_KEY

//TODO: Add attribution link for TechCrunch api NewsAPI.org

//Reddit Api configuration
const REDDIT_CLIENT_ID = process.env.REACT_APP_REDDIT_CLIENT_ID
const REDDIT_SECRET = process.env.REACT_APP_REDDIT_SECRECT
const REDDIT_USER = process.env.REACT_APP_REDDIT_USER
const REDDIT_PW = process.env.REACT_APP_REDDIT_PW


class App extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
			results: null,
			HNresults: null,
			query: DEFAULT_QUERY,
			searchKey: '',
 		};
		this.setHNTopstories = this.setHNTopstories.bind(this);
		this.fetchHNTopstories = this.fetchHNTopstories.bind(this);
		this.setHNTopstoriesTwo = this.setHNTopstoriesTwo.bind(this);
 	}

	fetchHNTopstories(query, page) {
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PATH_SEARCH_TAGS}${PARAM_TAGS}&${PATH_SEARCH_LENGTH}${PARAM_LENGTH}&${PATH_SEARCH_OFFSET}${PARAM_OFFSET}`)
		.then(response => response.json())
		.then(result => this.setHNTopstoriesTwo(result))

		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
		.then(response => response.json())
		.then(result => this.setHNTopstories(result));
	}

	fetchRedditTopStories(){
		const snoowrap = require('snoowrap')
		const otherRequester = new snoowrap({
			userAgent: 'News Ag page',
			clientId: `${REDDIT_CLIENT_ID}`,
			clientSecret: `${REDDIT_SECRET}`,
			username: `${REDDIT_USER}`,
			password: `${REDDIT_PW}`
		})
	}

	fetchTechCrunchTopStories(){

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

 	setHNTopstoriesTwo(result) {
		const { hits } = result
		const { searchKey } = this.state
		const hitsArr = [...hits]
		this.setState({
			HNresults: { ...this.state.results, [searchKey]: {hits: hitsArr}}
		})
 	}

	setRedditTopStories(result){

	}

	setTechCrunchTopStories(result){

	}

	componentDidMount() {
		const { query } = this.state;
		this.setState({ searchKey: query });
		this.fetchHNTopstories(query, DEFAULT_PAGE);
	}

	render() {
		const { query, results, searchKey, HNresults } = this.state;
 		const HNlist = (results && results[searchKey] && results[searchKey].hits) || [];
		const HNlist_two = ( HNresults && HNresults[searchKey] && HNresults[searchKey].hits) || [];
		console.log(HNlist_two)
 		return (
 			<div className="page">
				<Table list={HNlist_two} />
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
