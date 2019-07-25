import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      { path: '', redirectTo: 'explore', pathMatch: 'full' },
      { path: 'explore', loadChildren: './explore/explore.module#ExplorePageModule'},
      { path: 'saved', loadChildren: './saved/saved.module#SavedPageModule'},
      { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'}
    ],
  },
  // {
  //   path:'./',
  //   redirectTo:'main/explore',
  //   pathMatch:'full'
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
