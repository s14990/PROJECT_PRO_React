import React, { Component } from 'react';

export class EditKategoria extends Component {
    displayName = EditKategoria.name


    constructor(props) {
        super(props);
        this.state = {
            err: '', disabled: true,
            id: '', nazwa: ''
        };
        const kat_id = this.props.match.params.id;

        fetch('api/Kategorias/' + kat_id)
            .then(response => response.json())
            .then(data => {
                this.setState({ id: data.idKategoria, nazwa: data.nazwa});
            });

        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.validateData = this.validateData.bind(this);
    }


    handleUpdate() {
        fetch('api/Kategorias/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idKategoria: this.state.id,
                nazwa: this.state.nazwa,
            })
        }).then(setTimeout(this.refresh, 500));

    }


    refresh() {
        this.props.history.push("/");
        this.props.history.push("/kategorias");
    }



    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'nazwa':
                this.setState({ nazwa: value });
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
    }

    renderKategoriaForm() {
        return (
            <form>
                <div class="form-group">
                    <label htmlFor="nazwa">Nazwa</label>
                    <input type="text" className="form-control" name="nazwa" value={this.state.nazwa} onChange={this.handleInputChange} />
                </div>
                {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                <button className="btn btn-primary" type="button" onClick={this.handleUpdate} disabled={this.state.disabled}>Edit Kategoria</button>
            </form>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderKategoriaForm();

        return (
            <div>
                <h1>Edit Kategoria</h1>
                {contents}
            </div>
        );
    }
}