// import { DataSource, DataSourceOptions } from 'typeorm';
// import configs from './src/config/app.config';
// import { Coffee } from 'src/coffees/entities/coffee.entity';
// import { Flavor } from 'src/coffees/entities/flavor.entity';
// import { SchemaSync1718407932074 } from 'src/migrations/1718407932074-SchemaSync';

// const configurationValues = configs().database.configs;

// console.log(configurationValues);

// export default new DataSource({
//   type: configurationValues.type as DataSourceOptions['type'],
//   host: configurationValues.host,
//   port: configurationValues.port,
//   username: configurationValues.username as string,
//   password: '1lluvC0ff33&C0d!n5',
//   database: configurationValues.database as string,
//   entities: [Coffee, Flavor],
//   migrations: [SchemaSync1718407932074],
//   // entities: ['src/**/*.entity{.ts,.js}'], // where our entities reside
//   // migrations: ['src/db/migrations/*{.ts,.js}'], // where our migrations reside
//   // entities: ['dist/**/*.entity{.ts,.js}'],
//   // migrations: ['dist/db/migrations/*{.ts,.js}'],
// } as DataSourceOptions);
