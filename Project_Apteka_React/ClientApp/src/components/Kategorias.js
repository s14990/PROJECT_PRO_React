import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Kategorias extends Component {
    displayName = Kategorias.name


    constructor(props) {
        super(props);
        this.state = { kategorias: [],filtered: [], word: '', loading: true };


        fetch('api/Kategorias')
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorias: data, loading: false, filtered: data });
            });

        this.renderKategoriasTable = this.renderKategoriasTable.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.refresh = this.refresh.bind(this);
        this.compareBy = this.compareBy.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'word':
                if (value != '') {
                    var arts = this.state.kategorias;
                    var new_art = new Array();
                    for (var i = 0; i < arts.length; i++) {
                        if (arts[i].nazwa.includes(value))
                            new_art.push(arts[i]);
                    }
                    this.setState({ filtered: new_art, word: value });
                }
                else {
                    var arts = this.state.kategorias;
                    this.setState({ filtered: arts, word: '' });
                }

                break;
            default:
                console.log("Unknown");
                break;
        }
    }

    handleDelete(id) {
        if (window.confirm("Do you want to delete kategoria" + id) === true)
            fetch('api/Kategorias/' + id, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }


    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        let arrayCopy = [...this.state.kategorias];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ filtered: arrayCopy });
    }


    refresh() {
        this.props.history.push("/");
        this.props.history.push("/kategorias");
    }

    renderKategoriasTable(kategorias) {
        return (
            <div>
                <form>
                    <div class="form-group">
                        <label htmlFor="word">Wyszukiwanie po nazwie</label>
                        <input type="text" className="form-control" name="word" value={this.state.word} onChange={this.handleInputChange} />
                    </div>
                </form>
            <table className='table'>
                <thead>
                    <tr>
                      <th onClick={() => this.sortBy('nazwa')} >Nazwa</th>
                    </tr>
                </thead>
                <tbody>
                    {kategorias.map(kategoria =>
                        <tr key={kategoria.idKategoria}>
                            <td>{kategoria.nazwa}</td>
                            <td><a className="action" onClick={(id) => this.handleDelete(kategoria.idKategoria)}>Delete</a></td>
                            <td><Link className="links" to={'kategoria_edit/' + kategoria.idKategoria}>Edit</Link></td>
                        </tr>
                    )}
                </tbody>
                </table>
             </div>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderKategoriasTable(this.state.filtered);

        return (
            <div>
                <h1>Kategorii</h1>
                {contents}
                <p>
                    <Link to="/kategoria_new">Create New</Link>
                </p>
            </div>
        );
    }
}