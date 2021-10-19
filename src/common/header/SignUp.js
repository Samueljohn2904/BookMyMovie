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
        email_address:'',
        first_name:'',
        last_name:'',
        mobile_number:'',
        password:''
    });
    const [errData,setErrData] = useState({
        errfirst_name:'',
        errlast_name:'',
        erremail_address:'',
        errpassword:'',
        errmobile_number:''
    });
    const [successMessage, setSuccessMessage] = useState("");

    const inputChangehandler = function(e){
        const currErrData = errData;
        const errorField = "err"+e.target.name;
        const currData = userData;
        if(e.target.value===""){
            currErrData[errorField]= "Required";
            setErrData({...currErrData});
            currData[e.target.name] = e.target.value;
            setUserData({...currData});
        }
        else{
            currData[e.target.name] = e.target.value;
            setUserData({...currData});
            currErrData[errorField]="";
            setErrData({...currErrData});
        }
        console.log(userData,errData);
        console.log("ErrorField",errorField)
    }

    const OnSignUpSubmitHandler = async function(){
        try{
            const rawResponse = await fetch("http://localhost:8085/api/v1/signup",
            {
                method:"POST",
                mode:'cors',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Headers',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body:JSON.stringify(userData)
            }
            );

            const result = await rawResponse.json();
            if(rawResponse.ok)
                console.log("Success")
            else
                throw new Error("Failed to fetch");
        }catch(e){
            console.log(e.message)
        }
    }

    const {email_address, first_name, last_name, mobile_number, password} = userData;
    const {errfirst_name, errlast_name, erremail_address, errpassword, errmobile_number} = errData;

    return (
        <Card variant="outlined" style={{alignContent:"center"}}>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <Input name="first_name" type="text" value={first_name} onChange={inputChangehandler}></Input>
                    <FormHelperText className={first_name}>
                        <span className="red" style={{color:"red"}}>{errfirst_name}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <Input name="last_name" type="text" value={last_name} onChange={inputChangehandler}></Input>
                    <FormHelperText className={last_name}>
                        <span className="red" style={{color:"red"}}>{errlast_name}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="email_address">Email</InputLabel>
                    <Input name="email_address" type="text" value={email_address} onChange={inputChangehandler}></Input>
                    <FormHelperText className={email_address}>
                        <span className="red" style={{color:"red"}}>{erremail_address}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" value={password} onChange={inputChangehandler}></Input>
                    <FormHelperText className={password}>
                        <span className="red" style={{color:"red"}}>{errpassword}</span>
                    </FormHelperText>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="mobile_number">Contact Number</InputLabel>
                    <Input name="mobile_number" type="text" value={mobile_number} onChange={inputChangehandler}></Input>
                    <FormHelperText className={mobile_number}>
                        <span className="red" style={{color:"red"}}>{errmobile_number}</span>
                    </FormHelperText>
                </FormControl>
                <span>Registration Success</span>
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