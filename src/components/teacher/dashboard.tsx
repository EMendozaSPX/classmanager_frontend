import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

import { GET_AUTHORIZATION } from '../../queries'

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

interface TeacherDashProps{}

const TeacherDashboard = (props: TeacherDashProps) => {
    const authToken = localStorage.getItem('auth-token');
    const classes = useStyles();

    const [login, setLogin] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        setLogin(false);
    };

    const { data } = useQuery(GET_AUTHORIZATION, {
        suspend: false,
        variables: {
            role: 'teacher'
        }
    });

    setLogin(data['value']);
    if (!login) return <Redirect to="/login" />;

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
        </div>
    )
};
export default TeacherDashboard;
