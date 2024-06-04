const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1717465410070 {
    name = 'Migration1717465410070'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`monedas\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nombre\` varchar(255) NOT NULL,
                \`acronimo\` tinytext NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`productos_precios\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_producto\` int NOT NULL,
                \`id_moneda\` int NOT NULL,
                \`precio\` decimal(10, 2) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                \`productoId\` int NULL,
                UNIQUE INDEX \`REL_48c415107749fc5dfce8d3e9db\` (\`id_moneda\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`productos\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_precio\` int NOT NULL,
                \`nombre\` varchar(255) NOT NULL,
                \`descripcion\` mediumtext NOT NULL,
                \`activo\` tinyint NOT NULL DEFAULT 1,
                UNIQUE INDEX \`name-idx-UNIQUE\` (\`nombre\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`productos_precios\`
            ADD CONSTRAINT \`FK_48c415107749fc5dfce8d3e9db2\` FOREIGN KEY (\`id_moneda\`) REFERENCES \`monedas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`productos_precios\`
            ADD CONSTRAINT \`FK_898da11c099ee03cc1421ee10d1\` FOREIGN KEY (\`productoId\`) REFERENCES \`productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`productos_precios\` DROP FOREIGN KEY \`FK_898da11c099ee03cc1421ee10d1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`productos_precios\` DROP FOREIGN KEY \`FK_48c415107749fc5dfce8d3e9db2\`
        `);
        await queryRunner.query(`
            DROP INDEX \`name-idx-UNIQUE\` ON \`productos\`
        `);
        await queryRunner.query(`
            DROP TABLE \`productos\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_48c415107749fc5dfce8d3e9db\` ON \`productos_precios\`
        `);
        await queryRunner.query(`
            DROP TABLE \`productos_precios\`
        `);
        await queryRunner.query(`
            DROP TABLE \`monedas\`
        `);
    }
}
