const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Mig1715940177464 {
    name = 'Mig1715940177464'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."channel_type_enum" AS ENUM('INDIVIDUAL', 'GROUP')`);
        await queryRunner.query(`CREATE TABLE "channel" ("id" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."channel_type_enum" NOT NULL DEFAULT 'INDIVIDUAL', "hash" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" character varying, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "profilePicture" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'RICH_TEXT', "readAt" TIMESTAMP, "sentAt" TIMESTAMP, "deletedAtOwner" TIMESTAMP, "deletedAtRecipient" TIMESTAMP, "channelId" character varying, "senderId" character varying, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "data_file" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "content" bytea NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL DEFAULT '0', "uid" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_402e5f31556c4c14fcd4e804fec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_bdfef605fedc02f3f9d60f1bc07" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_5fdbbcb32afcea663c2bea2954f" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_5fdbbcb32afcea663c2bea2954f"`);
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_bdfef605fedc02f3f9d60f1bc07"`);
        await queryRunner.query(`DROP TABLE "data_file"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "channel"`);
        await queryRunner.query(`DROP TYPE "public"."channel_type_enum"`);
    }
}
