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
- [Contributing](#contributing)
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

<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/dashboard.png" alt="Dashboard" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/character_detail.png" alt="Character Statistics" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/match_history.png" alt="Match History" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/match_detail.png" alt="Match Details" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/rivals.png" alt="Rivals" />

## Installation

Work in progress

## Development

The project is split into two modules:

- `tlp-recorder`
  -  Using Node.js/TypeScript, it reads Tekken's process memory to determine the game's state and saves that information to a SQLite database
  -  Optionally it can communicate with OBS Studio using websockets to automatically start recording as you get into matches and automatically pauses the recording when the match is done
  -  Button presses can be sent to OBS Studio to show up in the recording or in streams
  -  Recordings can get uploaded to YouTube automatically
-  `tlp-webapp`
  -  Using Next.js/React/TypeScript, it starts up a web application that displays the data that was recoded by `tlp-recorder`
  -  It computes relevant statistics for your characters including matchup and stage statistics
  -  It shows your match history and allows you to view your uploaded video recordings for each match

### Prerequisites

- Node.js v16.x.x (current LTS version)
- Yarn (`npm install -g yarn`) 
- To record videos, you need OBS Studio, using either
  - OBS Studio 27.2.0 or above with the [obs-websocket](https://github.com/obsproject/obs-websocket/releases/tag/5.0.0-beta1) plugin installed
  - OBS Studio 28.0.0 or above which includes this plugin by default
- To upload videos, you need to create a Google Cloud Platform project and create an OAuth client with redirect uri `http://localhost:5431/callback`

### Installation

```sh
git clone https://github.com/marcelherd/TekkenLearningPlatform.git
cd TekkenLearningPlatform/tlp-recorder

# Install dependencies
yarn install
# Set up database
yarn prisma migrate dev

cd ../tlp-webapp
yarn install
```

### Running the application

Both module are started the same way:

```sh
# Run the application normally
yarn start
# Or run in development mode to automatically reload when code changes occur
yarn dev
```

## License

Distributed under the [GNU GPLv3](https://choosealicense.com/licenses/mit/) License. See LICENSE.txt for more information.

## Contributing

Contributions are very welcome and much needed! As it is, the project is very barebones but functional. If you'd like to collaborate, you can find me on the [Modding Zaibatsu](https://discord.gg/nCAeJE4z5U) Discord.

## Acknowledgements

Huge thanks to [Kulagin](https://github.com/KulaGGin) for teaching me how to use CheatEngine and providing guidance
