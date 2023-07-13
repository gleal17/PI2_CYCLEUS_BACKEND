import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689190803186 implements MigrationInterface {
    name = 'Default1689190803186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("matricula" character varying(9) NOT NULL, "fullName" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "PK_06dc5522d4fab0088897bc4f18e" PRIMARY KEY ("matricula"))`);
        await queryRunner.query(`CREATE TABLE "lock" ("idLock" SERIAL NOT NULL, "QRCode" text NOT NULL, "locked" boolean NOT NULL DEFAULT false, "station" character varying NOT NULL, "userMatricula" character varying(9), CONSTRAINT "UQ_ea3af32074fdad64f3b7d94cec5" UNIQUE ("station"), CONSTRAINT "REL_26fbe0b304280abe571ff3fd38" UNIQUE ("userMatricula"), CONSTRAINT "PK_5d8fd5004fd802f6254d67845d6" PRIMARY KEY ("idLock"))`);
        await queryRunner.query(`ALTER TABLE "lock" ADD CONSTRAINT "FK_26fbe0b304280abe571ff3fd380" FOREIGN KEY ("userMatricula") REFERENCES "user"("matricula") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lock" DROP CONSTRAINT "FK_26fbe0b304280abe571ff3fd380"`);
        await queryRunner.query(`DROP TABLE "lock"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
