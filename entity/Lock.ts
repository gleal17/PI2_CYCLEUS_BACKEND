import { Entity, PrimaryGeneratedColumn, Column, OneToOne, } from "typeorm";

@Entity()
export class Lock {
    @PrimaryGeneratedColumn()
    idLock: number;

    @Column("text")
    QRCode: string;

    @OneToOne(() => User, user => user.profile)
    user: User;
}