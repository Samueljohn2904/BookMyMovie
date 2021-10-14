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

const SignUp = function(){

    const [userData, setUserData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        contact:''
    });
    const [errData,setErrData] = useState("");

    const inputChangehandler = function(e){
        const currData = userData;
        if(e.target.value===""){
            setErrData("Required");
            currData[e.target.name] = e.target.value;
            setUserData({...currData});
        }
        else{
            currData[e.target.name] = e.target.value;
            setUserData({...currData});
            setErrData("");
        }
    }

    const OnSignUpSubmitHandler = function(){
        console.log(userData)
    }

    const {firstName, lastName, email, password, contact} = userData;

    return (
        <Card variant="outlined" style={{alignContent:"center"}}>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input name="firstName" type="text" value={firstName} onChange={inputChangehandler}></Input>
                    <FormHelperText className={firstName}>
                        <span className="red" style={{color:"red"}}>{errData}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input name="lastName" type="text" value={lastName} onChange={inputChangehandler}></Input>
                    <FormHelperText className={lastName}>
                        <span className="red" style={{color:"red"}}>{errData}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input name="email" type="text" value={email} onChange={inputChangehandler}></Input>
                    <FormHelperText className={email}>
                        <span className="red" style={{color:"red"}}>{errData}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" value={password} onChange={inputChangehandler}></Input>
                    <FormHelperText className={password}>
                        <span className="red" style={{color:"red"}}>{errData}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="contact">Contact No</InputLabel>
                    <Input name="contact" type="text" value={contact} onChange={inputChangehandler}></Input>
                    <FormHelperText className={contact}>
                        <span className="red" style={{color:"red"}}>{errData}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent>
            <Button style={{maxWidth:"240px", minWidth:"240px"}}
                variant="contained"
                onClick={OnSignUpSubmitHandler}
                color="primary"
            >Register
            </Button>
            </CardContent>
        </Card>
    )
}

export default SignUp;