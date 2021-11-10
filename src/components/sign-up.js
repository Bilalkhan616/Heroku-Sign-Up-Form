import React, { useState } from "react";
import './styles.css'
import {
    Typography,
    Grid,
    Button,
    Paper,
    FormControl,
    TextField,
    useTheme,
    makeStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from "axios";


const useStyle = makeStyles((theme) => ({
    Paper: {
        width: '640px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto'
        },
        borderRadius: '17px',
        padding: '2em',
        backgroundColor: "white"
    },
    Heading: {
        marginTop: '1.5em',
        marginBottom: '1.5em',
        color: 'black',
        justifyContent: 'center'
    },

    headingText: {
        fontSize: '2.5em'
    },

    formContainer: {
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    linkText: {
        fontSize: 14
    },

    Button: {
        borderRadius: '20px',
        padding: '13px',
        background: 'linear-gradient(to left, #6A82FB, #FC5C7D)',
        color: '#fff',
        '&:hover': {
            background: 'linear-gradient(to left, #FC5C7D, #6A82FB)',
        },
    }
}))


const SignUp = () => {

    const styles = useStyle();
    const theme = useTheme();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = formState

    const onChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const submitFunc = () => {
        // 
        if (name.length == "") {
            alert("Please enter a valid name")
            // <Alert severity="info">Please enter a valid name</Alert>
        }

        else if (email.length == "") {
            alert("Please enter a valid email")
        }

        else if (password.length < 6) {
            alert("Please enter a valid password")
        }

        else {
            signUpUser(formState)
            clearAll();
        }
    }


    // function to clear input fields
    const clearAll = () => {
        setFormState({
            name: '',
            email: '',
            password: ''
        });
    }

    const signUpUser = async (data) => {

        console.log("data recieved", data);
        let api = 'http://localhost:3005/user/';
        // let api = 'https://hello-world-deploy-bilal.herokuapp.com/user/'

        try {
            let response = await axios.post(api, data)
            console.log(response);

            if (response.status === 200) {
                alert("User created successfully!!")
            }

            else {
                console.log("Error")
            }
        }
        catch (error) {

        }

    }

    return (
        <>
            <div id='main-body'>
                {/* <h1>This is a sign up form</h1> */}
                <Grid item container style={{ justifyContent: 'center' }}>
                    <Grid item container component={Paper} elevation={5} className={styles.Paper} alignItems='center' justifyContent='center'>
                        <Grid item container className={styles.Heading}>
                            <Typography variant="h3" className={styles.headingText}>
                                Sign Up
                            </Typography>
                        </Grid>
                        <Grid item container className={styles.formContainer}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    name="name"
                                    inputProps={{
                                        style: {
                                            color: "black"
                                        },
                                    }}
                                    value={name || ""}
                                    onChange={onChange}

                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    style={{ marginBottom: '15px', marginTop: '15px' }}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    inputProps={{
                                        style: {
                                            color: "black"
                                        },
                                    }}
                                    value={email || ""}
                                    onChange={onChange}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    type={password}
                                    name="password"
                                    inputProps={{
                                        style: {
                                            color: "black"
                                        },
                                    }}
                                    value={password || ""}
                                    onChange={onChange}
                                />
                            </FormControl>

                            <Grid item container justify='center' style={{ marginTop: '2em' }}>
                                <Button
                                    onClick={submitFunc}
                                    fullWidth
                                    variant='contained'
                                    className={styles.Button}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container justify='center' style={{ marginTop: '2em' }} >
                        <Link to='/current-users'>
                            <Button
                                style={{ width: '200px', background: 'white', color: 'black' }}
                                // fullWidth
                                variant='contained'
                                className={styles.Button}
                            >
                                All Users
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default SignUp;