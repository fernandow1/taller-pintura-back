const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1712166151386 {
    name = 'Migration1712166151386'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`empleados\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nombre\` varchar(255) NOT NULL,
                \`apellido\` varchar(255) NOT NULL,
                \`dni\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`fecha_nacimiento\` date NOT NULL,
                \`fecha_inicio_empleo\` date NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                UNIQUE INDEX \`dni-idx-UNIQUE\` (\`dni\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`usuarios\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`usuario\` varchar(50) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`id_empleado\` int NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                UNIQUE INDEX \`usuario_UNIQUE\` (\`usuario\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`clientes\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nombre\` varchar(255) NULL,
                \`apellido\` varchar(255) NULL,
                \`razon_social\` varchar(255) NULL,
                \`dni\` varchar(255) NULL,
                \`email\` varchar(255) NULL,
                \`categoria\` enum ('Privado', 'Municipal', 'Provincial', 'Nacional') NOT NULL DEFAULT 'Privado',
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`usuarios\`
            ADD CONSTRAINT \`FK_8469926fc9082fe7c3081e10cd3\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_8469926fc9082fe7c3081e10cd3\`
        `);
        await queryRunner.query(`
            DROP TABLE \`clientes\`
        `);
        await queryRunner.query(`
            DROP INDEX \`usuario_UNIQUE\` ON \`usuarios\`
        `);
        await queryRunner.query(`
            DROP TABLE \`usuarios\`
        `);
        await queryRunner.query(`
            DROP INDEX \`dni-idx-UNIQUE\` ON \`empleados\`
        `);
        await queryRunner.query(`
            DROP TABLE \`empleados\`
        `);
    }
}
