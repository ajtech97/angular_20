import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  imports: [],
  templateUrl: './modal-popup.html',
  styleUrl: './modal-popup.css',
})
export class ModalPopup {

  @ViewChild("myModal") formModal!: ElementRef

  openModal() {
    if (this.formModal) {
      this.formModal.nativeElement.style.display = "block"
    }
  }

  closeModal() {
    if (this.formModal) {
      this.formModal.nativeElement.style.display = "none"
    }
  }

}
