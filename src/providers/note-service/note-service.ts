// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '../../models/note.models';


@Injectable()
export class NoteService {

  private notes: Note[] = [];

  constructor(public storage: Storage) {}
  
  // https://ionicframework.com/docs/storage/
  saveNote(note: Note){
    note.createDate = Date.now();
    this.notes.push(note);
    this.storage.set('notes', this.notes); // Storage is an easy way to store "key/value" pairs and JSON objects
  }

  getAllNotes(){
    return this.storage.get('notes').then(
      (notes) => {
        this.notes = notes == null ? [] : notes;
         return [...this.notes]; // return this.notes.slice() // return a copy of array
        //return this.notes.slice();
        // console.log( this.notes.slice());
      }
    ) // Returns a promise with the value of the given key
  }
}
