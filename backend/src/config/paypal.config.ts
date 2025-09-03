import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Environment, LogLevel } from '@paypal/paypal-server-sdk';

@Injectable()
export class PaypalConfigService {
  private client: Client;

  constructor(private configService: ConfigService) {
    this.initializePaypal();
  }

  private initializePaypal() {
    this.client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: this.configService.get<string>('paypal.clientId') ?? '',
        oAuthClientSecret:
          this.configService.get<string>('paypal.secret') ?? '',
      },
      timeout: 0,
      environment: Environment.Sandbox,
      logging: {
        logLevel: LogLevel.Info,
        logRequest: {
          logBody: true,
        },
        logResponse: {
          logHeaders: true,
        },
      },
    });
  }

  getClient(): Client {
    return this.client;
  }
}
