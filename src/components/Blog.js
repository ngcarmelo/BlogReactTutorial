import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {

    state = {
        articles: {},
        status: null
    };

    render() {
      var buttonString = "Our Blog";
        return (
            <div id="blog">
                <Slider title="Blog" size="slider-small" />
                <div className="center">
                    <div id="content">
                        {/* Articles list from articles component */}
                       <Articles/>
                    </div>
                    <Sidebar blog="true" />
                </div>
            </div>
        );
    }
}
export default Blog;