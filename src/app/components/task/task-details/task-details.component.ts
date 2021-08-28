import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { ProjectService } from '../../../services/project/project.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class TaskDetailsComponent implements OnInit {

  index: any;
  taskDetail: any;
  constructor(private router: Router, private route: ActivatedRoute, private service: ProjectService, private toastr: ToastrService) {
    // Get user detail index number sent in params
    this.route.params.subscribe(params => {
      this.index = params['id'];
      if (this.index && this.index != null && this.index !== undefined) {
        this.getTaskDetails(this.index);
      }
    });
  }

  ngOnInit() {
  }

  // Get student details
  getTaskDetails(index: number) {
    const getTaskDetail = this.service.getTaskDetails(index);
    if (getTaskDetail) {
      this.taskDetail = getTaskDetail.taskData;
      this.toastr.success(getTaskDetail.message, 'Success');
    }
  }

  back() {
    window.history.back();
  }

}