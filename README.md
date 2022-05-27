<div align="center">
  <h1>TekkenLearningPlatform</h1>
  <p>Keeps track of your matches and provides statistics to help you improve as a player</p>
  
  <a href="https://github.com/marcelherd/TekkenLearningPlatform/commits/master">
    <img src="https://img.shields.io/github/last-commit/marcelherd/TekkenLearningPlatform" alt="Last commit" />
  </a>
  <a href="https://github.com/marcelherd/TekkenLearningPlatform/issues/">
    <img src="https://img.shields.io/github/issues/marcelherd/TekkenLearningPlatform" alt="Issues" />
  </a>
  <a href="https://github.com/marcelherd/TekkenLearningPlatform/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/github/license/marcelherd/TekkenLearningPlatform" alt="License" />
  </a>
   
<h4>
    <a href="https://www.youtube.com/watch?v=TAY12rH-hs4">View Demo</a>
  <span> · </span>
    <a href="https://github.com/marcelherd/TekkenLearningPlatform/issues/">Report Bug</a>
  </h4>
</div>

<br />

# Table of Contents

- [About the Project](#about-the-project)
- [Development](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Tests](#running-tests)
  - [Run Locally](#run-locally)
  - [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About the Project

TekkenLearningPlatform keeps track of your matches and provides statistics to help you improve as a player. Optionally, it can also record your matches and automatically upload them to YouTube.

### Features

- Detect when you enter and exit matches
  - Automatically start recording to video when you enter a match
  - Automatically pause recording when you exit a match
  - Match results are saved
- A web application that shows you key performance metrics for your characters
  - Statistics for certain matchups and stages
  - A list of your most played opponents ("rivals") and how you perform against them
  - A match history allowing you to check details for every single match you played and watch the recording of it
- Automatically upload your recordings to your YouTube channel
- Individual featues can be turned on/off via undocumented environment variables (hehe)

### Planned Features

- Queue up video uploads and wait until the game is closed to do so
- Improve display of input notations in the recording
- Add frame data to the recording
- Add missed punishment opportunities to the recording
- Add pagination to match history (currently limited the latest 10 games)
- Improve YouTube video metadata for uploaded recordings
- Add additional statistics to matches
  - Moves you get hit most often by
  - Moves that you failed to punish most often
  - Your most used moves and whether they hit or whiffed or were punished

### Known Bugs and Limitations

- Matches ending prematurely e.g. due to disconnects are not detected properly
- Videos are uploaded to YouTube during gameplay which may results in a bad connection

### Screenshots

<img src="https://placehold.co/600x400?text=Working+on+it" alt="screenshot" />

## Installation

Work in progress

## Development

### Prerequisites

- Node.js v16.x.x (current LTS version)
- Yarn (`npm install -g yarn`) 
- To record videos, you need OBS Studio, using either
  - OBS Studio 27.2.0 or above with the [obs-websocket](https://github.com/obsproject/obs-websocket/releases/tag/5.0.0-beta1) plugin installed
  - OBS Studio 28.0.0 or above which includes this plugin by default
- To upload videos, you need to create a Google Cloud Platform project and create an OAuth client with redirect uri `http://localhost:5431/callback`

### Installation

```sh
# TODO
```

### Running Tests

```sh
# TODO
```

### Run Locally

```sh
# TODO
```

## License

Distributed under the [GNU GPLv3](https://choosealicense.com/licenses/mit/) License. See LICENSE.txt for more information.


## Acknowledgements

Huge thanks to [Kulagin](https://github.com/KulaGGin) for teaching me how to use CheatEngine and providing guidance
