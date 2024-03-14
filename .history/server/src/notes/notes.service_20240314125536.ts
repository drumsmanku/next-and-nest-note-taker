import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';


@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return await createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return await this.noteModel.find().exec();
  }

  // Update an existing note
  async update(id: string, updateNoteDto: CreateNoteDto): Promise<Note> {
    const existingNote = await this.noteModel.findByIdAndUpdate(id, updateNoteDto, { new: true }).exec();
    if (!existingNote) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return existingNote;
  }

  // Delete an existing note
  async delete(id: string): Promise<Note> {
    const deletedNote = await this.noteModel.findByIdAndDelete(id).exec();
    if (!deletedNote) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return deletedNote;
  }
}
