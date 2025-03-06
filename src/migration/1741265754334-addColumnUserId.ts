import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnUserId1741265754334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("movements", new TableColumn({
            name: "driver_id",
            type: "int",
            isNullable: true // Se quiser permitir que seja opcional, mude para true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("movements", "driver_id");
    }

}
