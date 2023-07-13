<<<<<<< HEAD
import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
=======
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9
  @PrimaryColumn({ length: 9 })
  matricula: string;

  @Column({ length: 50 })
  fullName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  password: string;
<<<<<<< HEAD

  // isActive

  // from -> De onde ele tirou a bike
=======
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9
}
