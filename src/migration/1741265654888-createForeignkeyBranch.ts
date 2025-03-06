import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignkeyBranch1741265654888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
             'movements',
             new TableForeignKey({
                 columnNames: ['destination_branch_id'],
                 referencedColumnNames: ['id'],
                 referencedTableName: 'branches',
                 onDelete: 'CASCADE'
             })
         )
     }
 
     public async down(queryRunner: QueryRunner): Promise<void> {
         const table = await queryRunner.getTable('movements');
         const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('destination_branch_id'));
         if (foreignKey) {
           await queryRunner.dropForeignKey('branches', foreignKey);
         }
         await queryRunner.dropTable('movements');
         await queryRunner.dropTable('branches');
     }

}
