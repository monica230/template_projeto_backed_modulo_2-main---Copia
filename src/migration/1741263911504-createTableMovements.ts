import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableMovements1741263911504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: 'movements',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'destination_branch_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'product_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['PENDING', 'IN_PROGRESS', 'FINISHED'],
                    default: "'PENDING'"
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
        await queryRunner.dropTable('movements')
    }

}
