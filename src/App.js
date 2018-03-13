import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
//Hacker news Path variables
//TODO: Rename these variables so they focus on Hacker News
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PATH_SEARCH_TAGS = 'tags='
const PATH_SEARCH_LENGTH = 'length='
const PATH_SEARCH_OFFSET = 'offset='
const PARAM_TAGS='front_page'
const PARAM_LENGTH='10'
const PARAM_OFFSET='0'

//Tech Chrunch path variables
//Use NewsApi client library for this 
//TODO: Add attribution link for TechCrunch api NewsAPI.org
const TC_BASE_PATH="https://newsapi.org/v2/"
const TC_SEARCH_PARAMS="top-headlines?sources=techcrunch&apiKey="
const TC_KEY=process.env.REACT_APP_TC_API_KEY


//Reddit Api configuration
const REDDIT_CLIENT_ID = process.env.REACT_APP_REDDIT_CLIENT_ID
const REDDIT_SECRET = process.env.REACT_APP_REDDIT_SECRECT
const REDDIT_USER = process.env.REACT_APP_REDDIT_USER
const REDDIT_PW = process.env.REACT_APP_REDDIT_PW
const SUBREDDIT_LIST = 'askscience+coding+compsci+coolgithubprojects+linux+programming'

class App extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
			HNresults: null,
			HNresultsKey: '',
			TCresults:null,
			TCresultsKey: '',
			RedditResults: null,
			RedditResultsKey: ''
 		};
		this.setHNTopstories = this.setHNTopstories.bind(this);
		this.fetchHNTopstories = this.fetchHNTopstories.bind(this);
		this.fetchTechCrunchTopStories = this.fetchTechCrunchTopStories.bind(this);
		this.setTechCrunchTopStories = this.setTechCrunchTopStories.bind(this);
		this.fetchRedditTopStories = this.fetchRedditTopStories.bind(this);
		this.setSetRedditTopStories = this.setRedditTopStories.bind(this);
 	}

	fetchHNTopstories() {
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PATH_SEARCH_TAGS}${PARAM_TAGS}&${PATH_SEARCH_LENGTH}${PARAM_LENGTH}&${PATH_SEARCH_OFFSET}${PARAM_OFFSET}`)
		.then(response => response.json())
		.then(result => this.setHNTopstories(result))
	}

	fetchTechCrunchTopStories(){
		fetch(`${TC_BASE_PATH}${TC_SEARCH_PARAMS}${TC_KEY}`)
		.then(response => response.json())
		.then(result => this.setTechCrunchTopStories(result))
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
		otherRequester.getSubreddit(`${SUBREDDIT_LIST}`).getHot({limit: 10})
		.then(response => this.setRedditTopStories(response))
	}

 	setHNTopstories(result) {
		const { hits } = result
		const { HNresultsKey } = this.state
		const hitsArr = [...hits]
		this.setState({
			HNresults: { [HNresultsKey]: {hits: hitsArr}}
		})
 	}

	setRedditTopStories(result){
		this.setState({
			RedditResults: result
		})
	}

	setTechCrunchTopStories(result){
		const { articles } = result
		const { TCresultsKey } = this.state
		const articlesArr= [...articles]
		this.setState({
			TCresults: { [TCresultsKey]: {articles: articlesArr}}
		})
	}

	componentDidMount() {
		const { query } = this.state;
		this.setState({ searchKey: query });
		this.fetchHNTopstories();
		this.fetchTechCrunchTopStories();
		this.fetchRedditTopStories();
	}

	render() {
		const { HNresultsKey, HNresults, TCresults, TCresultsKey, RedditResults} = this.state;
		const HNlist = ( HNresults && HNresults[HNresultsKey] && HNresults[HNresultsKey].hits) || [];
		const TClist = ( TCresults && TCresults[TCresultsKey] && TCresults[TCresultsKey].articles) || [];
		const RedditList = ( RedditResults ) || [];
 		return (
			<Grid>
				<Row>
					<Col md={4} mdOffset={4}>
						<PageHeader>Take a Break</PageHeader>
					</Col>
				</Row>
					<Col md={4}>
						<HNTable list={HNlist} />
					</Col>
					<Col md={4}>
						<TCTable list={TClist} />
					</Col>
					<Col md={4}>
						<RedditTable list={RedditList} />
					</Col>
				<Row>
					<Col md={4} mdOffset={4}>
						<p>Link to github project here</p>
					</Col>
				</Row>
			</Grid>
 		);
 	}
}

const HNTable = ({ list }) =>
 	<div className="table">
		{ list.map((item) =>
			<div key={item.objectID} className="table-row">
          			<div><a href={item.url}>{item.title}</a></div>
  					<div>
						<p> Author: {item.author} </p>
						<p> {item.num_comments} <a href={"https://news.ycombinator.com/item?id=" + item.objectID}>Comments</a></p>
					</div>
 			</div>
 		)}    
 	</div>

const TCTable = ({ list }) =>
 	<div className="table">
		{ list.map((item) =>
			<div key={item.publishedAt} className="table-row">
          			<div><a href={item.url}>{item.title}</a></div>
  					<div>
						<p> Author: {item.author} </p>
						<p> {item.description} </p>
					</div>
 			</div>
 		)}    
 	</div>

const RedditTable = ({ list }) =>
 	<div className="table">
		{ list.map((item) =>
			<div key={item.created} className="table-row">
          			<div><a href={item.url}>{item.title}</a></div>
  					<div>
						<p>{item.num_comments} <a href={"https://www.reddit.com" + item.permalink}>Comments</a></p>
					</div>
 			</div>
 		)}    
 	</div>

export default App;
