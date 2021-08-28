import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import * as moment from "moment";

// Services
import { ValidationService } from '../../../services/config/config.service';
import { ProjectService } from '../../../services/project/project.service';
import { routerTransition } from '../../../services/config/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class TaskAddComponent implements OnInit {

  taskAddForm: FormGroup;
  index: any;
  statusListData: any;

  task_duedate: any = "dd/mm/yyyy";
  taskId: number = 0;
  task_name: string;
  task_user: string;
  task_description: string;
  task_status: string = "To Do";
  task_slug: string = 'http://localhost:4201/project-detail/0'

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private service: ProjectService, private toastr: ToastrService) {

    // Check for route params
    this.route.params.subscribe(params => {
      this.index = params['id'];
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index !== null && this.index !== undefined) {

        this.getTaskDetails(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  ngOnInit() {
    this.getStatusList();
  }

  // Submit student details form
  doRegister() {
    if (this.index && this.index !== null && this.index !== undefined) {
      this.taskAddForm.value.id = this.index;
    } else {
      this.index = null;
    }
    const createTask = this.service.doRegisterTask(this.taskAddForm.value, this.index);
    if (createTask) {
      if (createTask.code === 200) {
        this.toastr.success(createTask.message, 'Success');
        window.history.back();
      } else {
        this.toastr.error(createTask.message, 'Failed');
      }
    }
  }

  // If this is update form, get user details and update form
  getTaskDetails(index: number) {
    const taskDetail = this.service.getTaskDetails(index);
    this.createForm(taskDetail);
    console.log('data', taskDetail);
    this.task_name = taskDetail.taskData.task_name;
    this.task_slug = taskDetail.taskData.task_slug;
    this.task_user = taskDetail.taskData.task_user;
    this.task_description = taskDetail.taskData.task_description;
    this.task_duedate = taskDetail.taskData.task_duedate;
    this.task_status = taskDetail.taskData.task_status;
  }

  // If this is update request then auto fill form
  createForm(data) {
    if (data === null) {
      this.taskAddForm = this.formBuilder.group({
        task_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        task_user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        task_slug: ['',],
        task_description: ['',],
        task_duedate: ['',],
        task_status: ['',],
      });
    } else {
      this.taskAddForm = this.formBuilder.group({
        task_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        task_user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        task_slug: ['',],
        task_description: ['',],
        task_duedate: ['',],
        task_status: ['',],
      });
    }
  }

  getStatusList() {
    const statusList = this.service.getStatus();
    console.log('status-list', statusList.data)
    this.statusListData = statusList.data;
  }

  back() {
    window.history.back();
  }

}
