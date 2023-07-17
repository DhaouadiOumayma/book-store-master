import { Component } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})

export class CreateBookComponent {
  book: Book = {} as Book;
   bookForm!: FormGroup;
  buttonText: string = "Create Book";
  constructor(private http: HttpClient, public dialogRef: MatDialogRef<CreateBookComponent>) {}
loading : boolean = false;
  createBook() {
    this.loading = true;
    this.buttonText = "Creating.."
    const formData = new FormData();
    formData.append('title', this.book.title);
    formData.append('author', this.book.author);
    formData.append('price', this.book.price.toString());
  
    const coverPicInput = document.querySelector('input[name="coverPic"]');
    if (coverPicInput instanceof HTMLInputElement && coverPicInput.files?.length) {
      formData.append('coverPic', coverPicInput.files[0]);
    }
  
    formData.append('pages', this.book.pages.toString());
    formData.append('rating', this.book.rating.toString());
    formData.append('language', this.book.language);
    formData.append('genre', this.book.genre);
    formData.append('description', this.book.description);
  
    const pdfVersionInput = document.querySelector('input[name="pdfVersion"]');
    if (pdfVersionInput instanceof HTMLInputElement && pdfVersionInput.files?.length) {
      formData.append('pdfVersion', pdfVersionInput.files[0]);
    }
  
    this.http.post<any>('http://127.0.0.1:3000/api/books', formData).subscribe(
      (response) => {
        console.log(response);
        const ok = window.confirm('The Book is Successfully created.');
        location.reload();
      },
      (error) => {
        console.error(error);
        const ok = window.confirm('There was an error creating the book.');
     this.loading = false;
     this.buttonText = "Create Book"

      }
    );
    //location.reload();
  }
  
}
