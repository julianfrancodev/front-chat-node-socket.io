import React, {createContext, useReducer} from "react";
import io from 'socket.io-client';

export const CTX = createContext();

const initState = {

    General: [
        {
            from: 'Julian', msg: 'Hola'
        }
    ],

    Gaming: [
        {
            from: 'Julian', msg: 'Hola'
        }
    ]


};

function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':

            return {
                ...state,

                [topic]: [

                    ...state[topic],
                    {
                        from: from,
                        msg: msg
                    }
                ]
            };

        default:

            return state

    }
}


let socket;

function sendChatAction(value) {
    socket.emit('chat', value)
}


function Store(props) {

    const [allChats, dispatch] = useReducer(reducer, initState);


    if (!socket) {
        socket = io(':3300');
        socket.on('chat', function (msg) {
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
        })
    }

    const user = 'julian' + Math.random(100).toFixed(2);


    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;