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

    @Column({ unique: true })
    station: string;

    @OneToOne(() => User, {nullable: true, default: null})
    @JoinColumn()
    user: User
}