import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { LOGIN_MUTATION, LoginDataTypes, LoginVariableTypes } from "../mutations";

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

interface LoginFormPropTypes extends RouteComponentProps {}

const LoginForm = (props: LoginFormPropTypes) => {
    const login = useMutation<LoginDataTypes, LoginVariableTypes>(LOGIN_MUTATION);
    const classes = useStyles();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState(false);
    const [ displayPassword, setDisplayPassword ] = useState(false);

    return (
        <form
            className={classes.form}
            onSubmit={e => {
                e.preventDefault();
                login({
                        variables: {
                            username: username,
                            password: password
                        }
                    }
                ).then(
                    ({ data }) => {
                        const { login } = data;
                        console.log(login["token"]);
                        localStorage.setItem('auth-token', login["token"]);
                        props.history.push('/dashboard')
                    },
                    error => {
                        console.error(error);

                        const { graphQLErrors } = error;
                        if (graphQLErrors) {
                            graphQLErrors.forEach((item: any) => {
                                switch (item.message) {
                                    case 'username not found':
                                        alert(item.message);
                                        setUsernameErr(true);
                                        break;
                                    case 'authentication failed':
                                        alert(item.message);
                                        setPasswordErr(true);
                                        break;
                                    default:
                                        console.error(item.message);
                                }
                            })
                        }
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                        setUsernameErr(false)
                    }}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                        setPasswordErr(false);
                    }}
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
export default LoginForm
