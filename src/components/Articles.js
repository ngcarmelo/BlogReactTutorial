import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import ImageDefault from '../assets/images/default.png';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Link } from 'react-router-dom';

class Articles extends Component {
    url = Global.url;
    /*  var state for article entity */
    state = {
        articles: [],
        status: null
    };


    /* Before shows view load data from  api */
    /* we will show something different depending on the var that we receive 'home' or 'search' */
    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;
        if (home === 'true') {
            this.getLastArticles();
        } else if (search && search !== null !== undefined) {
            this.getArticlesbySearch(search);

        } else {
            this.getArticles();
        }

    }

    getArticles = () => {
        console.log('getArticles');

        // http request to get articles
        axios.get(this.url + "articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            });
    }
    /* We show the articles from Search */
    getArticlesbySearch = (searched) => {
        console.log('getArticlesbySearch');

        axios.get(this.url + "search/" + searched)
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            })
            .catch(err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            });
    }

    getLastArticles = () => {
        console.log('getArticles');

        axios.get(this.url + "articles/last")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            });
    }

    state = {
        articles: {},
        status: null
    };

    render() {
        if (this.state.articles.length >= 1) {
            //loop map and we save the result in "listArticles"
            var listArticles = this.state.articles.map((article, index) => {
                return (
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {article.image !== null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                            ) : (
                                    <img src={ImageDefault} alt="image default" />
                                )
                            }
                        </div>
                        <h2>{article.title}</h2>
                        <span className="date">
                            { /* article.date  */}
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id} >Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                );
            });
            return (
                /* We show listArticles on the view */
                <div id="articles">
                    {listArticles}
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">There are not articles</h2>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Loading....</h2>
                </div>
            );

        }
    }
}
export default Articles;