﻿import React, { Component } from 'react';

export class CreateProducent extends Component {
    displayName = CreateProducent.name


    constructor(props) {
        super(props);
        this.state = {
            err: '', disabled: true,
            id: '', nazwa: '', kraj: ''
        };

        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.validateData = this.validateData.bind(this);
    }


    handleCreate() {
        fetch('api/Producents/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nazwa: this.state.nazwa,
                kraj: this.state.kraj
            })
        }).then(setTimeout(this.refresh, 500));

    }


    refresh() {
        this.props.history.push("/");
        this.props.history.push("/producents");
    }



    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'nazwa':
                this.setState({ nazwa: value });
                break;
            case 'kraj':
                this.setState({ kraj: value });
                break;
            default:
                console.log("Unknown");
                break;
        }
        this.validateData();
    }


    validateData() {
        this.setState({ err: "", disabled: false });
        if (this.state.nazwa.length <= 3)
            this.setState({ err: "Nazwa nie moż być krótrsza od 3 znaków", disabled: true });
        if (this.state.kraj.length <= 3)
            this.setState({ err: "Nazwa Kraju nie moż być krótrsza od 3 znaków", disabled: true });
    }

    renderProducentForm() {
        return (
            <form>
                <div class="form-group">
                    <label htmlFor="nazwa">Nazwa</label>
                    <input type="text" className="form-control" name="nazwa" value={this.state.nazwa} onChange={this.handleInputChange} />
                </div>
                <div class="form-group">
                    <label htmlFor="kraj">Kraj</label>
                    <input type="text" className="form-control" name="kraj" value={this.state.kraj} onChange={this.handleInputChange} />
                </div>
                {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                <button className="btn btn-primary" type="button" onClick={this.handleCreate} disabled={this.state.disabled}>Create</button>
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