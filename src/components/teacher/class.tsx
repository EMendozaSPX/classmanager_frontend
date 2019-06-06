import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import LinkAdapter from '../link-adapter';
import { UserType } from '../../queries';

interface ClassViewProps extends RouteComponentProps{}

const ClassView = (props: ClassViewProps) => {
    const { classData } = props.location.state;
    console.log(classData);

    return (
        <div>
            <CssBaseline />
            <Toolbar>
                <IconButton aria-label="back" component={LinkAdapter} to="/dashboard">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" align="center" noWrap>
                    Class {classData.classId}
                </Typography>
            </Toolbar>
            <Paper>
                <Typography variant="h6">Teacher</Typography>
                <Typography variant="body1">{classData.teacher.username}</Typography>
                <Typography variant="body1">{classData.teacher.email}</Typography>
            </Paper>
            <Paper>
                <List component="nav" aria-label="List Students of Class">
                    {classData.students.map((student: UserType) => {
                        return (
                            <ListItem
                                button
                                component={LinkAdapter}
                                to={{
                                    pathname: `/dashboard/${classData.id}/${student.id}`,
                                    state: { student: student}
                                }}
                            >
                                <ListItemText primary={student.username}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>

        </div>
    )
};
export default ClassView;
