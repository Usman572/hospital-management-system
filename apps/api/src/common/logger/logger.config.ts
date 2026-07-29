import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig = WinstonModule.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, context }) => {
          return `${timestamp} [${context || 'Application'}] ${level}: ${message}`;
        }),
      ),
    }),
  ],
});