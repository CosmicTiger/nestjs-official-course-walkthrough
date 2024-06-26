import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1718407932074 implements MigrationInterface {
  name = 'SchemaSync1718407932074';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "flavor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL DEFAULT 'f3f6450f-0443-45dd-ac7f-488c2a9eaf82', "brand" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_934fe79b3d8131395c29a040ee5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coffee" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL DEFAULT '1f421543-12d8-43fb-9da4-c1a48cdb67e6', "name" character varying NOT NULL, "description" character varying, "brand" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "recommendation" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_4d27239ee0b99a491ad806aec46" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coffee_flavors_flavor" ("coffeeId" integer NOT NULL, "flavorId" integer NOT NULL, CONSTRAINT "PK_64cde86968c8b440e3c63626e80" PRIMARY KEY ("coffeeId", "flavorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9cb98a3799afc95cf71fdb1c4f" ON "coffee_flavors_flavor" ("coffeeId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25642975c6f620d570c635f418" ON "coffee_flavors_flavor" ("flavorId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "FK_9cb98a3799afc95cf71fdb1c4f9" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "FK_25642975c6f620d570c635f418d" FOREIGN KEY ("flavorId") REFERENCES "flavor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee_flavors_flavor" DROP CONSTRAINT "FK_25642975c6f620d570c635f418d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee_flavors_flavor" DROP CONSTRAINT "FK_9cb98a3799afc95cf71fdb1c4f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_25642975c6f620d570c635f418"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9cb98a3799afc95cf71fdb1c4f"`,
    );
    await queryRunner.query(`DROP TABLE "coffee_flavors_flavor"`);
    await queryRunner.query(`DROP TABLE "coffee"`);
    await queryRunner.query(`DROP TABLE "flavor"`);
  }
}
