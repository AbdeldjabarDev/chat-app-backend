const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Mig1715941345636 {
    name = 'Mig1715941345636'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_channels" ("userId" character varying NOT NULL, "channelId" character varying NOT NULL, CONSTRAINT "PK_f5b3ef656341f3c230d38b62fab" PRIMARY KEY ("userId", "channelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f84fc0335b0428fac9f618de5" ON "user_channels" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0676fe2e56c156bc5e18011cea" ON "user_channels" ("channelId") `);
        await queryRunner.query(`ALTER TABLE "user_channels" ADD CONSTRAINT "FK_5f84fc0335b0428fac9f618de52" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_channels" ADD CONSTRAINT "FK_0676fe2e56c156bc5e18011cea4" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_channels" DROP CONSTRAINT "FK_0676fe2e56c156bc5e18011cea4"`);
        await queryRunner.query(`ALTER TABLE "user_channels" DROP CONSTRAINT "FK_5f84fc0335b0428fac9f618de52"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0676fe2e56c156bc5e18011cea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f84fc0335b0428fac9f618de5"`);
        await queryRunner.query(`DROP TABLE "user_channels"`);
    }
}
