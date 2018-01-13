// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '../../models/note.models';


@Injectable()
export class NoteService {

  private notes: Note[] = [];
  private note: Note;

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
        console.log( this.notes.slice());
         return [...this.notes]; // return this.notes.slice() // return a copy of array
        //return this.notes.slice();
         
      }
    ) // Returns a promise with the value of the given key
  }

  getNote(createDate: number){
    return this.storage.get('notes').then(
      (notes) => {
        this.note = [...notes].find(r => r.createDate === createDate);
        console.log("Service: "+ this.note);
        return this.note;
    });
  }

  deleteNote(createDate: number){
    // filtra no array todas as notas cuja a data(number) é diferente da nota selecionada para Deletar
    this.notes = this.notes.filter((note) => {
      console.log("Delete: "+ note.createDate + " - "+createDate);
      return note.createDate !== createDate
    });
    // add no storage os dados do filtro
    this.storage.set('notes', this.notes);
  }
}
