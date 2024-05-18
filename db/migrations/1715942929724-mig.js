const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Mig1715942929724 {
    name = 'Mig1715942929724'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "message" ("id" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'RICH_TEXT', "readAt" TIMESTAMP, "sentAt" TIMESTAMP, "deletedAtOwner" TIMESTAMP, "deletedAtRecipient" TIMESTAMP, "channelId" character varying, "senderId" character varying, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_5fdbbcb32afcea663c2bea2954f" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_5fdbbcb32afcea663c2bea2954f"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }
}
