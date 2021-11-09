import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
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

    const [currentUsers, setCurrentUsers] = useState([]);

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

    // useEffect(() => {
    //     return () => {
    //         setCurrentUsers([]);
    //     }
    // }, []);

    const showUser = (data) => {
        console.log(data);
        // alert(`User name is ${data.name} and their email address is ${data.email}`)
    }

    const deleteUser = async (id) => {
        let api = `http://localhost:3005/users/${id}`;
        let response = await axios.delete(api)
        console.log(response)
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
                                                                // onClick={showUser()}
                                                                >
                                                                    View
                                                                </Button>

                                                                <Button
                                                                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                                                                    onClick={() => deleteUser(item.name)}
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