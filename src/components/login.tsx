import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

import { LOGIN_MUTATION, LoginDataTypes, LoginVariableTypes } from '../mutations';

const styles = (theme: Theme) => createStyles({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: 'theme.spacing.unit'
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});

interface matchProps {
    userType: string
}

interface LoginProps extends WithStyles<typeof styles>, RouteComponentProps<matchProps> {}

const Login = (props: LoginProps) => {
    const { classes, match } = props;

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login {match.params.userType}
                </Typography>
                <LoginForm { ...props } />
            </Paper>
        </main>
    )
};

const LoginForm = (props: any) => {
    const login = useMutation<LoginDataTypes, LoginVariableTypes>(LOGIN_MUTATION);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState(false);
    const [ displayPassword, setDisplayPassword ] = useState(false);

    const { classes, match } = props;

    return (
        <form
            className={classes.form}
            onSubmit={e => {
                e.preventDefault();
                login({
                        variables: {
                            userType: match.params.userType,
                            username: username,
                            password: password
                        }
                    }
                ).then(
                    (result: LoginDataTypes) => {
                        const { login } = result;
                        console.log(login);
                        localStorage.setItem('token', login)
                    },
                    error => {
                        console.error(error);

                        const { graphQLErrors } = error;
                        if (graphQLErrors) {
                            console.log(graphQLErrors)
                        }
                        setUsernameErr(true);
                        setPasswordErr(true);
                    }
                );
            }}
        >
            <FormControl
                margin="normal"
                error={usernameErr}
                required
                fullWidth
            >
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    autoComplete="username"
                />
            </FormControl>
            <FormControl
                margin="normal"
                error={passwordErr}
                required
                fullWidth
            >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    name="password"
                    id="password"
                    type={displayPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={() => setDisplayPassword(!displayPassword)}
                            >
                                { displayPassword ? <Visibility /> : <VisibilityOff /> }
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                fullWidth
            >
                Sign In
            </Button>
        </form>
    )
};

export default withStyles(styles)(Login)