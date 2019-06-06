import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import LinkAdapter from '../link-adapter';

const ClassView = () => {
    return (
        <div>
            <CssBaseline />
            <Toolbar>
                <IconButton aria-label="back" component={LinkAdapter} to="/dashboard">
                    <ArrowBack />
                </IconButton>

            </Toolbar>
        </div>
    )
};
export default ClassView;
