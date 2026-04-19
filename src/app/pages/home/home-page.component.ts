import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../../components/blog-card.component';
import { ProjectCardComponent } from '../../components/project-card.component';
import { SectionHeadingComponent } from '../../components/section-heading.component';
import { SkeletonCardComponent } from '../../components/skeleton-card.component';
import { UiIconComponent } from '../../components/ui-icon.component';
import { BlogPost, ExperienceItem, Project, SkillGroup } from '../../models/content.models';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SectionHeadingComponent,
    ProjectCardComponent,
    BlogCardComponent,
    SkeletonCardComponent,
    UiIconComponent
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly seoService = inject(SeoService);

  protected readonly projects = signal<Project[]>([]);
  protected readonly featuredPosts = signal<BlogPost[]>([]);
  protected readonly projectsLoading = signal(true);
  protected readonly postsLoading = signal(true);
  protected readonly contactForm = signal({
    name: '',
    email: '',
    message: ''
  });
  protected readonly formSubmitted = signal(false);

  protected readonly stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Employees Supported', value: '4,000+' },
    { label: 'API Speed Improvement', value: '30%' },
    { label: 'Release Cadence', value: 'Bi-weekly' }
  ];

  protected readonly skillGroups: SkillGroup[] = [
    {
      title: 'Backend',
      icon: 'server',
      items: ['C#', 'ASP.NET Core', '.NET 6/8', 'Entity Framework Core', 'Web APIs', 'JWT', 'RBAC', 'Dapper']
    },
    {
      title: 'Frontend',
      icon: 'code',
      items: ['Angular', 'TypeScript', 'RxJS', 'HTML5', 'CSS3', 'JavaScript']
    },
    {
      title: 'Database',
      icon: 'database',
      items: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Query Optimization', 'Indexing']
    },
    {
      title: 'Cloud & DevOps',
      icon: 'cloud',
      items: ['Azure', 'Azure App Service', 'Azure SQL', 'Azure DevOps', 'CI/CD', 'Docker']
    },
    {
      title: 'Practices & Tools',
      icon: 'toolbox',
      items: ['Git', 'REST API Design', 'Agile/Scrum', 'Code Reviews', 'Debugging', 'Mentoring']
    }
  ];

  protected readonly timeline: ExperienceItem[] = [
    {
      company: 'Gamut Infosystems Ltd.',
      role: 'Software Developer',
      period: 'Aug 2022 - Present',
      location: 'Kolkata, India',
      summary:
        'Building and maintaining enterprise payroll, HR, and reporting systems with Angular, ASP.NET Core, SQL Server, and Azure DevOps.',
      achievements: [
        'Improved API response times by 30% through SQL query tuning, indexing, and reducing unnecessary data access calls.',
        'Built secure JWT-authenticated APIs with role-based access control and strong input validation patterns.',
        'Created and maintained Azure DevOps CI/CD pipelines supporting dependable bi-weekly production releases.',
        'Worked across payroll and HR applications used by 4,000+ employees, balancing feature delivery with stability.',
        'Mentored junior developers through reviews, pairing, and cleaner coding standards.'
      ]
    },
    {
      company: 'Tata Consultancy Services',
      role: 'Software Engineer (Trainee)',
      period: 'Dec 2020 - Aug 2022',
      location: 'Kolkata, India',
      summary:
        'Supported banking and reporting workflows with SQL-focused delivery, audit data preparation, and collaborative Agile execution.',
      achievements: [
        'Optimized SQL queries and stored procedures to speed up reporting scenarios for banking clients.',
        'Strengthened Git workflow discipline and production readiness in a client-facing enterprise environment.',
        'Delivered audit-focused data outputs with accuracy and consistency across changing business requirements.'
      ]
    }
  ];

  public ngOnInit() {
    this.seoService.update({
      title: 'Ashwini Ranjan | Full-Stack .NET Developer',
      description:
        'Modern portfolio for Ashwini Ranjan, a full-stack .NET developer with 3+ years of experience building Angular, ASP.NET Core, SQL Server, and Azure-powered enterprise applications.'
    });

    this.contentService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
      this.projectsLoading.set(false);
    });

    this.contentService.getFeaturedPosts().subscribe((posts) => {
      this.featuredPosts.set(posts.slice(0, 3));
      this.postsLoading.set(false);
    });
  }

  protected updateField(field: 'name' | 'email' | 'message', value: string) {
    this.contactForm.update((form) => ({ ...form, [field]: value }));
  }

  protected submitForm() {
    this.formSubmitted.set(true);
    const { name, email, message } = this.contactForm();
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(
      `mailto:ashwini.ranjan@protonmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name || 'Recruiter')}&body=${body}`,
      '_blank'
    );
  }
}
