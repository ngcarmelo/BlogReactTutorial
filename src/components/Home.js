import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {

    render() {
        var buttonString = "Our Blog";
        return (
            <div id="home">
                <Slider title="Enjoy the course" btn={buttonString} size="slider-big" />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Last Articles</h1>
                        <Articles home="true" />
                    </div>
                    <Sidebar />
                </div>

            </div>

        );
    }
}
export default Home;