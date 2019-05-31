import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Artykuls } from './components/Artykuls'
import { CreateArtykul } from './components/CreateArtykul'
import { EditArtykul } from './components/EditArtykul'



export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/artykuls' component={Artykuls} />
        <Route exact path='/artykul_new' component={CreateArtykul} />
        <Route exact path='/artykul_edit/:id' component={EditArtykul} />
      </Layout>
    );
  }
}
//