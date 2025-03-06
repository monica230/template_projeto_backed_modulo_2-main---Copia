import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from "typeorm";
import { Branch } from "./Branch";
import { Movement } from "./Movements";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 200, nullable: false})
    name: string;

    @Column({type: 'int', nullable: false})
    amount: number;

    @Column({type: 'varchar', length: 200, nullable: false})
    description: string;

    @Column({type: 'varchar', length: 200, nullable: true})
    url_cover: string;

    @Column({type: 'int', nullable: false})
    branch_id: number;

    @ManyToOne(() => Branch, branch => branch.products)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @OneToMany(() => Movement, movement => movement.product)
    movements: Movement[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}