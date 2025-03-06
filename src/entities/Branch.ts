import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Movement } from "./Movements";

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

    @OneToMany(() =>Product, product => product.branch)
    products: Product[]

    @OneToMany(() => Movement, movement => movement.branch)
    movements: Movement[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date
}