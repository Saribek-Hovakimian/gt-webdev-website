import React, {Component} from "react";
import NavBar from "../components/NavBar";
import Head from 'next/head';
import axios from "axios";
import {Button, Link, MenuItem, Select, TextField, Typography} from "@mui/material";

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstName": "",
            "lastName": "",
            "email": "",
            "contactPoint": "",
            "submitted": false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    callAPI = () => {
        let url = process.env.NEXT_PUBLIC_BASE_URL + '/api/joinClub';
        //let url = "http://localhost:3000/api/joinClub";
        return axios.post(url, {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "contactPoint": this.state.contactPoint
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.firstName) {
            alert("You must fill in your first name.");
        } else if (!this.state.lastName) {
            alert("You must fill in your last name.");
        } else if (!this.state.email) {
            alert("You must fill in your email.");
        } else if (!this.state.contactPoint) {
            alert("You must fill in how you heard about us.");
        } else {
            this.callAPI()
            .then((res) => {
                this.setState({
                    "submitted": true
                });
            })
            .catch((error) => {
                alert("The email you inputted is invalid. Note that it must be a gatech.edu address.");
            });
        }
    }

    render() {
        let body = this.state.submitted ?
            <Submitted /> :
            <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} />;
        return (
            <div>
                <Head>
                    <title>Join | GT WebDev</title>
                </Head>
                <NavBar />
                <div className="main">
                    <Typography variant="h4" className="title1">how to join</Typography>
                    <Typography variant="body1">
                        You can join GT WebDev by joining our Discord at this link:&nbsp;
                        <Link href="https://discord.gg/BbykvvQmGz">
                            https://discord.gg/BbykvvQmGz
                        </Link>
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="h4" className="title2">where do we meet</Typography>
                    <Typography variant="body1">Our project teams meet every Tuesday from 6:30 P.M. to around 7:30 P.M. Atlanta time in CCB (College of Computing Building) 102.
                        <br />
                        The time and place for our events and workshops vary, but they will typically take place on Thursdays at 6:30 P.M.
                    </Typography>
                </div>
            </div>
        );
    }
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.props.handleChange;
        this.handleSubmit = this.props.handleSubmit;
    }
    render() {
        return (
            <form noValidate autoComplete="off" className="indented" onSubmit={this.handleSubmit}>
                <Typography variant="body1">Fill out the form below to join GT WebDev!</Typography>
                <br />
                <TextField id="filled-basic" label="First Name" variant="filled" name="firstName" onChange={this.handleChange} />
                <br />
                <br />
                <TextField id="filled-basic" label="Last Name" variant="filled" name="lastName" onChange={this.handleChange} />
                <br />
                <br />
                <TextField id="filled-basic" label="Email" variant="filled" name="email" onChange={this.handleChange} />
                <br />
                <br />
                <br />
                <Typography variant="body1" className="padRight">How did you hear about us?</Typography>
                <Select className="hearDropDown" name="contactPoint" onChange={this.handleChange}>
                    <MenuItem value="coc">College of Computing</MenuItem>
                    <MenuItem value="google">Google</MenuItem>
                    <MenuItem value="referral">A referral</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">Join GT WebDev</Button>
            </form>
        );
    }
}

class Submitted extends Component {
    render() {
        return (
            <div className="indented">
                <Typography variant="body1">Thank you for joining GT WebDev! You'll hear from us soon!</Typography>
                <br />
                <img src="happyDog.jpg"></img>
            </div>
        );
    }
}

export default Join;
