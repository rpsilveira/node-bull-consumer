import { Queues } from '../enums';
import BaseQueue from './base.queue';
import Transport from '../email';
import configs from '../configs';

/**
 * Classe Singleton
 */
export default class EmailQueue extends BaseQueue {
  private static instance: EmailQueue;
  public static getInstance(): EmailQueue {
    if (!EmailQueue.instance) {
      EmailQueue.instance = new EmailQueue();
    }
    return EmailQueue.instance;
  }

  /**
   * Colocamos como private para impedir a instância via new
   */
  private constructor() {
    super(Queues.email);
    this.queue.process(this.process);
  }

  private async process({ data }) {
    console.log(data);
    await Transport.sendMail({
      to: configs.mail.default.to,
      from: configs.mail.default.from,
      subject: 'este é um e-mail para teste',
      text: JSON.stringify(data),
    })
    console.log('e-mail enviado com sucesso!');
  }
}
