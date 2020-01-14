import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';


class Search extends Component {

    state = {
        articles: {},
        status: null
    };

    render() {
        /* Get params from url, in this case param search */
        var searched = this.props.match.params.search;

        return (
            <div id="search">
                <Slider title={'Search: ' + searched} size="slider-small" />
                <div className="center">
                    <div id="content">
                        {/* Articles list from articles component */}
                        <Articles search={searched} />
                    </div>
                    <Sidebar blog="true" />
                </div>
            </div>
        );
    }
}
export default Search;