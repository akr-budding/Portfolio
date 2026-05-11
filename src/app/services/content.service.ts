import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { BlogPost, Project } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly dataVersion = '2026-05-11-order-screenshots';
  private readonly projectsUrl = this.createDataUrl('data/projects.json');
  private readonly blogPostsUrl = this.createDataUrl('data/blog-posts.json');

  private readonly projects$ = this.http.get<Project[]>(this.projectsUrl).pipe(shareReplay(1));

  private readonly blogPosts$ = this.http.get<BlogPost[]>(this.blogPostsUrl).pipe(
    map((posts) =>
      [...posts].sort(
        (left, right) =>
          new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
      ),
    ),
    shareReplay(1),
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

  private createDataUrl(path: string) {
    const url = new URL(path, this.document.baseURI);
    url.searchParams.set('v', this.dataVersion);
    return url.toString();
  }
}
