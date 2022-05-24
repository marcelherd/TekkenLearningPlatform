import OBSWebSocket from 'obs-websocket-js';

import { TickEventData } from '@/tekken/state';
import getNotation from '@/tekken/notation';

export default class Broker {
  private static instance: Broker;

  private obs: OBSWebSocket;

  private constructor() {
    this.obs = new OBSWebSocket();
  }

  static async getInstance(): Promise<Broker> {
    if (Broker.instance) return Broker.instance;

    const instance = new Broker();
    await instance.connect();
    Broker.instance = instance;

    return instance;
  }

  async connect(): Promise<void> {
    await this.obs.connect('ws://127.0.0.1:4455', process.env.OBS_WS_SECRET);
  }

  async startRecording(): Promise<void> {
    await this.obs.call('StartRecord');
  }

  async stopRecording(): Promise<void> {
    await this.obs.call('StopRecord');
  }

  async pauseRecording(): Promise<void> {
    await this.obs.call('PauseRecord');
  }

  async resumeRecording(): Promise<void> {
    await this.obs.call('ResumeRecord');
  }

  async getRecordingStatus(): Promise<{
    outputActive: boolean;
    ouputPaused: boolean;
    outputTimecode: string;
    outputDuration: number;
    outputBytes: number;
  }> {
    return this.obs.call('GetRecordStatus');
  }

  async updateMetadataFromTick(data: TickEventData) {
    const { playerInput, opponentInput } = data;

    await this.updateText('p1move', getNotation(playerInput));
    await this.updateText('p2move', getNotation(opponentInput));
  }

  async updateText(sourceName: string, text: string): Promise<void> {
    await this.obs.call('SetInputSettings', {
      inputName: sourceName,
      inputSettings: {
        text,
      },
    });
  }

  async clearAllText(): Promise<void> {
    const sources = ['p1move', 'p2move', 'p1framedata', 'p2framedata'];
    const updates = sources.map((source) => this.updateText(source, ''));
    await Promise.all(updates);
  }
}
