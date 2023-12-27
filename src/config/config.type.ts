export type configType = {
  appPort: number;
  appPrefix: string;
  appHost: string;
  swaggerUi: string;
  swaggerEnable: boolean;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbDatabase: string;
  dbHost: string;
  dbLog: boolean;
  jwtSecret: string;
  jwtExpiresIn: string;
};
