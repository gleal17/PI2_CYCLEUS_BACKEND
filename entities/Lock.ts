import { Entity, PrimaryGeneratedColumn, Column, OneToOne, } from "typeorm"
import { User } from "./User"


@Entity()
export class Lock {
    @PrimaryGeneratedColumn()
    idLock: number;

    @Column("text")
    QRCode: string;

    @Column({ default: false })
    locked: boolean;

    @Column()
    station: string;

    @OneToOne(() => User, user => user.matricula)
    user: User;
}