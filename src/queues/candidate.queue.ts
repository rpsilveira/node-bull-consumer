import { Queues } from '../enums';
import BaseQueue from './base.queue';
import { Candidate } from '../entity/candidate.entity';
import MySql from '../mysql';
import RedisCli from '../redis';
import { socketIo } from '../server';

const redis = RedisCli.getInstance();

/**
 * Classe Singleton
 */
export default class CandidateQueue extends BaseQueue {
  private static instance: CandidateQueue;
  public static getInstance(): CandidateQueue {
    if (!CandidateQueue.instance) {
      CandidateQueue.instance = new CandidateQueue();
    }
    return CandidateQueue.instance;
  }

  /**
   * Colocamos como private para impedir a instância via new
   */
  private constructor() {
    super(Queues.candidate);
    this.queue.process((data) => this.process(data));
  }

  private async process({ data }) {
    console.log(data);
    await this.createCandidate(data);
  }

  private async createCandidate({ name, partyNumber, photo }) {
    console.log('Criando novo candidato');
    const candidate = new Candidate();
    candidate.name = name;
    candidate.partyNumber = partyNumber;
    candidate.photo = photo;

    await MySql.manager.save(candidate);

    console.log(`Candidato ${name} - ${partyNumber} criado com suceso.`);

    const candidates = await MySql.manager.find(Candidate);
    await redis.setJSON('candidates', candidates);
    this.emitSocket(candidates);
  }

  private emitSocket(candidates) {
    socketIo.emit('candidates', candidates);
    console.log('Candidatos enviados via socket');
  }

}
