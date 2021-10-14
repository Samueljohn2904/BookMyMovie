import React , {useState} from 'react';
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



const Header = function(props) {

    // State Handler Methods

    const [tabStatus, setTabStatus] = useState({
        login:false
    });

    const [tabValue, setTabValue] = useState(1);

    const loginHandler = function(){
        setTabStatus({login:true});
        console.log("In Login handler");
    }

    const closeLoginHandler = function(){
        setTabStatus({login:false});
    }

    const handleTabChange = function(event, newValue){
        setTabValue(newValue)
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
                <Typography>{children}</Typography>
            )}
          </div>
        );
      }
      
    const ModalStyle = {
        display:"grid", 
        justifyContent:"center",
        verticalAlign:"middle", 
        alignContent:"center",
        maxWidth:"240px",
        minWidth:"240px"
    }

    const {login} = tabStatus;
  

    return (
        <Fragment>
            <div className='header'>
                <img className='header-logo' src={image1} alt="logo"/>
                <Button className='header-btn' variant="contained" onClick={loginHandler}>Login</Button>
            </div>
            <Modal open={login} onClose={closeLoginHandler} style={ModalStyle}>
                {/* <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Login"/>
                    <Tab label="Sign Up"/>
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <Login/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}> */}
                    <SignUp/>
                {/* </TabPanel> */}
            </Modal>
        </Fragment>
    )
}

export default Header;

