import React , {useState, useEffect, useContext} from 'react';
import './header.css';
import Grid from "@material-ui/core/Grid";
import image1 from '../../assets/logo.svg';
import Button from '@material-ui/core/Button'; 
import Modal from '@material-ui/core/Modal';
import { Fragment } from 'react';
import Tabs from "@material-ui/core/Tabs";
import {Tab} from "@material-ui/core";
import { InputLabel, Input, Typography} from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import { Link } from 'react-router-dom';
import LoginStatusContext from './LoginStatusContext';


const Header = function(properties) {

    // State Handler Methods

    const myContext = useContext(LoginStatusContext);

    const [tabStatus, setTabStatus] = useState({
        login:false,
    });

    const [tabValue, setTabValue] = useState(0);

    const loginHandler = function(){
        setTabStatus({login:true});
    }

    const closeLoginHandler = function(){
        setTabStatus({login:false});
    }

    const handleTabChange = function(event, newValue){
        setTabValue(newValue)
    }

    const logoutHandler = async function(){
        const bearerToken = window.sessionStorage.getItem('access-token');
        try {
            const rawResponse = await fetch(`/api/v1/auth/logout`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Bearer ${bearerToken}`
                }
            });
    
            if(rawResponse.ok) {
                window.sessionStorage.removeItem('user-details');
                window.sessionStorage.removeItem('access-token');
                myContext.setIsUserLoggedIn('false');
            } else {
                const error = new Error(); 
                error.message = 'Logout Failed';
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }

    // End of State Handlers

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
          >
            {value === index && (
                <div>{children}</div>
            )}
          </div>
        );
      }
      
    const ModalStyle = {
        display:"grid", 
        justifyContent:"center",
        verticalAlign:"middle", 
        alignContent:"center",
    }

    const {login} = tabStatus;
  

    return (
        <Fragment>
            <div className='header'>
                <img className='header-logo' src={image1} alt="logo"/>
                {myContext.isUserLoggedIn==='false' && <Button className='header-btn-1' variant="contained" onClick={loginHandler} style={{marginLeft:"8px"}}>LOGIN</Button>}
                {myContext.isUserLoggedIn==='true' && <Button className='header-btn-1' variant="contained" onClick={logoutHandler} style={{marginLeft:"8px"}}>LOGOUT</Button>}
                {myContext.isUserLoggedIn=='true' && <Link className="header-btn-2-link" to={`/bookshow/${properties.movieId}`}>
                {properties.showBook==='true' && <Button className='header-btn-2' variant="contained" color='primary'>BOOK SHOW</Button>}
                </Link>}
                {myContext.isUserLoggedIn=='false' && properties.showBook==='true' && <Button className='header-btn-2' variant="contained" color='primary' onClick={loginHandler}>BOOK SHOW</Button>}
            </div>
            {myContext.isUserLoggedIn==='false' && <Modal open={login} onClose={closeLoginHandler} style={ModalStyle}>
                <div className="Login-modal">
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="LOGIN"/>
                        <Tab label="REGISTER"/>
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                        <Login baseUrl={properties.baseUrl} closeModalHandler={closeLoginHandler}/>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <SignUp baseUrl={properties.baseUrl} closeModalHandler={closeLoginHandler}/>
                    </TabPanel>
                </div>
            </Modal>}
        </Fragment>
    )
}

export default Header;

