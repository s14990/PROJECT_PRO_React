﻿import React, { Component } from 'react';

export class Login extends Component {
    displayName = Login.name


    constructor(props) {
        super(props);
        this.state = {
            err: '', disabled: true,
            username: '',password: ''
        };

        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.validateData = this.validateData.bind(this);
    }


    handleLogin() {
        fetch('api/Users/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserName: this.state.username,
                Password: this.state.password
            })
        }).then((response) => {
            if (response.status === 200) {
                console.log("SUCCESSS")
                setTimeout(this.refresh, 500);
            }
            else {
                this.setState({ err: "Login failed" });
            }
        });

            

    }


    refresh() {
        this.props.history.push("/");
        this.props.history.push("/artykuls");
    }



    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'username':
                this.setState({ username: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
            default:
                console.log("Unknown");
                break;
        }
        this.validateData();
    }


    validateData() {
        this.setState({ err: "", disabled: false });
        if (this.state.username.length <= 3)
            this.setState({ err: "Username nie moż być krótrsza od 3 znaków", disabled: true });
        if (this.state.password.length <= 5)
            this.setState({ err: "Password nie moż być krótrsza od 3 znaków", disabled: true });
    }

    renderProducentForm() {
        return (
            <form>
                <div class="form-group">
                    <label htmlFor="username">username</label>
                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleInputChange} />
                </div>
                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} />
                </div>
                {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                <button className="btn btn-primary" type="button" onClick={this.handleLogin} disabled={this.state.disabled}>Login</button>
            </form>
        );
    }


    render() {
        let contents = this.renderProducentForm();

        return (
            <div>
                <h1>Create Producent</h1>
                {contents}
            </div>
        );
    }
}