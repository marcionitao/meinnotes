import { ViewNotePage } from './../view-note/view-note';
import { Note } from './../../models/note.models';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddNotePage } from '../add-note/add-note';
import { NoteService } from '../../providers/note-service/note-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private notes: Promise<Note[]>;
  private note: Note;

  constructor(public navCtrl: NavController, private noteService: NoteService) { }

  // It’s fired when entering a page, before it becomes the active one
  ionViewWillEnter(){
   this.notes = this.getAllNotes();
  }

  addNote(){
    this.navCtrl.push(AddNotePage);
  }

  getNote(createDate: number){
    this.noteService.getNote(createDate).then((n) => {
      this.note = n;
      console.log("Home: "+createDate);
      this.navCtrl.push(ViewNotePage, { note: this.note }) // 'note' está referenciado no contrutor de ViewNotePage
    });
  }

  getAllNotes(){
    return this.noteService.getAllNotes();
  }

}
