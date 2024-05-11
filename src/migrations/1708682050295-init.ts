import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1708682050295 implements MigrationInterface {
    name = 'Init1708682050295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`accountBalance\` varchar(255) NOT NULL DEFAULT '0.0', \`isOnline\` int NOT NULL DEFAULT '0', \`gender\` enum ('male', 'female', 'unknown') NOT NULL, \`dob\` varchar(255) NOT NULL, \`photoURL\` varchar(255) NULL, \`country\` varchar(255) NOT NULL, \`lastIP\` varchar(255) NOT NULL, \`countryCode\` varchar(255) NOT NULL DEFAULT '254', \`city\` varchar(255) NOT NULL, \`lastLogin\` varchar(255) NOT NULL, \`hederaHTCAccountId\` varchar(255) NULL, \`hederaHTCPublicKey\` varchar(255) NULL, \`hederaHTCPrivateKey\` varchar(255) NULL, \`referralCode\` varchar(255) NULL, \`referralCodeSignUp\` varchar(255) NULL, \`dataConsentGranted\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
