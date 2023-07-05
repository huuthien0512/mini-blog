import { Location } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  @ViewChild('htmlContent', { static: true })
  htmlContent!: ElementRef;
  blog!: Blog;
  loading = false;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private renderer: Renderer2,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const blogId = this.activatedRoute.snapshot.params['id'];
    if (blogId) {
      this.loading = true;
      this.blogService.getBlogById(blogId).subscribe({
        next: (blog: Blog) => {
          this.blog = blog;
          this.renderer.setProperty(
            this.htmlContent.nativeElement,
            'innerHTML',
            this.blog.htmlContent
          );
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.messageService.openSnackBar('error', 'Load blog failed!');
        },
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
