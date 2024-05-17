const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Mig1715718412207 {
    name = 'Mig1715718412207'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "channel" ("id" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."channel_type_enum" NOT NULL DEFAULT 'INDIVIDUAL', "hash" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" character varying, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userName" character varying NOT NULL, "messages" character varying array, "profilePicture" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'RICH_TEXT', "readAt" TIMESTAMP, "sentAt" TIMESTAMP, "deletedAtOwner" TIMESTAMP, "deletedAtRecipient" TIMESTAMP, "channelId" character varying, "senderId" character varying, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "data_file" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "content" bytea NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL DEFAULT '0', "uid" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_402e5f31556c4c14fcd4e804fec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_channels" ("userId" character varying NOT NULL, "channelId" character varying NOT NULL, CONSTRAINT "PK_f5b3ef656341f3c230d38b62fab" PRIMARY KEY ("userId", "channelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f84fc0335b0428fac9f618de5" ON "user_channels" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0676fe2e56c156bc5e18011cea" ON "user_channels" ("channelId") `);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_bdfef605fedc02f3f9d60f1bc07" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_5fdbbcb32afcea663c2bea2954f" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_channels" ADD CONSTRAINT "FK_5f84fc0335b0428fac9f618de52" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_channels" ADD CONSTRAINT "FK_0676fe2e56c156bc5e18011cea4" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_channels" DROP CONSTRAINT "FK_0676fe2e56c156bc5e18011cea4"`);
        await queryRunner.query(`ALTER TABLE "user_channels" DROP CONSTRAINT "FK_5f84fc0335b0428fac9f618de52"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_5fdbbcb32afcea663c2bea2954f"`);
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_bdfef605fedc02f3f9d60f1bc07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0676fe2e56c156bc5e18011cea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f84fc0335b0428fac9f618de5"`);
        await queryRunner.query(`DROP TABLE "user_channels"`);
        await queryRunner.query(`DROP TABLE "data_file"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "channel"`);
    }
}
