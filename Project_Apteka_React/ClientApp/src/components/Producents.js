﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Producents extends Component {
    displayName = Producents.name


    constructor(props) {
        super(props);
        this.state = { producents: [], filtered: [], word: '', loading: true };


        fetch('api/Producents')
            .then(response => response.json())
            .then(data => {
                this.setState({ producents: data, loading: false, filtered: data });
            });

        this.renderProducentsTable = this.renderProducentsTable.bind(this);
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
                    var arts = this.state.producents;
                    var new_art = new Array();
                    for (var i = 0; i < arts.length; i++) {
                        if (arts[i].nazwa.includes(value))
                            new_art.push(arts[i]);
                    }
                    this.setState({ filtered: new_art, word: value });
                }
                else {
                    var arts = this.state.producents;
                    this.setState({ filtered: arts, word: '' });
                }

                break;
            default:
                console.log("Unknown");
                break;
        }
    }


    handleDelete(id) {
        if (window.confirm("Do you want to delete producent" + id) === true)
            fetch('api/Producents/' + id, {
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
        let arrayCopy = [...this.state.producents];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ filtered: arrayCopy });
    }

    refresh() {
        this.props.history.push("/");
        this.props.history.push("/producents");
    }



    renderProducentsTable(producents) {
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
                       <th onClick={() => this.sortBy('kraj')} >Nazwa</th>
                    </tr>
                </thead>
                <tbody>
                    {producents.map(producent =>
                        <tr key={producent.idProducent}>
                            <td>{producent.nazwa}</td>
                            <td>{producent.kraj}</td>
                            <td><a className="action" onClick={(id) => this.handleDelete(producent.idProducent)}>Delete</a></td>
                            <td><Link className="links" to={'producent_edit/' + producent.idProducent}>Edit</Link></td>
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
            : this.renderProducentsTable(this.state.filtered);

        return (
            <div>
                <h1>Producenci</h1>
                {contents}
                <p>
                    <Link to="/producent_new">Create New</Link>
                </p>
            </div>
        );
    }
}
