
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { routerTransition } from '../../services/config/config.service';
import { ProjectListComponent } from '../project/project-list/project-list.component';
import { ProjectAddComponent } from '../project/project-add/project-add.component';
import { ProjectDetailsComponent } from '../project/project-details/project-details.component';
import { TaskAddComponent } from '../task/task-add/task-add.component';
import { TaskDetailsComponent } from '../task/task-details/task-details.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})


export class HomeComponent implements OnInit {
	active: string;
	constructor(private router: Router, private toastr: ToastrService) {
		// Detect route changes for active sidebar menu
		this.router.events.subscribe((val) => {
			this.routeChanged(val);
		});
	}

	ngOnInit() {
	}

	// Detect route changes for active sidebar menu
	routeChanged(val) {
		this.active = val.url;
	}

	// Logout User
	logOut() {
		this.toastr.success('Success', "Logged Out Successfully");
		localStorage.removeItem('userData');
		this.router.navigate(['/login']);
	}
}


// Define and export child routes of HomeComponent
export const homeChildRoutes: Routes = [
	{
		path: '',
		component: ProjectListComponent
	},
	{
		path: 'project',
		component: ProjectListComponent
	},
	{
		path: 'project-add',
		component: ProjectAddComponent
	},
	{
		path: 'project-update/:id',
		component: ProjectAddComponent
	},
	{
		path: 'project-detail/:id',
		component: ProjectDetailsComponent
	},
	{
		path: 'task-add',
		component: TaskAddComponent
	},
	{
		path: 'task-update/:id',
		component: TaskAddComponent
	},
	{
		path: 'task-detail/:id',
		component: TaskDetailsComponent
	},
];
