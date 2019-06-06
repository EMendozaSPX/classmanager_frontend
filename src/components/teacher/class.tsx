import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

import LinkAdapter from '../link-adapter';

interface ClassViewProps extends RouteComponentProps{}

const ClassView = (props: ClassViewProps) => {
    console.log(props);
    return (
        <div>
            <CssBaseline />
            <Toolbar>
                <IconButton aria-label="back" component={LinkAdapter} to="/dashboard">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" align="center" noWrap>
                    Test
                </Typography>
            </Toolbar>
        </div>
    )
};
export default ClassView;
