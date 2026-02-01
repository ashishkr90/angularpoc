import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatIconModule, CommonModule ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngularPOC');
   userInput: string = '';
  recognition: any;
  isListening: boolean = false;

  constructor() { 
     // Web Speech API setup
    const { webkitSpeechRecognition }: any = window as any;
    if (webkitSpeechRecognition) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
        this.userInput = event.results[0][0].transcript;
      };

      this.recognition.onstart = () => this.isListening = true;
      this.recognition.onend = () => this.isListening = false;
    }
  }

  startVoiceInput() {
    if (this.recognition) {
      this.recognition.start();
    } else {
      alert('Speech Recognition not supported in this browser.');
    }
  }

  onSubmit() {
    alert('Submitted: ' + this.userInput);
  }

  //====================
 

  

  toggleVoiceInput() {
    if (!this.recognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  

}
