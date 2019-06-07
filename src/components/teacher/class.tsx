import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import LinkAdapter from '../link-adapter';
import { UserType } from '../../queries';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center'
    }
}))

interface ClassViewProps extends RouteComponentProps{}

const ClassView = (props: ClassViewProps) => {
    const classes = useStyles();
    const { classData } = props.location.state;
    console.log(classData);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Toolbar>
                <IconButton aria-label="back" component={LinkAdapter} to="/dashboard">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" align="center" noWrap>
                    Class {classData.classId}
                </Typography>
            </Toolbar>
            <Grid
                container
                direction="column"
                spacing={3}
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">Teacher</Typography>
                        <Typography variant="body1">{classData.teacher.username}</Typography>
                        <Typography variant="body1">{classData.teacher.email}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">Students</Typography>
                        <List component="nav" aria-label="List Students of Class">
                            {classData.students.map((student: UserType) => {
                                return (
                                    <ListItem
                                        button
                                        component={LinkAdapter}
                                        to={`/dashboard/${classData.id}/students/${student.id}`}
                                    >
                                        <ListItemText primary={student.username}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};
export default ClassView;
