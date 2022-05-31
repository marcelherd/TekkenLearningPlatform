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
- [Installation](#installation)
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
- Individual featues can be turned on/off, see [Configuration](#configuration)

### Planned Features

- Make it easier to change the configuration
- Literally any kind of error handling
- Handle cleanup when the recorder process is exited manually
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

- There is virtually no error handling, if you don't use the program in exactly the way it is intended you are on your own
- If you close the recorder process, it will not stop any active recordings or clean up after itself in any way
- Matches ending prematurely e.g. due to disconnects are not detected properly
- Videos are uploaded to YouTube during gameplay which may result in a bad connection

### Screenshots

<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/dashboard.png" alt="Dashboard" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/character_detail.png" alt="Character Statistics" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/match_history.png" alt="Match History" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/match_detail.png" alt="Match Details" />
<img src="https://raw.githubusercontent.com/marcelherd/TekkenLearningPlatform/master/docs/rivals.png" alt="Rivals" />

## Great, how do I use it?

Please refer to the [installation instructions](https://github.com/marcelherd/TekkenLearningPlatform/wiki/Installation).

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
- To upload videos, you need to create a Google Cloud Platform project and set up credentials there (see [Configuration](#configuration))

### Installation

```sh
git clone https://github.com/marcelherd/TekkenLearningPlatform.git
cd TekkenLearningPlatform/tlp-recorder

# Install dependencies
yarn install
# Set up database
yarn prisma migrate dev
# Create the config file, see section below for specifics
touch .env

cd ../tlp-webapp
yarn install
```

### Configuration

Certain features of the recorder can be activated and deactivated or fine-tuned by setting environment variables in the `tlp-recorder/.env` file:

| Setting              | Description                                                                                                                                                                                                                                                                                                                                                       | Default Value    |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| SYNC_NOTATION        | If set to true, it will update the text sources "p1move" and "p2move" in OBS Studio with each player's input. Requires OBS to be started before launching the program.                                                                                                                                                                                            | false            |
| SYNC_DATABASE        | If set to true, it will keep track of matches played and write them to the database.                                                                                                                                                                                                                                                                              | true             |
| RECORD_VIDEOS        | If set to true, it will automatically record video(s) via OBS for each match played and save it to your file system. Requires OBS to be started before launching the program.                                                                                                                                                                                     | false            |
| UPLOAD_VIDEOS        | If set to true, it will automatically upload any recorded videos to YouTube (even during the game!). If enabled, it will ask you to sign in via your browser as you start the program. Requires the file `tlp-recorder/credentials/google.keys.json` to exist with a valid OAuth client configuration. Will not do anything unless RECORD_VIDEOS is also enabled. | false            |
| CLEANUP_ENABLED      | If set to true, it will automatically delete your most recent recording from your filesystem after it was uploaded to YouTube.                                                                                                                                                                                                                                    | true             |
| CLEANUP_GRACE_PERIOD | How many milliseconds to wait after the upload of a recording was finished to delete the file from your filesystem.                                                                                                                                                                                                                                               | 5000             |
| TICK_INTERVAL        | How often the game's state is read from memory (interval in milliseconds).                                                                                                                                                                                                                                                                                        | 1                |
| OBS_GRACE_PERIOD     | How many milliseconds to wait before uploading a recording after it was just saved by OBS.                                                                                                                                                                                                                                                                        | 500              |
| MAX_BATCH_SIZE       | How many matches are included per video recording. As each video upload to YouTube requires a fixed amount of quota, it is quickly reached if you were to upload each match as a separate video. Set as high as possible to avoid reaching your quota too quickly. The program automatically pauses the recording between matches.                                | 10               |
| RECORDING_DIR_PATH   | The location on your harddrive where video recordings will be saved. You most likely HAVE to change this.                                                                                                                                                                                                                                                         | E:/Recording/TLP |
| OBS_WS_SECRET        | If you want to record your matches via OBS, you HAVE to enter your secret key here                                                                                                                                                                                                                                                                                |                  |
| LOG_LEVEL            | Set to `verbose` if you want more detailed logging.                                                                                                                                                                                                                                                                                                               |                  |
| DEBUG                | Set to `prisma*` if you want debug logging for the database access.                                                                                                                                                                                                                                                                                               |                  |

All available environment variables and their default values can also be found in [config.ts](https://github.com/marcelherd/TekkenLearningPlatform/blob/master/tlp-recorder/src/config.ts).

I recommend starting with the following sample `.env` file:

```
RECORDING_DIR_PATH=C:/temp/
# If you want to record your games, fill this in:
OBS_WS_SECRET=
```

You can find your OBS secret by starting up OBS Studio, clicking on `Tools` -> `obs-websocket Settings` -> `Show Connect Info` (`Server Password`). Ensure that the `Server Port` is set to `4455`.

If you want to upload your videos to YouTube, follow [this guide](https://developers.google.com/youtube/v3/quickstart/nodejs#step_1_turn_on_the) to create your credentials and save them to `tlp-recorder/credentials/google.keys.json`. Make sure to create a web client and use the following redirect URL: `http://localhost:5431/callback`.

### Running the application

Both module are started the same way:

```sh
# Run the application normally
yarn start
# Or run in development mode to automatically reload when code changes occur
yarn dev
```

The web application can be started up anytime, but you should have created the database file already by running `yarn prisma migrate dev` in the `tlp-recorder` module.

The recorder should be started up when Tekken 7 is already running.

### Building the application

```sh
# Required tools
npm install -g pkg
npm install -g yarn

# Checkout
git clone https://github.com/marcelherd/TekkenLearningPlatform.git
cd ./TekkenLearningPlatform

# Building the recorder
cd ./tlp-recorder
yarn install
yarn prisma generate
yarn build
pkg .
cd ..

# Building the webapp
cd ./tlp-webapp
yarn install
yarn prisma generate
yarn build
pkg .
cd ..

# Assemble /bin directory
cd ./bin
cp ../tlp-recorder/pkg/tlp-recorder.exe .
cp ../tlp-webapp/pkg/tlp-webapp.exe .
```

The `/bin` directory already includes a blank `database.db` file. You can build it yourself:

```sh
cd ./tlp-recorder
yarn prisma migrate dev
cp ./prisma/database.db ../bin
```

See also: [.github/workflows/main.yml](https://github.com/marcelherd/TekkenLearningPlatform/blob/master/.github/workflows/main.yml).

## License

Distributed under the [GNU GPLv3](https://choosealicense.com/licenses/mit/) License. See LICENSE.txt for more information.

## Contributing

Contributions are very welcome and much needed! As it is, the project is very barebones but functional.

If you'd like to collaborate, you can find me (Sταrs) on the [Modding Zaibatsu](https://discord.gg/nCAeJE4z5U) Discord.

## Acknowledgements

Huge thanks to [Kulagin](https://github.com/KulaGGin) for teaching me how to use CheatEngine and providing guidance.
