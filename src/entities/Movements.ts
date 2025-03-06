import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Branch } from "./Branch";
import { Product } from "./Product";
import { Driver } from "./Driver";

export enum movementStatusEnum {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
  }

@Entity('movements')
export class Movement {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    destination_branch_id: number;

    @Column({ type: 'int', nullable: false })
    product_id: number;

    @Column({ type: 'int', nullable: true })
    driver_id: number;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @Column({ type: 'enum', enum:  movementStatusEnum, default: 'PENDING' })
    status: movementStatusEnum;

    @ManyToOne(() => Branch, branch => branch.movements)
    @JoinColumn({ name: 'destination_branch_id' })
    branch: Branch;

    @ManyToOne(() => Product, product => product.movements)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Driver, driver => driver.movements)
    @JoinColumn({ name: 'driver_id' })
    driver: Driver;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}