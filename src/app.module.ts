import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      typePaths: ['src/graphql/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/definitions/graphql.def.ts'),
        outputAs: 'class',
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
