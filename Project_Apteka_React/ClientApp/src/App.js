import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Artykuls } from './components/Artykuls'
import { CreateArtykul } from './components/CreateArtykul'
import { EditArtykul } from './components/EditArtykul'
import { Kategorias } from './components/Kategorias'
import { CreateKategoria } from './components/CreateKategoria'
import { EditKategoria } from './components/EditKategoria'
import { Producents } from './components/Producents'
import { CreateProducent } from './components/CreateProducent'
import { EditProducent } from './components/EditProducent'





export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/artykuls' component={Artykuls} />
        <Route exact path='/artykul_new' component={CreateArtykul} />
        <Route exact path='/artykul_edit/:id' component={EditArtykul} />
        <Route path='/kategorias' component={Kategorias} />
        <Route exact path='/kategoria_new' component={CreateKategoria} />
        <Route exact path='/kategoria_edit/:id' component={EditKategoria} />
        <Route path='/producents' component={Producents} />
        <Route exact path='/producent_new' component={CreateProducent} />
        <Route exact path='/producent_edit/:id' component={EditProducent} />
      </Layout>
    );
  }
}
