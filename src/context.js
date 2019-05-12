import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact =>
                contact.id !== action.payload)
            };break;
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, 
                ...state.contacts]
            };break;
        case 'UPDATE_CONTACT':
            return {
                    ...state,
                    contacts: state.contacts.map(contact =>
                        contact.id === action.payload.id ? (contact
                            = action.payload) : contact)
            };    
        default:
            return state;
    }
};

export class Provider extends Component {
    state = {
        contacts: [
            {
                id: 1,
                name: 'John Doe',
                email: 'jdoe@gmail.com',
                phone: '555-555-555',
            },
            {
                id: 2,
                name: 'Karen Smith',
                email: 'karen@gmail.com',
                phone: '444-444-444'
            },
            {
                id: 3,
                name: 'Henry Johnson',
                email: 'henry@gmail.com',
                phone: '111-111-111',
            },
            {
                id: 4,
                name: 'Jupiter Saturn',
                email: 'Saturn@gmail.com',
                phone: '222-222-222',
            }
        ],
        dispatch: (action) => {
            this.setState(state => reducer(state, action))
        }
    }


    async componentDidMount () {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.setState({ contacts: data});
    }
    
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;

