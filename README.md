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
- [Great, how do I use it?](#great-how-do-i-use-it)
- [Development](#development)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## About the Project

TekkenLearningPlatform keeps track of your matches and provides statistics to help you improve as a player. Optionally, it can also record your matches and automatically upload them to YouTube.

### Features

- Detects when you enter and exit matches
  - Automatically start recording to video when you enter a match
  - Automatically pause recording when you exit a match
  - Match results are saved
- A web application that shows you key performance metrics for your characters
  - Statistics for certain matchups and stages
  - A list of your most played opponents (rivals) and how you perform against them
  - A match history allowing you to check details for every single match you played and watch your recording
- Automatically uploads your recordings to your YouTube channel
- Individual featues can be turned on/off

### Planned Features

- Queue up video uploads and wait until the game is closed to do so
- Improve YouTube video metadata for uploaded recordings
- Handle cleanup when the recorder process is exited manually
- Improve learning capabilities
  - Improve display of input notations in the recording
  - Add frame data to the recording
  - Add missed punishment opportunities to the recording
  - Add additional statistics to matches
    - Moves you get hit most often by
    - Moves that you failed to punish most often
    - Your most used moves and whether they hit or whiffed or were punished
- Add pagination to match history (currently limited the latest 10 games)

### Known Bugs and Limitations

- If you close the recorder process, it will not stop any active recordings or upload them
- Matches ending prematurely e.g. due to disconnects are not detected properly
- Videos are uploaded to YouTube during gameplay which may result in a bad connection

### Screenshots

<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/dashboard.png" alt="Dashboard" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/character_detail.png" alt="Character Statistics" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/match_history.png" alt="Match History" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/match_detail.png" alt="Match Details" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/rivals.png" alt="Rivals" />

## Great, how do I use it?

TL;DR: Download latest [tlp_win64.zip](https://github.com/marcelherd/TekkenLearningPlatform/releases), unpack it, start up Tekken 7, *then* doubleclick `start_all.bat`.

Please refer to the [installation instructions](https://github.com/marcelherd/TekkenLearningPlatform/wiki/User-Guide#installation) for advanced use cases.

## Development

The project is split into two modules:

- `tlp-recorder` (Node.js/TypeScript): reads Tekken's process memory, keeps track of matches played and optionally communicates with OBS Studio to automatically create video recordings.
-  `tlp-webapp` (Next.js/React/TypeScript): Starts a web application allowing you to view your statistics.

### Prerequisites

- Node.js v16.x.x (current LTS version)
- Yarn (`npm install -g yarn`) 
- To record videos, you need OBS Studio, using either
  - OBS Studio 27.2.0 or above with the [obs-websocket](https://github.com/obsproject/obs-websocket/releases/tag/5.0.0-beta1) plugin installed
  - OBS Studio 28.0.0 or above which includes this plugin by default

### Setup

Please refer to [Development environment setup](https://github.com/marcelherd/TekkenLearningPlatform/wiki/Development#development-environment-setup)

## License

Source code is distributed under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) License. See LICENSE.txt for more information.

## Contributing

Contributions are very welcome and much needed! As it is, the project is very barebones but functional.

If you'd like to collaborate, you can find me (Sταrs) on the [Modding Zaibatsu](https://discord.gg/nCAeJE4z5U) Discord.

## Acknowledgements

Huge thanks to [Kulagin](https://github.com/KulaGGin) for teaching me how to use CheatEngine and providing guidance.
