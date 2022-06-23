import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './components/core/author/author.component';
import { ObrazovanjeComponent } from './components/models/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/models/preduzece/preduzece.component';
import { SektorComponent } from './components/models/sektor/sektor.component';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';

const routes: Routes = [
  { path: 'obrazovanje', component: ObrazovanjeComponent },
  { path: 'preduzece', component: PreduzeceComponent },
  { path: 'sektor', component: SektorComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
