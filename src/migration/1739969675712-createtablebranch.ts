import { MigrationInterface, QueryRunner,Table} from "typeorm";

export class Createtablebranch1739969675712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'branches',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'full_address',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'document',
                    type: 'varchar',
                    length: '30',
                    isNullable: false
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false
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
        await queryRunner.dropTable('branches')
    }

}
