import OBSWebSocket from 'obs-websocket-js';

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
