import React , {useState} from 'react';
import './header.css';
import Grid from "@material-ui/core/Grid";
import image1 from '../../assets/logo.svg';
import Button from '@material-ui/core/Button'; 
import Modal from '@material-ui/core/Modal';
import { Fragment } from 'react';
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const Header = function(props) {

    // State Handler Methods

    const [tabStatus, setTabStatus] = useState({
        login:false
    });

    const [userData, setUserData] = useState({
        firstName:'',
        lastName:'',
        phone:''
    });

    const loginHandler = function(){
        setTabStatus({login:true});
        console.log("In Login handler");
    }

    const closeLoginHandler = function(){
        setTabStatus({login:false});
    }

    const OnSignUpSubmitHandler = function(){
        console.log(userData);
        setUserData({firstName:'',
        lastName:'',
        phone:''})
    }

    const inputChangehandler = function(e){
        const currData = userData;
        currData[e.target.name] = e.target.value;
        console.log(currData);
        setUserData({...currData});
    }

    // End of State Handlers

    const {login, bookShow} = tabStatus;
    const {firstName, lastName, phone} = userData;

    return (
        <Fragment>
            <div className='header'>
                <img className='header-logo' src={image1} alt="logo"/>
                <Button className='header-btn' variant="contained" onClick={loginHandler}>Login</Button>
            </div>
            <div className="modalsection">
            <Modal open={login} onClose={closeLoginHandler}>
                {/* <AppBar position="static" color="default">
                    <Tabs value={login} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </AppBar> */}
                {/* <TabPanel value={login}> */}
                <FormControl className="form-control"> 
                    <TextField id="firstName" label="FirstName" type="text" onChange={inputChangehandler} value={firstName} name="firstName"></TextField>
                    <TextField id="lastName" label="LastName" type="text" onChange={inputChangehandler} value={lastName} name="lastName"></TextField>
                    <TextField id="phone" label="Phone" type="text" onChange={inputChangehandler} value={phone} name="phone"></TextField>
                    <Button variant="contained" onClick={OnSignUpSubmitHandler}>Register</Button>
                </FormControl>
                {/* </TabPanel> */}
            </Modal>
            </div>
        </Fragment>
    )
}

export default Header;

