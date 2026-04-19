import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../../components/blog-card.component';
import { SectionHeadingComponent } from '../../components/section-heading.component';
import { SkeletonCardComponent } from '../../components/skeleton-card.component';
import { UiIconComponent } from '../../components/ui-icon.component';
import { BlogPost } from '../../models/content.models';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-page',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BlogCardComponent,
    SectionHeadingComponent,
    SkeletonCardComponent,
    UiIconComponent
  ],
  templateUrl: './blog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPageComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);
  private readonly pageSize = 4;

  protected readonly posts = signal<BlogPost[]>([]);
  protected readonly loading = signal(true);
  protected readonly search = signal('');
  protected readonly activeCategory = signal('All');
  protected readonly activeTag = signal('All');
  protected readonly currentPage = signal(1);

  protected readonly categories = computed(() => ['All', ...new Set(this.posts().map((post) => post.category))]);
  protected readonly tags = computed(() => ['All', ...new Set(this.posts().flatMap((post) => post.tags))]);

  protected readonly filteredPosts = computed(() => {
    const searchTerm = this.search().trim().toLowerCase();
    return this.posts().filter((post) => {
      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
      const matchesCategory = this.activeCategory() === 'All' || post.category === this.activeCategory();
      const matchesTag = this.activeTag() === 'All' || post.tags.includes(this.activeTag());
      return matchesSearch && matchesCategory && matchesTag;
    });
  });

  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredPosts().length / this.pageSize)));
  protected readonly pagedPosts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredPosts().slice(start, start + this.pageSize);
  });
  protected readonly featuredPost = computed(() => this.posts().find((post) => post.featured) ?? null);

  public ngOnInit() {
    this.seoService.update({
      title: 'Engineering Blog | Ashwini Ranjan',
      description:
        'Articles on ASP.NET Core, JWT authentication, SQL optimization, Angular integration, RBAC, and Azure DevOps CI/CD from Ashwini Ranjan.'
    });

    this.contentService.getBlogPosts().subscribe((posts) => {
      this.posts.set(posts);
      this.loading.set(false);
    });
  }

  protected updateSearch(value: string) {
    this.search.set(value);
    this.currentPage.set(1);
  }

  protected setCategory(category: string) {
    this.activeCategory.set(category);
    this.currentPage.set(1);
  }

  protected setTag(tag: string) {
    this.activeTag.set(tag);
    this.currentPage.set(1);
  }

  protected goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
