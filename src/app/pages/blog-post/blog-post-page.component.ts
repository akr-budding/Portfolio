import { CommonModule, DatePipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { BlogCardComponent } from '../../components/blog-card.component';
import { SkeletonCardComponent } from '../../components/skeleton-card.component';
import { BlogPost } from '../../models/content.models';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-post-page',
  imports: [CommonModule, RouterLink, DatePipe, BlogCardComponent, SkeletonCardComponent],
  templateUrl: './blog-post-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);
  private readonly location = inject(Location);

  protected readonly loading = signal(true);
  protected readonly post = signal<BlogPost | null>(null);
  protected readonly relatedPosts = signal<BlogPost[]>([]);
  protected readonly shareUrl = signal('');
  protected readonly tableOfContents = computed(() =>
    this.post()?.content.map((section) => ({ id: section.id, heading: section.heading })) ?? []
  );

  public ngOnInit() {
    this.shareUrl.set(window.location.href);

    this.route.paramMap
      .pipe(
        map((params) => params.get('slug') ?? ''),
        switchMap((slug) => this.contentService.getBlogPostBySlug(slug))
      )
      .subscribe((post) => {
        this.post.set(post);
        this.loading.set(false);

        if (!post) {
          this.seoService.update({
            title: 'Post Not Found | Ashwini Ranjan',
            description: 'The requested article could not be found.'
          });
          return;
        }

        this.seoService.update({
          title: `${post.title} | Ashwini Ranjan`,
          description: post.excerpt,
          image: post.coverImage
        });

        this.contentService.getBlogPosts().subscribe((posts) => {
          this.relatedPosts.set(
            posts
              .filter(
                (candidate) =>
                  candidate.slug !== post.slug &&
                  (candidate.category === post.category ||
                    candidate.tags.some((tag) => post.tags.includes(tag)))
              )
              .slice(0, 3)
          );
        });
      });
  }

  protected share(platform: 'linkedin' | 'twitter') {
    const encodedUrl = encodeURIComponent(this.shareUrl());
    const encodedTitle = encodeURIComponent(this.post()?.title ?? 'Ashwini Ranjan Blog');
    const href =
      platform === 'linkedin'
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        : `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  protected copyLink() {
    navigator.clipboard.writeText(this.shareUrl());
  }

  protected goBack() {
    this.location.back();
  }
}
