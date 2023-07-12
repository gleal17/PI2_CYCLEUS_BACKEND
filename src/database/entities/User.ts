import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn({length: 9})
  matricula: string;

  @Column({length: 50})
  fullName: string;

  @Column({length: 50})
  email: string;

  @Column({length: 50})
  password: string;
}
