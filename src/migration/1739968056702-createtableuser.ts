import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Createtableuser1739968056702 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
        name: 'users',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'name',
                type: 'varchar',
                length: '200',
                isNullable: false
            },
            {
                name: 'profile',
                type: 'enum',
                enum: ['DRIVER', 'BRANCH', 'ADMIN'],
                isNullable: false
            },
            {
                name: 'email',
                type: 'varchar',
                length: '150',
                isUnique: true,
                isNullable: false
            },
            {
                name: 'password_hash',
                type: 'varchar',
                length: '150',
                isNullable: false
            },
            {
                name: 'status',
                type: 'boolean',
                default: true
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            },
            {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()'
            }
        ]
    }))
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
}
}
