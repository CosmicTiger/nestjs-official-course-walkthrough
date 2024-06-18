export default () => ({
  database: {
    configs: {
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'illuvcoffee',
      password: '1lluvC0ff33&C0d!n5',
      database: 'illuvcoffee_test_db',
      autoLoadEntities: true,
      synchronize: true,
    },
  },
});
