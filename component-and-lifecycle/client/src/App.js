import React, { Component } from 'react';
import './App.css';
import Slider from './components/Slider';
import Card from './components/Card';
import CardDetails from './components/Card-details';

const API = 'http://localhost:9999/';
const ROSTER_QUERY = 'roster';
const EPISODE_QUERY = 'episodePreview/';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      isLoading: false, 
      episode: null, 
      roster: [], 
      index: 0
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
    const { episode, roster } = this.state;
    const index = (episode.id + 1 > roster) ? episode.id : episode.id + 1; 
    const response = await this.getEpisode(index);

    this.setState({ episode: response, index })
  }

  prevSlide = async () => { 
    const { episode } = this.state;
    const index = (episode.id - 1 < 0) ? 0 : episode.id - 1; 
    const response = await this.getEpisode(index);

    this.setState({ episode: response, index })
  }

  render() {
    const { roster, index } = this.state;
    return (
      <div className="App">
        <div className="App-content"> 
          <Slider { ...this.state } prev={this.prevSlide} next={this.nextSlide}/>
        </div>
        <div className="App-content-slider">
          <div className={`App-cards-slider active-slide-${index}`}>
            <div className="App-cards-slider-wrapper" style={{
                  'transform': `translateX(-${index*(100/roster.length)}%)`
                }}>
              { roster && roster.length > 0 &&
                roster.map((episode) => <Card key={episode.id} {...episode}/>)
              }
            </div>
          </div>
        </div>
        <div className="App-content">
          { roster && roster[index] &&
            <CardDetails {...roster[index]} />
          }
        </div>
      </div>
    );
  }
}

export default App;
