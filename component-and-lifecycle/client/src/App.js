import React, { Component } from 'react';
import './App.css';
import Slider from './components/Slider';

const API = 'http://localhost:9999/';
const ROSTER_QUERY = 'roster';
const EPISODE_QUERY = 'episodePreview/';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      isLoading: false, 
      episode: {
        id:0,
        url:"https://i.imgur.com/B31Uwkm.png"
    }
    }
  }

  async componentDidMount() {
    // re-render
    this.setState({isLoading: true});

    try {
      const roster = await this.getRoster();
      const episode = await this.getEpisode();

      await this.setState({
        isLoading: false,
        roster: roster, 
        episode: episode 
      });

    } catch(error) { 
       this.setState({
        isLoading: false,
        error 
      });
    }

  }

 async getEpisode(episode = 0) { 
    const response = await fetch(API + EPISODE_QUERY + episode);
    return await response.json();
  }

  async getRoster() { 
    const response = await fetch(API + ROSTER_QUERY);
    return await response.json();
  }

  nextSlide = async () => { 
    const index = this.state.episode.id + 1; 
    const episode = await this.getEpisode(index);
    this.setState({ episode })
  }

  prevSlide = async () => { 
    const index = (this.state.episode.id - 1 < 0) ? 0 : this.state.episode - 1; 
    const episode = await this.getEpisode(index);
    this.setState({ episode })
  }

  render() {
    return (
      <div className="App">
        <div className="App-content"> 
          <Slider { ...this.state } prev={this.prevSlide} next={this.nextSlide}/>
        </div>
      </div>
    );
  }
}

export default App;
