
import { Column, Entity, PrimaryGeneratedColumn,OneToOne,CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Driver } from "./Driver";
import { Branch } from "./Branch";

export enum EnumProfile {
  DRIVER = "DRIVER",
  BRANCH = "BRANCH",
  ADMIN = "ADMIN",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({ type: "enum", nullable: false, enum: EnumProfile })
  profile: EnumProfile;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
    email: string

    @Column({ type: 'varchar', length: 150, nullable: false})
    password_hash: string

    @Column({ type: 'boolean', default: true})
    status: boolean

    @OneToOne(() => Branch, branch => branch.user, { cascade: true })
    branch: Branch

    @OneToOne(() => Driver, driver => driver.user, { cascade: true })
    driver: Driver

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date
}

/*Estrutura da Tabela users (Migração necessária):
id: PK
name: varchar(200) NOT NULL
profile: ENUM('DRIVER', 'BRANCH', ‘ADMIN’) NOT NULL
email: varchar(150) UNIQUE NOT NULL
password_hash: varchar(150) NOT NULL
status: boolean (default: TRUE)
created_at: Timestamp (default now())
updated_at: Timestamp (default now()
*/
