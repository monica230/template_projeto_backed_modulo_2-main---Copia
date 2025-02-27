import { MigrationInterface, QueryRunner,TableForeignKey } from "typeorm";

export class Createforrignkey1740076063814 implements MigrationInterface {


        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createForeignKey(
                'drivers', new TableForeignKey({
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onDelete: 'CASCADE'
                }))
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            const table = await queryRunner.getTable('drivers');
            const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('user_id'));
            if (foreignKey) {
        await queryRunner.dropForeignKey('users', foreignKey);
            }
            await queryRunner.dropTable('users');
            await queryRunner.dropTable('drivers');
        }
    }


    


