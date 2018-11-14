import React, { Component } from 'react';
import './PokemonList.css';

export default class PokemonList extends Component { 

  render() {
    return (
      <div className="row"> 
        <div class="col-md-4">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">Card title</h4>
              <h6 class="card-subtitle text-muted">Support card subtitle</h6>
              <p class="card-text p-y-1">Some quick example text to build on the card title .</p>
              <a href="#" class="card-link">link</a>
              <a href="#" class="card-link">Second link</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}