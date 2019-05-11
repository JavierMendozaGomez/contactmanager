import React, { Component } from 'react';
import {Consumer} from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = async(dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;

        //Check for errors
        if(name === '') {
            this.setState({errors: {name: 'Name is required'}})
            return;
        }

        if(email === '') {
            this.setState({errors: {email: 'Email is required'}})
            return;
        }

        if(phone === '') {
            this.setState({errors: {phone: 'Phone is required'}});
        }
        const {data, status} = await axios.post('https://jsonplaceholder.typicode.com/users/', {
            name,
            email,
            phone,
        });
        if(status === 201){

            dispatch({type: 'ADD_CONTACT', payload: data});
            
            this.setState({
                name: '',
                email: '',
                phone: ''
            });

            this.props.history.push('/');
        }
    }

    render() {
        return (
        <Consumer>
            {(value) => {
                const {dispatch} = value;
                const {name, email, phone, errors} = this.state;
                return (
                    <div className='card mb-3'>
                    <div className="card-header">
                        Add Contact</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <TextInputGroup 
                                    label="Name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextInputGroup 
                                    label="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                <TextInputGroup 
                                    label="Phone"
                                    name="phone"
                                    placeholder="Enter phone"
                                    value={phone}
                                    onChange={this.onChange}
                                    error={errors.phone}
                                />
                                <input type="submit" value="Add Contact" 
                                    className="btn btn-light btn-block"/>                          
                            </form>
    
                        </div>
                </div>)               
            }}

        </Consumer>
        )
    }
}

export default AddContact;