import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface PageMeta {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly defaultImage = new URL('assets/og-cover.svg', this.document.baseURI).toString();

  public update(meta: PageMeta) {
    this.title.setTitle(meta.title);
    this.meta.updateTag({ name: 'description', content: meta.description });
    this.meta.updateTag({ property: 'og:title', content: meta.title });
    this.meta.updateTag({ property: 'og:description', content: meta.description });
    this.meta.updateTag({ property: 'og:url', content: meta.url ?? this.document.location.href });
    this.meta.updateTag({ property: 'og:image', content: meta.image ?? this.defaultImage });
    this.meta.updateTag({ name: 'twitter:title', content: meta.title });
    this.meta.updateTag({ name: 'twitter:description', content: meta.description });
    this.meta.updateTag({ name: 'twitter:image', content: meta.image ?? this.defaultImage });
  }
}
