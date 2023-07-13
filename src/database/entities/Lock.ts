<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Lock extends BaseEntity {
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Lock {
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9
  @PrimaryGeneratedColumn()
  idLock: number;

  @Column('text')
  QRCode: string;

  @Column({ default: false })
  locked: boolean;

  @Column({ unique: true })
  station: string;

<<<<<<< HEAD
  // lastUser
  // currentUser

  // timeOfLock
  // timeOfUnlock

  // @OneToOne(() => User, { nullable: true })
  // @JoinColumn()
  // user: User;
=======
  // Pq deve ser nullable?
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9
}
