import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity('branches')
export class Branch {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    full_address: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    document: string

    @Column({ type: 'int', nullable: false })
    user_id: number

    @OneToOne(() => User, user => user.branch)
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date
}