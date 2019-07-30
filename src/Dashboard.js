import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CTX} from "./Store";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: '60px'
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        margin: theme.spacing(1),
        width: '10%'
    },
    chip: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },

}));

export default function Dashboard() {
    const classes = useStyles();

    const [textValue, setTextValue] = useState('');

    // ctx

    const {allChats, sendChatAction, user} = useContext(CTX);

    const topics = Object.keys(allChats);

    const [activeTopic, changeActiveTopic] = useState(topics[0]);


    // console.log(topics)
    // console.log(allChats)

    return (
        <div>
            <Paper className={classes.root} style={{textAlign: 'center'}}>
                <Typography variant="h4" component="h4">
                    The fucking chat app
                </Typography>
                <Typography variant="h5" component="h4">
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={(e) => {
                                        changeActiveTopic(e.target.innerText)
                                    }}
                                              key={topic} button>
                                        <ListItemText primary={topic}/>
                                    </ListItem>
                                ))
                            }

                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        <Paper style={{height: 300, overflow: 'auto'}}>

                            {
                                allChats[activeTopic].map((chat, index) => (
                                    <div className={classes.flex} key={index}>
                                        <Chip label={chat.from} className={classes.chip}/>
                                        <Typography variant='h5'>
                                            {chat.msg}
                                        </Typography>
                                    </div>
                                ))
                            }
                        </Paper>
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        id="standard-name"

                        label="Message"
                        className={classes.textField}
                        value={textValue}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendChatAction({from: user, msg: textValue, topic: activeTopic});
                                setTextValue('');
                            }
                        }}
                        onChange={(e) => {
                            setTextValue(e.target.value)
                        }}

                    />

                    <Button
                        onClick={() => {
                            sendChatAction({from: user, msg: textValue, topic: activeTopic});
                            setTextValue('');
                        }}
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Send Message :)
                    </Button>
                </div>

            </Paper>
        </div>
    );
}