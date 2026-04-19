import { Routes } from '@angular/router';
import { BlogPageComponent } from './pages/blog/blog-page.component';
import { BlogPostPageComponent } from './pages/blog-post/blog-post-page.component';
import { HomePageComponent } from './pages/home/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Ashwini Ranjan | Full-Stack .NET Developer'
  },
  {
    path: 'blog',
    component: BlogPageComponent,
    title: 'Blog | Ashwini Ranjan'
  },
  {
    path: 'blog/:slug',
    component: BlogPostPageComponent,
    title: 'Article | Ashwini Ranjan'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
