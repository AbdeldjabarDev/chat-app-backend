const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Mig1715955757466 {
    name = 'Mig1715955757466'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_5fdbbcb32afcea663c2bea2954" ON "message" ("channelId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_5fdbbcb32afcea663c2bea2954"`);
    }
}
