import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => createStyles({
    layout: {
        flexGrow: 1,
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    container: {
        marginTop: theme.spacing.unit * 3,
        padding: `$(theme.spacing.unit * 2)px $(theme.spacing.unit * 3)px $(theme.spacing.unit * 3)px`
    }
});

interface LandingProps extends WithStyles<typeof styles> {}

const LinkToLogin = (props: any) => <Link to="/login" {...props} />;

const Landing = (props: LandingProps) => {
    const { classes } = props;

    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.layout}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" color="inherit">
                            The Open Class Manager
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <Paper className={classes.container}>
                        <Typography component="h1" variant="h4" gutterBottom>
                            Welcome to the Class Manager By Euan Mendoza
                        </Typography>
                        <Typography variant="h6" paragraph>
                            This is a simple open source class manager based off IWise and Pythons Django Web Framework.
                            The App is made using GoLang, Typescript and React, it uses GraphQL as an API interface.
                            The App is secured using BCrypt hash and salt, and safely stored in a database. The App uses
                            react router for authorization. Therefore the application is entirely heaps sick!
                        </Typography>
                        <div>
                            <Button
                                variant="outlined"
                                color="secondary"
                                component={LinkToLogin}
                            >
                                Continue
                            </Button>
                        </div>
                    </Paper>
                </main>
            </div>
        </Fragment>
    )
};

export default withStyles(styles)(Landing)
