import React , {useState} from 'react';
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


const Login = function(){

    const [loginData, setLoginData] = useState({
        userName:"",
        loginPassword:""
    })
    
    const [errData,setErrData] = useState("");
    
    const loginInputhandler = function(e){
        const loginCurrData = loginData;
        if(e.target.value===""){
            setErrData("Required");
            loginCurrData[e.target.name] = e.target.value;
            setLoginData({...loginCurrData});
        }
        else{
            loginCurrData[e.target.name] = e.target.value;
            setLoginData({...loginCurrData});
            setErrData("");
        }
    }
    
    const OnLoginSubmitHandler = function(){
        console.log(loginData)
    }
    
    
    const {userName, loginPassword} = loginData;
    
    return (
    <Fragment>
        <Card variant="outlined" style={{alignContent:"center"}}>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="userName">User Name</InputLabel>
                    <Input name="userName" type="text" value={userName} onChange={loginInputhandler}></Input>
                    <FormHelperText className={userName}>
                        <span className="red" style={{color:"red"}}>{errData}</span>
                    </FormHelperText>
                </FormControl>

            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="loginPassword" type="password" value={loginPassword} onChange={loginInputhandler}></Input>
                    <FormHelperText className={loginPassword}>
                        <span className="red" style={{color:"red"}}>{errData}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent>
                <Button style={{maxWidth:"240px", minWidth:"240px"}}
                    variant="contained"
                    onClick={OnLoginSubmitHandler}
                    color="primary"
                >Login
                </Button>
                </CardContent>
        </Card>
    </Fragment>
    )
}

export default Login;