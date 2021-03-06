﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

export class Artykuls extends Component {
    displayName = Artykuls.name


    //React constructor is somewhat like constructor in C# 
    //props - static(history, location and match) if you will look into chrome dev prev
    //state - something that can be changed during component lifecycle
    //you can only change state by calling this.setState({});
   
    constructor(props){
        super(props);
        this.state = { artykuls: [],filtered:[], word: '',kategorias: [],producents: [], loading: true };

        //fetch data from api when component is loaded
        //Should have used componentDidMount() (todo later)
        fetch('api/Artykuls')
            .then(response => response.json())
            .then(data => {
                this.setState({ artykuls: data, filtered: data});
            });
        fetch('api/Producents')
            .then(response => response.json())
            .then(data => {
                this.setState({ producents: data});
            });
        fetch('api/Kategorias')
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorias: data, loading: false });
            });


        //in react we have to bind our functions in constructor to be able to call them by this.
        this.renderArtykulsTable = this.renderArtykulsTable.bind(this);
        this.findKategoriaName = this.findKategoriaName.bind(this);
        this.findProducentName = this.findProducentName.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.refresh = this.refresh.bind(this);
        this.compareBy=this.compareBy.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    // Delete artykul (send request to api and refresh this component)
    // wait time is important to let changes to take place inside database
    // so we can load new data (or you can try to remove deleted item from artykuls)

    //try to use window.confirm its very simple 
    handleDelete(id) {
        if (window.confirm("Do you want to delete Artykul" + id) === true) 
                fetch('api/Artykuls/' + id, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));                    
    } 

    //not the best way to refresh the page :(:
    refresh() {
        this.props.history.push("/");
        this.props.history.push("/artykuls");
    }


    //Since we have only have ids in the table(and artykuls hash)
    //we have to get names from stored kategorias and producents hash
    //not the best way to do this if you will find some other better way, use it;)
    findKategoriaName(id) {
        var kat = this.state.kategorias;
        for (var i in kat) {
            if (id === kat[i].idKategoria)
                return kat[i].nazwa;
        };
        return "Kategoria not Found";
    }
    findProducentName(id) {
        var prod = this.state.producents;
        for (var i in prod) {
            if (id === prod[i].idProducent)
                return prod[i].nazwa;
        };
        return "Producent not Found";
    }


    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'word':
                if (value != '') {
                    var arts = this.state.artykuls;
                    var new_art = new Array();
                    for (var i = 0; i < arts.length; i++) {
                        if (arts[i].nazwa.includes(value))
                            new_art.push(arts[i]);
                    }
                    this.setState({ filtered: new_art, word: value });
                }
                else {
                    var arts = this.state.artykuls;
                    this.setState({ filtered: arts, word: '' });
                }

                break;
            default:
                console.log("Unknown");
                break;
        }
    }


    compareBy(key) {
     return function (a, b) {
       if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
       return 0;
     };
    }
 
    sortBy(key) {
        let arrayCopy = [...this.state.filtered];
    arrayCopy.sort(this.compareBy(key));
        this.setState({ filtered: arrayCopy});
    }


    //when called from render() returns actual html table that
    //map is something like for( var i in list)
    //you cant write js code inside html , but you need you use {} brackets
    renderArtykulsTable(artykuls) {
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
                        <th onClick={() => this.sortBy('kod')}>Kod</th>
                        <th onClick={() => this.sortBy('illosc')} >Illosc</th>
                        <th onClick={() => this.sortBy('idKategoria')}>Kategoria</th>
                        <th onClick={() => this.sortBy('idProducent')}>Producent</th>
                    </tr>
                </thead>
                <tbody>
                    {artykuls.map(artykul =>
                        <tr key={artykul.idArtykul}>
                            <td>{artykul.nazwa}</td>
                            <td>{artykul.kod}</td>
                            <td>{artykul.illosc}</td>
                            <td>{this.findKategoriaName(artykul.idKategoria)}</td>
                            <td>{this.findProducentName(artykul.idProducent)}</td>
                            <td><a className="action" onClick={(id) => this.handleDelete(artykul.idArtykul)}>Delete</a></td>
                            <td><Link className="links" to={'artykul_edit/' + artykul.idArtykul}>Edit</Link></td>
                        </tr>
                    )}
                </tbody>
                </table>
                </div>
        );
    }


    //this function returns what actually is rendered with ReactDOM
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderArtykulsTable(this.state.filtered);

        return (
            <div>
                <h1>Artykuly</h1>
                {contents}
                <p>
                    <Link to="/artykul_new">Create New</Link>
                </p>
            </div>
        );
    }
}