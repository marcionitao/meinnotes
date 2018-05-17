import { Note } from './../../models/note.models';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoteService } from '../../providers/note-service/note-service';

@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  note: Note;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private noteService: NoteService) {
                this.note = this.navParams.get('note'); // get 'note' data betwen pages
                console.log("ViewNotePage : "+this.note);
               }

  deleteNote(createDate: number) {
    this.noteService.deleteNote(createDate);
    this.navCtrl.pop();
  }

}
