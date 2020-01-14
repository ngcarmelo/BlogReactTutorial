import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import ImageDefault from '../assets/images/default.png';


//1. Collect Article id to edit from URL
//2. Create a method to get that object from API
//3. Fill the form with these data
//4. Update the Article Object with http request


class EditArticle extends Component {

    url = Global.url;

    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        //we get id from URL
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);

        //  this.validator = new SimpleReactValidator();
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'This field is required'             
            },
        })
    }


    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                });
            });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });
        console.log(this.state);
        //Show validate messages
        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();

        //Fill form with state
        this.changeState();
        //Validator
        if (this.validator.allValid()) {
            //Make a http request by POST to save the article
            axios.put(this.url + 'article/'+this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });
                        //Upload image
                        if (this.state.selectedFile !== null) {
                            //Get if from saved article
                            var articleId = this.state.article._id;

                            //Create form data and add the file
                            const formData = new FormData();

                            formData.append(
                                'file0', /* we have this name in the API*/
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            ///Http Request                      
                            axios.post(this.url + '/upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });

                            swal(
                                'Article  edited',
                                'Article has been edited successfully',
                                'success'
                            );
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                });
        } else {
            //Show validate messages
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (event) => {
        console.log(event);
        this.setState({
            selectedFile: event.target.files[0]
        });

    }

    render() {

        console.log(this.state.article);
        if (this.state.status == 'success') {
            return (<Redirect to="/blog"></Redirect>);
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Edit Article</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />
                                {/* 3 params:, name field, where we get the value field, validation */}
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Image</label>
                                <div className="image-wrap">
                                    {article.image !== null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                    ) : (
                                            <img src={ImageDefault} alt="image default" className="thumb" />
                                        )
                                    }
                                </div>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>
                            <div className="clearFix"></div>
                            <input type="submit" value="Save" className="btn btn-success" />
                        </form>
                    }

                    {!this.state.article.title &&
                        <h1 className="subheadaer"> Loading...</h1>
                    }

                </section>
                <Sidebar />
            </div>
        );
    }

}

export default EditArticle;