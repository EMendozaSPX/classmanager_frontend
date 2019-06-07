import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinkAdapter from './link-adapter';

const NoMatch = (props: any) => {
    const { location } = props;

    return (
        <div>
            <Typography variant="h3" gutterBottom>404 No Match</Typography>
            <Typography variant="h4" gutterBottom>Could not find path { location.pathname }</Typography>
            <Button
                variant="contained"
                color="secondary"
                component={LinkAdapter}
                to="/"
            >
                Return to homepage
            </Button>
        </div>
    )
};

export default NoMatch
