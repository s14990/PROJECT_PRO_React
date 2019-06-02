import React, { Component } from 'react';


export class CreateArtykul extends Component {
    displayName = CreateArtykul.name


    //same as fetch constructor
    //we need to get data for kategorias and producent
    //in the state we save our new Artykul data for sending it
    //as request body to create method in controller
    //dont put initial values as null in states
    constructor(props) {
        super(props);
        this.state = {
            kategorias: [], producents: [], loading: true, err: '', disabled: true,
            nazwa: '', kod: '', illosc: 0, kategoria: '', producent: ''
        };
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
        this.handleCreate = this.handleCreate.bind(this);
        this.validateData = this.validateData.bind(this);
    }


    

    handleCreate() {
        fetch('api/Artykuls', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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


    //Good example of DRY (Do not repeat yourself) (soliD)
    //Changes saved data for the new Artukyl in component state
    //Gets called by change in form fields

    //as kategoria and producent we store their ids(we use them in select field as key value)
    //dont forget you can only change state by using this.setState

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
            this.setState({ err: " Nazwa nie moż być krótrsza od 3 znaków ", disabled: true });
        else if (this.state.kod.length <= 3)
            this.setState({ err: " kod nie moż być krótrsza od 3 znaków ", disabled: true });
        else if (this.state.illosc < 0)
            this.setState({ err: " Illosc nie moze byc ujemna ", disabled: true });
        else if (this.state.kategoria === '' )
            this.setState({ err: " Wybierz Kategorije ", disabled: true });
        else if (this.state.kategoria === '' )
            this.setState({ err: " Wybierz Producenta ", disabled: true });

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
                <button className="btn btn-primary" type="button" onClick={this.handleCreate} disabled={this.state.disabled}>Dodaj Nowy Artykul</button>
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
                <h1>Create Artykul</h1>
                {contents}
            </div>
        );
    }
}