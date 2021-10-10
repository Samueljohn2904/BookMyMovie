import React from 'react';
import { Fragment } from 'react';
import Header from '../../common/header/Header';
import './home.css'

const Home = function() {
    return(
        <Fragment>
        <Header headerName="Home Page"/>
        <div className="heading">
            <span>Upcoming Movies</span>
        </div>
        </Fragment>
    )
}

export default Home;