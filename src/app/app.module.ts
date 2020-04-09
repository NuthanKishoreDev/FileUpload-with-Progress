import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploadWithPreviewComponent } from './app.component';
@NgModule({
  declarations: [
    ImageUploadWithPreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ImageUploadWithPreviewComponent]
})
export class AppModule { }
