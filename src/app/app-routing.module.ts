import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'movie', pathMatch: 'full'},
      {
        path: 'movies', loadChildren: () => import('./modules/movie/movie.module')
          .then(v => v.MovieModule)
      },
      {path: 'register', component: RegisterComponent},
      {path: '**', redirectTo: 'movies'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
