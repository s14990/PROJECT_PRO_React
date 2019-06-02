import React, { Component } from 'react';


export class EditArtykul extends Component {
    displayName = EditArtykul.name


    //same as create 
    //except we need to fetch existing artykul data by his id
    //and we get this id from props.match(remember we used in Router 'artykuls/:id')
    constructor(props) {
        super(props);
        this.state = {
            kategorias: [], producents: [], loading: true, err: '', disabled: true,
            id: '',nazwa: '', kod: '', illosc: 0, kategoria: '', producent: ''
        };
        const art_id = this.props.match.params.id;

        fetch('api/Artykuls/' + art_id)
            .then(response => response.json())
            .then(data => {
                this.setState({ id: data.idArtykul, nazwa: data.nazwa, kod: data.kod, illosc: data.illosc, kategoria: data.idKategoria,producent: data.idProducent });
            });
        fetch('api/Producents')
            .then(response => response.json())
            .then(data => {
                this.setState({ producents: data });
            });
        fetch('api/Kategorias')
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorias: data, loading: false });
            });

        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.validateData = this.validateData.bind(this);
    }




    //We need to use PUT method to update artykul with id
    // so link will look like 'api/Artykuls/4' with methid PUT and body as full data on that artykul
    handleUpdate() {
        fetch('api/Artykuls/'+this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idArtykul: this.state.id,
                nazwa: this.state.nazwa,
                kod: this.state.kod,
                illosc: this.state.illosc,
                idKategoria: this.state.kategoria,
                idProducent: this.state.producent
            })
        }).then(setTimeout(this.refresh, 300));

    }


    refresh() {
        this.props.history.push("/artykuls");
    }


    //Same as create

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'kategoria':
                this.setState({ kategoria: value });
                break;
            case 'producent':
                this.setState({ producent: value });
                break;
            case 'nazwa':
                this.setState({ nazwa: value })
                break;
            case 'kod':
                this.setState({ kod: value })
                break;
            case 'illosc':
                this.setState({ illosc: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
        this.validateData();
    }

    //check if all data if ok and if not block create button and put error to state
    validateData() {
        this.setState({ err: "", disabled: false });
        if (this.state.nazwa.length <= 3)
            this.setState({ err: "Nazwa nie moż być krótrsza od 3 znaków", disabled: true });
        if (this.state.kod.length <= 3)
            this.setState({ err: "kod nie moż być krótrsza od 3 znaków", disabled: true });
        if (this.state.illosc < 0)
            this.setState({ err: "Illosc nie moze byc ujemna", disabled: true });
        if (this.state.kategoria == null)
            this.setState({ err: "Wybierz Kategorije", disabled: true });
        if (this.state.kategoria == null)
            this.setState({ err: "Wybierz Producenta", disabled: true });

    }

    //when called from render() returns html form
    //select is a drop-down menu
    //<option value="" disabled></option>- mean you cant choose none
    renderArtykulsForm() {
        return (
            <form className="Add_Order_Form">
                <div class="form-group">
                    <label htmlFor="nazwa">Nazwa</label>
                    <input type="text" className="form-control" name="nazwa" value={this.state.nazwa} onChange={this.handleInputChange} />
                </div>
                <div class="form-group">
                    <label htmlFor="kod">Kod</label>
                    <input type="text" className="form-control" name="kod" value={this.state.kod} onChange={this.handleInputChange} />
                </div>
                <label htmlFor="illosc">Illosc</label>
                <input type="number" className="form-control" name="illosc" value={this.state.illosc} onChange={this.handleInputChange} />
                <div class="form-group">
                    <label htmlFor="kategoria">Kategoria</label>
                    <select className="form-control" name="kategoria" value={this.state.kategoria} onChange={this.handleInputChange}>
                        <option value="" disabled></option>
                        {this.state.kategorias.map(kat =>
                            <option key={kat.idKategoria} value={kat.idKategoria} >{kat.nazwa}</option>
                        )}
                    </select>
                </div>
                <div class="form-group">
                    <label htmlFor="producent">Producent</label>
                    <select className="form-control" name="producent" value={this.state.producent} onChange={this.handleInputChange}>
                        <option value="" disabled></option>
                        {this.state.producents.map(prod =>
                            <option key={prod.idProducent} value={prod.idProducent} >{prod.nazwa}</option>
                        )}
                    </select>
                </div>
                {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                <button className="btn btn-primary" type="button" onClick={this.handleUpdate} disabled={this.state.disabled}>Edytuj Artykul</button>
            </form>
        );
    }


    //this function returns what actually is rendered with ReactDOM
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderArtykulsForm();

        return (
            <div>
                <h1>Edit Artykul</h1>
                {contents}
            </div>
        );
    }
}