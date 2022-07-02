import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Candidate } from './candidate.entity';

@Entity()
export class Vote {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    partyNumber: number;

    @ManyToOne(() => Candidate)
    @JoinColumn({ name: 'partyNumber' })
    candidate: Candidate;
}
