import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';
import ImageDefault from '../assets/images/default.png';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class Article extends Component {
    url = Global.url;
     /*  var state for article entity */
    state = {
        article: false,
        status: null
    };

    componentWillMount() {
        this.getArticle();
    }
    //Get article id from url and http request
    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + '/article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });

            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    deleteArticle = (id) => {
        axios.delete(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: false,
                    status: 'deleted'
                });
            });
            { /* sweet alert  */}
        swal(
            'Article delete',
            'Article has been deleted successfully',
            'success'
        );
    }

    render() {
        //if  status is deleted, we make a redirect
        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }
        var article = this.state.article
        return (
            <div className="center">
                <section id="content">
                    { /* if there is  article*/}
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                        <img src={ImageDefault} alt="image default" />
                                    )
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id);
                                }
                            } className="btn btn-danger">Delete</button>
                            <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Edit</Link>

                            <div className="clearfix"></div>
                        </article>
                    }
                    { /* if there is not  article*/}
                    {!this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">
                                Article does not exist
                            </h2>
                            <p>Try it later...</p>
                        </div>

                    }
                    { /* if  status is null */}
                    {!this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">
                                Loading....
                            </h2>
                            <p>Wait a few seconds.</p>
                        </div>
                    }
                </section>
                <Sidebar />
            </div>
        );
    }
}

export default Article;