import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";


import Timetable from './timetable';
import ListClasses from './classes-list';

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

    const _teacherId = (): number => {
        if (authToken) {
            const decodedToken = jwt.decode(authToken) as any;
            console.log(decodedToken);
            const id: number = decodedToken['id'] as number
            return id
        }
        return 0
    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        props.history.push('/');
    };

    if (!authToken) return <Redirect to="/login" />;

    return (
        <div className="root">
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Teacher Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Timetable teacherId={_teacherId()} />
            <ListClasses teacherId={_teacherId()} />
        </div>
    )
};
export default withRouter(TeacherDashboard);
