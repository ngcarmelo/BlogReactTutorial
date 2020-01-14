import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';

class CreateArticle extends Component {

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
      //  this.validator = new SimpleReactValidator();
        this.validator = new SimpleReactValidator({
            messages: {
              required: 'This field is required'                           
            },
          })
    }
    /* we execute  this funcion when something change in that element, input  */
    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });
          //console.log(this.state);
          //Show validate messages
          this.validator.showMessages();
          this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();
        //Fill form with state
        this.changeState();
        //if it is  all Valid 'Validator' we make the http request
        if (this.validator.allValid()) {
            //Make a http request by POST to save the article
            axios.post(this.url + 'save', this.state.article)
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
                                /* sweet alert */
                                swal(
                                    'Aticle created',
                                    'Article has been created successfully',
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
        if (this.state.status == 'success') {
            return (<Redirect to="/blog"></Redirect>);
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Create Article</h1>
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />
                            {/* 3 params:, name field, where we get the value field, validation */}
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Image</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Save" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        );
    }

}

export default CreateArticle;