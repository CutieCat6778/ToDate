import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: "src/graphql/user.graphql",
      typePaths: ['src/graphql/*.graphql'],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      definitions: {
        path: join(process.cwd(), 'src/definitions/graphql.def.ts'),
        outputAs: 'class',
      },
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
