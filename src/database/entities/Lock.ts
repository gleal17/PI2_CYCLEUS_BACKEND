import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Lock extends BaseEntity {
  @PrimaryGeneratedColumn()
  idLock: number;

  @Column('text')
  QRCode: string;

  @Column({ default: false })
  locked: boolean;

  @Column({ unique: true })
  station: string;

  // lastUser
  // currentUser

  // timeOfLock
  // timeOfUnlock

  // @OneToOne(() => User, { nullable: true })
  // @JoinColumn()
  // user: User;
}
