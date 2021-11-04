import React, { useState } from "react";
import './styles.css'
import {
    Typography,
    Grid,
    Button,
    Paper,
    FormControl,
    TextField,
    InputAdornment,
    useTheme,
    makeStyles,
    IconButton,
    useMediaQuery
} from '@material-ui/core'
import { Email, Visibility, VisibilityOff } from '@material-ui/icons';


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

    const [lockPassword, setLockPassword] = useState(false);

    const { name, email, password } = formState

    const onChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

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
                                    type={lockPassword ? 'text' : 'password'}
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
                                    fullWidth
                                    variant='contained'
                                    className={styles.Button}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default SignUp;