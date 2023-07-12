import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Lock {
  @PrimaryGeneratedColumn()
  idLock: number;

  @Column('text')
  QRCode: string;

  @Column({ default: false })
  locked: boolean;

  @Column({ unique: true })
  station: string;

  // Pq deve ser nullable?
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
