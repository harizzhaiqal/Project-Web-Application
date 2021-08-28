import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../../services/config/config.service';
import { ProjectService } from '../../../services/project/project.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class ProjectAddComponent implements OnInit {

  projectAddForm: FormGroup;
  index: any;
  projectId: number = 0;
  project_name: string;
  project_manager: string;
  project_slug: string = "http://localhost:4201/project";
  project_description: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private service: ProjectService, private toastr: ToastrService) {

    // Check for route params
    this.route.params.subscribe(params => {
      this.index = params['id'];
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index !== null && this.index !== undefined) {
        this.index = this.index - 1;
        this.getProjectDetails(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   if (params.id) {
    //     console.log('id', params.id);
    //     this.projectId = params.id;
    //   }
    // });
    // this.projectId = this.projectId - 1;
    // if (this.projectId != undefined) {
    //   this.getProjectDetails(this.projectId);
    // }

  }

  // Submit student details form
  doRegister() {
    const createProject = this.service.doRegisterProject(this.projectAddForm.value, this.projectId);
    if (createProject) {
      if (createProject.code === 200) {
        this.toastr.success(createProject.message, 'Success');
        this.router.navigate(['/project']);
      } else {
        this.toastr.error(createProject.message, 'Failed');
      }
    }
  }

  // If this is update form, get user details and update form
  getProjectDetails(index: number) {
    const projectDetail = this.service.getProjectDetails(index);
    this.createForm(projectDetail);
    this.project_name = projectDetail.projectData.project_name;
    this.project_slug = projectDetail.projectData.project_slug;
    this.project_description = projectDetail.projectData.project_description;
    this.project_manager = projectDetail.projectData.project_manager;
  }

  // If this is update request then auto fill form
  createForm(data) {
    if (data === null) {
      this.projectAddForm = this.formBuilder.group({
        project_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        project_slug: ['',],
        project_manager: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        project_description: ['',],
      });
    } else {
      this.projectAddForm = this.formBuilder.group({
        project_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        project_slug: ['',],
        project_manager: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        project_description: ['',],
      });
    }
  }

}
