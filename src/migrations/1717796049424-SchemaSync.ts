import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1717796049424 implements MigrationInterface {
  name = 'SchemaSync1717796049424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "flavor" ALTER COLUMN "slug" SET DEFAULT '5b9bf126-f537-4f28-ae7f-ea903c1fcd23'`,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee" ALTER COLUMN "slug" SET DEFAULT '47a52803-f5bf-44e3-aa55-fe240731a868'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ALTER COLUMN "slug" SET DEFAULT 'a5027ca7-9823-4726-be5d-ddf99f2a78a4'`,
    );
    await queryRunner.query(
      `ALTER TABLE "flavor" ALTER COLUMN "slug" SET DEFAULT '5d360bfc-f5e8-4b2e-aae5-91ef2b781fda'`,
    );
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
  }
}
