import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { BlogPost, Project } from '../models/content.models';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly projectsUrl = new URL('data/projects.json', this.document.baseURI).toString();
  private readonly blogPostsUrl = new URL('data/blog-posts.json', this.document.baseURI).toString();

  private readonly projects$ = this.http
    .get<Project[]>(this.projectsUrl)
    .pipe(shareReplay(1));

  private readonly blogPosts$ = this.http
    .get<BlogPost[]>(this.blogPostsUrl)
    .pipe(
      map((posts) =>
        [...posts].sort(
          (left, right) =>
            new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
        )
      ),
      shareReplay(1)
    );

  public getProjects() {
    return this.projects$;
  }

  public getBlogPosts() {
    return this.blogPosts$;
  }

  public getFeaturedPosts() {
    return this.blogPosts$.pipe(map((posts) => posts.filter((post) => post.featured)));
  }

  public getBlogPostBySlug(slug: string) {
    return this.blogPosts$.pipe(map((posts) => posts.find((post) => post.slug === slug) ?? null));
  }
}
