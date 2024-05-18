const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Mig1715940420377 {
    name = 'Mig1715940420377'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "profilePicture" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "profilePicture" SET NOT NULL`);
    }
}
