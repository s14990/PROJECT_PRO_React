import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Kategorias extends Component {
    displayName = Kategorias.name


    constructor(props) {
        super(props);
        this.state = {kategorias: [], loading: true };


        fetch('api/Kategorias')
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorias: data, loading: false });
            });

        this.renderKategoriasTable = this.renderKategoriasTable.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    handleDelete(id) {
        if (window.confirm("Do you want to delete kategoria" + id) === true)
            fetch('api/Kategorias/' + id, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }


    refresh() {
        this.props.history.push("/");
        this.props.history.push("/kategorias");
    }

    renderKategoriasTable(kategorias) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nazwa</th>
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
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderKategoriasTable(this.state.kategorias);

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