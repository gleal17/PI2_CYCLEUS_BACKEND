import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, } from "typeorm";
import { Lock } from './Lock';

@Entity()
export class User {
  @PrimaryColumn({length: 9,})
  matricula: string;

  @Column({length: 50,})
  fullName: string;

  @Column({length: 50,})
  email: string;

  @Column({length: 50,})
  password: string;

  @OneToOne(() => Lock, idlock => lock.idLock, {nullable: true})
  @JoinColumn()
  idLock: Lock;
}
