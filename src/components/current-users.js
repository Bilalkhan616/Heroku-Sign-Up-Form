import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { makeStyles } from '@material-ui/core';

// Note: Handeling Material UI styling here...!
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        height: '100vh',
        width: '60%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    listContainer: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'white'
    },

    emptyHeading: {
        marginTop: '1em',
        marginBottom: '0.5em',
        fontSize: '2em',
        color: 'white'
    },

    listText: {
        fontSize: '1.2em',
        fontFamily: 'sans-serif',
        color: "black"
    },
}));


const CurrentUsers = () => {

    const styles = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [currentUsers, setCurrentUsers] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateFunc = () => {
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
            // updateUser(formStates)

        }
    }


    // // function to clear input fields
    // const clearAll = () => {
    //     setFormStates({
    //         name: '',
    //         email: '',
    //         password: ''
    //     });
    // }

    //Function to get user data in the list!

    const getUserList = async () => {
        let api = "http://localhost:3005/users/"
        // let api = "https://hello-world-deploy-bilal.herokuapp.com/users/"

        try {
            let response = await axios.get(api);
            console.log(response);
            let requiredData = response.data;
            setCurrentUsers(requiredData)
        }
        catch (error) {

        }
    }

    useEffect(() => {
        getUserList();
    }, [])


    // Function to delete user.! 
    const deleteUser = async (data, key) => {
        console.log(data, key);
        let api = "http://localhost:3005/user/delete";
        // let api = "https://crud-app-back-end.herokuapp.com/user/delete"; 
        try {
            let response = await axios.post(api, { email: data.email });
            console.log(response);
            if (response.status === 200) {
                setCurrentUsers([...response.data]);
            }
        }
        catch (error) { console.log(error.response); }
    }

    //Function to update user!

    const updateUser = async (data) => {

        //created user obj to update values


        let api = 'http://localhost:3005/user/update';
        try {
            let response = await axios.post(api, {
                email: data.email,
                // updateUserObj: 
            });
            console.log(response);
        }
        catch (error) {

        }
    }

    return (
        <>
            <div id="main-body">
                {
                    (currentUsers.length > 0)
                        ?
                        (
                            <div className={styles.mainContainer}>
                                <h1 className={styles.emptyHeading}>
                                    Current Users
                                </h1>

                                <Grid item className={styles.listContainer}>
                                    <List>
                                        {
                                            currentUsers.map((item, index) => {
                                                return (
                                                    <ListItem
                                                        key={index}
                                                        className={styles.listItemStyle}
                                                        secondaryAction={
                                                            <div>
                                                                <Button
                                                                    style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }}
                                                                    onClick={handleClickOpen}
                                                                >
                                                                    Edit
                                                                </Button>

                                                                <Dialog open={open} onClose={handleClose}>
                                                                    <DialogTitle>Edit Form</DialogTitle>
                                                                    <DialogContent>

                                                                        <TextField
                                                                            autoFocus
                                                                            margin="dense"
                                                                            id="name"
                                                                            label="Name"
                                                                            type="text"
                                                                            fullWidth
                                                                            variant="standard"
                                                                            value={name}
                                                                            onChange={(event) => setName(event.target.value)}
                                                                        />
                                                                        <TextField
                                                                            autoFocus
                                                                            margin="dense"
                                                                            id="email"
                                                                            label="Email Address"
                                                                            type="email"
                                                                            fullWidth
                                                                            variant="standard"
                                                                            value={email}
                                                                            onChange={(event) => setEmail(event.target.value)}
                                                                        />
                                                                        <TextField
                                                                            autoFocus
                                                                            margin="dense"
                                                                            id="password"
                                                                            label="Password"
                                                                            type="password"
                                                                            fullWidth
                                                                            variant="standard"
                                                                            value={password}
                                                                            onChange={(event) => setPassword(event.target.value)}
                                                                        />
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={handleClose}>Cancel</Button>
                                                                        <Button onClick={updateUser}>Update</Button>
                                                                    </DialogActions>
                                                                </Dialog>

                                                                <Button
                                                                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                                                                    onClick={() => deleteUser(item, index)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={item.name}
                                                            className={styles.listText}
                                                        />
                                                        <ListItemText
                                                            primary={item.email}
                                                            className={styles.listText}
                                                        />
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                                </Grid>
                            </div>
                        )
                        :
                        (
                            <div>
                                <h1 className={styles.emptyHeading}>No data found!!</h1>
                            </div>
                        )
                }
            </div >
        </>
    )
}

export default CurrentUsers;