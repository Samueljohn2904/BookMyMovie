import React , {useState, useContext} from 'react';
import './header.css';
import FormControl from "@material-ui/core/FormControl";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import {Tab} from "@material-ui/core";
import { InputLabel, Input, Typography} from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from '@material-ui/core/Button'; 
import { Fragment } from 'react';


const Login = function(props){

    // State variables to store login Data and Error data

    const [loginData, setLoginData] = useState({
        userName:"",
        loginPassword:""
    })
    const [errData,setErrData] = useState({
        erruserName:'',
        errloginPassword:""
    });

    // Function to handle the login inputs from user and if user fails to enter required details then 
    //Error Data state is updated to show error to the user
    
    const loginInputhandler = function(e){
        const currErrData = errData;
        const errorField = "err"+e.target.name;
        const currData = loginData;
        if(e.target.value===""){
            currErrData[errorField]= "Required";
            setErrData({...currErrData});
            currData[e.target.name] = e.target.value;
            setLoginData({...currData});
        }
        else{
            currData[e.target.name] = e.target.value;
            setLoginData({...currData});
            currErrData[errorField]="";
            setErrData({...currErrData});
        }
        console.log(errData)
    }

    // The data entered by the user is sent to server for authentication
    
    const OnLoginSubmitHandler = async function(e){
        e.preventDefault();
        const param = window.btoa(`${loginData.userName}:${loginData.loginPassword}`);
        try {
            const rawResponse = await fetch(`/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`
                }
            });
    
            const result = await rawResponse.json();
            if(rawResponse.ok) {
                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                setLoginData({
                    userName:"",
                    loginPassword:""
                })
                props.closeModalHandler();

            } else {
                const error = new Error();
                error.message = result.message || 'Login Failed';
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }
    
    
    const {userName, loginPassword} = loginData;
    
    return (
    <Fragment>
        <Card variant="outlined" style={{alignContent:"center", display:"flex", flexDirection:"column",alignItems:"center"}}>
            <CardContent style={{maxWidth:"240px", minWidth:"240px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="userName">User Name</InputLabel>
                    <Input name="userName" type="text" value={userName} onChange={loginInputhandler}></Input>
                    <FormHelperText className={userName}>
                        <Typography component="span" className="red" style={{color:"red"}}>{errData.erruserName}</Typography>
                    </FormHelperText>
                </FormControl>

            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="loginPassword" type="password" value={loginPassword} onChange={loginInputhandler}></Input>
                    <FormHelperText className={loginPassword}>
                        <Typography component="span" className="red" style={{color:"red"}}>{errData.errloginPassword}</Typography>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent>
                <Button style={{display:"flex", flexDirection:"row", justifyContent:"center"}}
                    variant="contained"
                    onClick={OnLoginSubmitHandler}
                    color="primary"
                >LOGIN
                </Button>
                </CardContent>
        </Card>
    </Fragment>
    )
}

export default Login;