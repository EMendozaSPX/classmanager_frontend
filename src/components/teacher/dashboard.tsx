import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import TitleBar from '../titlebar';


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
    return (
        <div className="root">
            <TitleBar Title="Dashboard"/>
        </div>
    )
};
export default TeacherDashboard;
