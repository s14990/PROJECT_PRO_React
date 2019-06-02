import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Producents extends Component {
    displayName = Producents.name


    constructor(props) {
        super(props);
        this.state = { producents: [], loading: true };


        fetch('api/Producents')
            .then(response => response.json())
            .then(data => {
                this.setState({ producents: data, loading: false });
            });

        this.renderProducentsTable = this.renderProducentsTable.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    handleDelete(id) {
        if (window.confirm("Do you want to delete producent" + id) === true)
            fetch('api/Producents/' + id, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }


    refresh() {
        this.props.history.push("/");
        this.props.history.push("/producents");
    }

    renderProducentsTable(producents) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Kraj</th>
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
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProducentsTable(this.state.producents);

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
