import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';
import YAML from 'yaml';

import { isDevl } from '@/lib/util';
import { Settings } from '@/lib/types';

const developmentConfigPath = path.join(process.cwd(), '..', 'bin', 'config.yaml');
const prodConfigPath = path.join(process.cwd(), 'config.yaml');
const configFilePath = isDevl() ? developmentConfigPath : prodConfigPath;

function handleGet(req: NextApiRequest, res: NextApiResponse<Settings>) {
  const configContents = fs.readFileSync(configFilePath, 'utf8');
  const configParsed = YAML.parse(configContents);

  if (!configParsed.settings) {
    return res.status(400).end('Config file is malformed');
  }

  res.json(configParsed.settings as Settings);
}

function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // TODO: add server-side payload validation
  // TODO: it would be nice if this didn't remove comments or whitespace
  const configContents = fs.readFileSync(configFilePath, 'utf8');
  const configParsed = YAML.parse(configContents) as { settings: Settings };
  const updatedSettings = req.body as Partial<Settings>;

  const newConfig = {
    settings: {
      ...configParsed.settings,
      ...updatedSettings,
    },
  };

  const newConfigString = YAML.stringify(newConfig);

  try {
    fs.writeFileSync(configFilePath, newConfigString);
  } catch (err) {
    return res.status(500).end('Could not update config file. Make sure it is writable.');
  }

  res.status(200).send('Ok');
}

// TODO: refactor
export default async function handler(req: NextApiRequest, res: NextApiResponse<Settings>) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} not allowed`);
  }
}
