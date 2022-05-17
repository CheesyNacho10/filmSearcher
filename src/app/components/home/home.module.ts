import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FilmsListComponent } from '../films-list/films-list.component';
import { FilmCardComponent } from '../film-card/film-card.component';
import { FilmSearchbarComponent } from '../film-searchbar/film-searchbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    FilmsListComponent,
    FilmCardComponent,
    FilmSearchbarComponent,
  ]
})
export class HomePageModule {}
