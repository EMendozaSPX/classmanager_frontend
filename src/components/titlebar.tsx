import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinkAdapter from './link-adapter'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1
        }
    }
));

interface TitleBarProps{
    Title: string
}

const TitleBar = (props: TitleBarProps) => {
    const authToken = localStorage.getItem('auth-token');
    const classes = useStyles();
    const { Title } = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    { Title }
                </Typography>
                {authToken ? (
                    <Button color="inherit">Logout</Button>
                ) : (
                    <Button color="inherit" component={LinkAdapter} to="/login">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};
export default TitleBar;
