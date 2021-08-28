import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Services
import { ProjectService } from '../../../services/project/project.service';
import { routerTransition } from '../../../services/config/config.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class TaskListComponent implements OnInit {

  taskList: any;
  taskListData: any;
  constructor(private service: ProjectService, private toastr: ToastrService, private router: Router,) { }
  ngOnInit() {
    this.getTaskList();
  }

  getTaskList() {
    const taskList = this.service.getAllTask();
    this.taskListData = taskList.data;
  }

  deleteTask(index: number) {
    // get confirm box for confirmation
    console.log('index', index);
    const r = confirm('Are you sure?');
    if (r === true) {
      const projectDelete = this.service.deleteTask(index);
      if (projectDelete) {
        this.toastr.success('Success', 'Task Deleted');
      }
      this.getTaskList();
    }
  }

  addTask() {
    this.router.navigate(['/task-add']);
  }

  updateTask(taskId?: number) {
    this.router.navigate(['/task-update', taskId]);
  }


}

