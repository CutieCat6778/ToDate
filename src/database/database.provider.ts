import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://admin:!Txzje2006@main.kftf81n.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
