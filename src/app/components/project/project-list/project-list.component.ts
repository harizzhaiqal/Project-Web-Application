
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Services
import { ProjectService } from '../../../services/project/project.service';
import { routerTransition } from '../../../services/config/config.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class ProjectListComponent implements OnInit {

  projectList: any;
  projectListData: any;
  constructor(
    private service: ProjectService,
    private toastr: ToastrService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.getProjectList();
  }

  getProjectList() {
    const projectList = this.service.getAllProject();
    this.projectListData = projectList.data;
  }

  deleteProject(index: number) {
    // get confirm box for confirmation
    console.log('index', index);
    const r = confirm('Are you sure?');
    if (r === true) {
      const projectDelete = this.service.deleteProject(index);
      if (projectDelete) {
        this.toastr.success('Success', 'Project Deleted');
      }
      this.getProjectList();
    }
  }

  addProject() {
    this.router.navigate(['/project-add']);
  }

  updateProject(projectId?: number) {
    this.router.navigate(['/project-update', projectId]);
  }

}
