import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const LinkToRoot = (props: any) => <Link to="/" { ...props } />;

const NoMatch = (props: any) => {
    const { location } = props;

    return (
        <div>
            <Typography variant="h3" gutterBottom>404 No Match</Typography>
            <Typography variant="h4" gutterBottom>Could not find path { location.pathname }</Typography>
            <Button variant="contained" color="secondary" component={LinkToRoot}>Return to homepage</Button>
        </div>
    )
};

export default NoMatch