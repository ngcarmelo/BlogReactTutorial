import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
class Sidebar extends Component {

    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false
    };

    redirectToSearch = (e) =>{
        e.preventDefault();
        console.log('buscador!!!!!!!!!!!!!!!');
        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }

    render() {
        if(this.state.redirect){
            return(
                <Redirect to={'/redirect/'+this.state.search}/>
            );
        }
        return (
            <aside id="sidebar">
                {this.props.blog === "true" &&

                    <div id="nav-blog" className="sidebar-item">
                        <h3>You can do this</h3>
                        <Link to={'/blog/crear'} className="btn btn-success">Create an article</Link>
                    </div>
                }

                <div id="search" className="sidebar-item">
                    <h3>Search</h3>
                    <p>Find an article...</p>
                    <form onSubmit={this.redirectToSearch}>
                        <input type="text" name="search" ref={this.searchRef} />
                        <input type="submit" name="submit" value="Buscar" className="btn" />
                    </form>
                </div>
            </aside>


        );
    }


}

export default Sidebar;