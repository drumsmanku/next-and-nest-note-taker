import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import  NotesController  from './notes/notes.controller';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb+srv://drumsmanku:Mankubro4444@database1.rwujdsu.mongodb.net/?retryWrites=true&w=majority&appName=Database1',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  }),NotesModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
