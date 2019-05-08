import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'

import { GET_AUTHORIZATION } from '../../queries';

const styles = (theme: Theme) => createStyles({

});

const AdminDashboard = (props: any) => {
    const { data, error, loading } = useQuery(GET_AUTHORIZATION, {
        variables: {
            role: 'admin'
        },
        suspend: false
    });
    if (loading) return <Typography variant="h4" gutterBottom>Loading...</Typography>;
    if (error || !data.access) {
        if (error) {
            console.log(error);
        }
        return <Redirect to="/admin/login"/>;
    }

    return (
        <div>
            <Typography component="h2" variant="h1">Hello Admin Dashboard</Typography>
        </div>
    )
};

export default withStyles(styles)(AdminDashboard)