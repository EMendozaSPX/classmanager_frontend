import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import { GET_AUTHORIZATION } from '../../queries';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex'
    }
});

interface AdminDashProps extends WithStyles<typeof styles>{}

const AdminDashboard = (props: AdminDashProps) => {
    const { classes } = props;
    const { data, error, loading } = useQuery(GET_AUTHORIZATION, {
        variables: {
            role: 'admin'
        },
        suspend: false
    });
    if (loading) return <Typography variant="h4" gutterBottom>Loading...</Typography>;
    if (error || !data.access) {
        if (error) {
            console.error(error);
        }
        localStorage.clear();
        return <Redirect to="/login"/>;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static">
            </AppBar>
            <Typography component="h2" variant="h1">Hello Admin Dashboard</Typography>
        </div>
    )
};

export default withStyles(styles)(AdminDashboard)