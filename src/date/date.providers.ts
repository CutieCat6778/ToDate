import { Connection } from 'mongoose';
import { DateSchema } from '../schema/user.schema';

export const datesProviders = [
  {
    provide: 'DATE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Date', DateSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];