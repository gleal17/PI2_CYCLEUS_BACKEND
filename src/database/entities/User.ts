import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ length: 9 })
  matricula: string;

  @Column({ length: 50 })
  fullName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  password: string;

  // isActive

  // from -> De onde ele tirou a bike
}
