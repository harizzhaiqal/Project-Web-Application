import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { ProjectService } from '../../../services/project/project.service';
import { routerTransition } from '../../../services/config/config.service';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class ProjectDetailsComponent implements OnInit {
  index: any;
  projectDetail: any;
  constructor(private router: Router, private route: ActivatedRoute, private service: ProjectService, private toastr: ToastrService) {
    // Get user detail index number sent in params
    this.route.params.subscribe(params => {
      this.index = params['id'];
      if (this.index && this.index != null && this.index !== undefined) {
        this.getProjectDetails(this.index);
      }
    });
  }

  ngOnInit() {
  }

  // Get student details
  getProjectDetails(index: number) {
    const getProjectDetail = this.service.getProjectDetails(index);
    if (getProjectDetail) {
      this.projectDetail = getProjectDetail.projectData;
      this.toastr.success(getProjectDetail.message, 'Success');
    }
  }

  updateProject(projectId?: number) {
    this.router.navigate(['/project-update', projectId]);
  }

  back() {
    window.history.back();
  }

}