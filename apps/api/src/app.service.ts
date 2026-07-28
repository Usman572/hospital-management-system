import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const appName = this.configService.get<string>('app.name');
    const environment = this.configService.get<string>('app.environment');

    return `${appName} running in ${environment} mode`;
  }
}
