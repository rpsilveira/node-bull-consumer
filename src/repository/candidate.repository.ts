import { Candidate } from '../entity/candidate.entity';
import Mysql from '../mysql';

export const userRepository = Mysql.getRepository(Candidate);
