import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignkeyProducts1741265297868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.createForeignKey(
                'movements',
                new TableForeignKey({
                    columnNames: ['product_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'products',
                    onDelete: 'CASCADE'
                })
            )
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            const table = await queryRunner.getTable('movements');
            const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('product_id'));
            if (foreignKey) {
              await queryRunner.dropForeignKey('products', foreignKey);
            }
            await queryRunner.dropTable('movements');
            await queryRunner.dropTable('products');
        }

}
