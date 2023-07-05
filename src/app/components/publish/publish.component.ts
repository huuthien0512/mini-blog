import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable, catchError, throwError } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { Category } from 'src/app/models/category';
import { Tag } from 'src/app/models/tag';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent {
  @ViewChild('tagInput') tagInput!: ElementRef;

  @ViewChild('postHeader') postHeader!: ElementRef;
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  @ViewChild('postFooter') postFooter!: ElementRef;

  categories: Category[] = [];
  showTagInput: boolean = false;
  loading: boolean = false;
  from: string = '';
  id: number = 0;
  placeholder = null;
  categoryError: boolean = false;

  blog: Blog = {
    id: -1,
    dynamicTags: [],
    title: '',
    htmlContent: '',
    categoryId: -1,
    state: 1,
    pageView: 0,
  };

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '100px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    upload: (file: File) => this.addImage(file),
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['heading', 'fontName'],
      ['fontSize', 'customClasses', 'insertVideo'],
    ],
  };

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private blogService: BlogService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.id = this.activateRoute.snapshot.params['id'];
    this.from = this.activateRoute.snapshot.queryParams['from'];
    if (!(this.id && this.from)) {
      return;
    }
    this.loading = true;
    this.blogService.getBlogById(this.id).subscribe({
      next: (blog: Blog) => {
        this.loading = false;
        this.blog = blog;
      },
      error: (error) => {
        this.loading = false;
        this.messageService.openSnackBar('error', 'Blog load failed!');
      },
    });
  }

  ngAfterViewInit() {
    this.onSetEditorContainerHeight();
  }

  onSetEditorContainerHeight() {
    const postHeaderHeight = `${this.postHeader.nativeElement.offsetHeight}px`;
    const postFooterHeight = `${this.postFooter.nativeElement.offsetHeight}px`;
    this.renderer.setStyle(
      this.editorContainer.nativeElement,
      'height',
      `calc(100% - ${postHeaderHeight} - ${postFooterHeight})`
    );
  }

  cancelEdit() {
    this.location.back();
  }

  saveBlog(state: number) {
    if (!(this.blog.title && this.blog.htmlContent && this.blog.categoryId)) {
      this.messageService.openSnackBar('error', 'Data cannot be empty!');
      return;
    }
    this.loading = true;
    const blog: Blog = {
      id: this.blog.id,
      title: this.blog.title,
      htmlContent: this.blog.htmlContent,
      categoryId: this.blog.categoryId,
      state: state,
      dynamicTags: this.blog.dynamicTags,
      pageView: this.blog.pageView,
    };
    this.blogService.addBlog(blog).subscribe({
      next: (savedblog: Blog) => {
        this.loading = false;
        this.blog.id = savedblog.id;
        this.messageService.openSnackBar(
          'success',
          state === 2 ? 'Saved successfully!' : 'Published successfully!'
        );
        if (state === 1) {
          this.router.navigate(['/my-blog']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.openSnackBar(
          'error',
          state == 0 ? 'Save draft failed !' : 'Publish blog failed !'
        );
      },
    });
  }

  addImage(file: File) {
    const formdata = new FormData();
    formdata.append('image', file);
    return this.blogService.uploadFileRequest(formdata).pipe(
      catchError((error) => {
        this.messageService.openSnackBar('error', 'Load image failed!');
        return throwError(() => error);
      })
    );
  }

  getCategories() {
    this.categoryService.getCategories('').subscribe({
      next: (categories: Category[]) => {
        this.categoryError = false;
        this.categories = categories;
      },
      error: () => (this.categoryError = true),
    });
  }

  handleClose(tag: string) {
    const index = this.blog.dynamicTags.indexOf(tag);
    if (index !== -1) {
      this.blog.dynamicTags.splice(index, 1);
    }
  }

  showInput() {
    this.showTagInput = true;
    setTimeout(() => {
      this.tagInput.nativeElement.focus();
    });
  }

  handleInputConfirm(tagValue: string) {
    if (tagValue) {
      this.blog.dynamicTags.push(tagValue);
    }
    this.showTagInput = false;
  }
}
