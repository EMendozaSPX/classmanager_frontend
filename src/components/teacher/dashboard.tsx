import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

import Timetable from './timetable';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

interface TeacherDashProps extends RouteComponentProps {}

const TeacherDashboard = (props: TeacherDashProps) => {
    const authToken = localStorage.getItem('auth-token');
    const classes = useStyles();

    const [ id, setId ] = useState(0);
    const [ role, setRole ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');

    const decodedToken = jwt_decode(authToken);
    console.log(decodedToken);
    setId(decodedToken['id']);
    setRole(decodedToken['role']);
    setUsername(decodedToken['username']);
    setEmail(decodedToken['email']);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        props.history.push('/');
    };

    if (!authToken) return <Redirect to="/login" />;



    return (
        <div className="root">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Teacher Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Timetable teacherId={id} />
        </div>
    )
};
export default withRouter(TeacherDashboard);
