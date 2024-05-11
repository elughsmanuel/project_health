import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { GENDER } from "../helpers/user-enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string = uuidv4();

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column({ default: '0.0' })
    accountBalance: string;

    @Column({ default: 0 })
    isOnline: number;

    @Column({ type: 'enum', enum: GENDER })
    gender: string;

    @Column()
    dob: string;

    @Column({ nullable: true })
    photoURL: string;

    @Column()
    country: string;

    @Column()
    lastIP: string;

    @Column({ default: '254' })
    countryCode: string;

    @Column()
    city: string;

    @Column()
    lastLogin: string;

    @Column({ nullable: true })
    hederaHTCAccountId: string;

    @Column({ nullable: true })
    hederaHTCPublicKey: string;

    @Column({ nullable: true })
    hederaHTCPrivateKey: string;

    @Column({ nullable: true })
    referralCode: string;

    @Column({ nullable: true })
    referralCodeSignUp: string;

    @Column({ nullable: true })
    dataConsentGranted: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
