import React , {useState} from 'react';
import './header.css';
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Input, Typography} from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button'; 

const SignUp = function(props){

    // state variable to store user details and error message

    const [userData, setUserData] = useState({
        "email_address":'',
        "first_name":'',
        "last_name":'',
        "mobile_number":'',
        "password":''
    });
    const [errData,setErrData] = useState({
        errfirst_name:'',
        errlast_name:'',
        erremail_address:'',
        errpassword:'',
        errmobile_number:''
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [registerDataOk, setRegisterDataOk] = useState(0);

    // Function to handle user inputs

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
    }

    // Function to validate the user inputs on clicking Register button

    const validateData = function() {
        let errorData = errData;
        errorData.erremail_address=(userData.email_address==="")?"Required":"";
        errorData.errlast_name=(userData.last_name==="")?"Required":"";
        errorData.errfirst_name=(userData.first_name==="")?"Required":"";
        errorData.errpassword=(userData.password==="")?"Required":"";
        errorData.errmobile_number=(userData.mobile_number==="")?"Required":"";
        setErrData({...errorData});
        if(errData.erremail_address==="" && errData.errfirst_name==="" && errData.errlast_name==="" && errData.errmobile_number==="" && 
            errData.errpassword===""){
                setRegisterDataOk(1);
            }
        else{
            setRegisterDataOk(0);
        }
    }

    // Function to send details to backend server for new user registration

    const OnSignUpSubmitHandler = async function(e){
        e.preventDefault();
        validateData();
        if(registerDataOk){
            try{
                const rawResponse = await fetch(`/api/v1/signup`,
                {
                    method:"POST",
                    headers:{
                        "Access":"application/json",
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    body:JSON.stringify(userData)
                }
                );

                const result = await rawResponse.json();
                if(rawResponse.ok){
                    setSuccessMessage("Registration Successful. Please Login!");
                }
                else
                    throw new Error("Failed to fetch");
            }catch(e){
                console.log(e.message)
            }
        }
    }

    const {email_address, first_name, last_name, mobile_number, password} = userData;
    const {errfirst_name, errlast_name, erremail_address, errpassword, errmobile_number} = errData;

    return (
        <Card variant="outlined" style={{alignContent:"center", display:"flex", flexDirection:"column",alignItems:"center"}}>
            <CardContent style={{maxWidth:"240px", minWidth:"240px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <Input name="first_name" type="text" value={first_name} onChange={inputChangehandler}></Input>
                    <Typography component="span" className="red" style={{color:"red"}}>{errfirst_name}</Typography>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <Input name="last_name" type="text" value={last_name} onChange={inputChangehandler}></Input>
                    <Typography component="span" className="red" style={{color:"red"}}>{errlast_name}</Typography>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="email_address">Email</InputLabel>
                    <Input name="email_address" type="text" value={email_address} onChange={inputChangehandler}></Input>
                    <Typography component="span" className="red" style={{color:"red"}}>{erremail_address}</Typography>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" value={password} onChange={inputChangehandler}></Input>
                    <Typography component="span" className="red" style={{color:"red"}}>{errpassword}</Typography>
                </FormControl>
            </CardContent>
            <CardContent style={{maxWidth:"240px", minWidth:"240px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <FormControl required className="form-control" style={{background:"white"}}> 
                    <InputLabel htmlFor="mobile_number">Contact Number</InputLabel>
                    <Input name="mobile_number" type="text" value={mobile_number} onChange={inputChangehandler}></Input>
                    <span className="red" style={{color:"red"}}>{errmobile_number}</span>
                </FormControl>
                <br></br>
            </CardContent>
            <Typography component="span">{successMessage}</Typography>
            <CardContent>
            <Button style={{display:"flex", flexDirection:"row", justifyContent:"center"}}
                variant="contained"
                onClick={OnSignUpSubmitHandler}
                color="primary"
            >REGISTER
            </Button>
            </CardContent>
        </Card>
    )
}

export default SignUp;