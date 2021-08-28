
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {
	title = 'Project Management By Hariz Haiqal';

	projectList = [
		{
			id: 1,
			project_name: "Web Project",
			project_description: "Web project to create E-Commerce Web Application",
			project_slug: "http://localhost:4201/project",
			project_manager: "Kamal"
		},
		{
			id: 2,
			project_name: "Android Application Project",
			project_description: "Web project to create Parking Apps",
			project_slug: "http://localhost:4201/project",
			project_manager: "Jamal"
		}
	];

	taskList = [
		{
			id: 1,
			project_id: 1,
			task_name: "Create Login Page",
			task_user: "azira",
			task_slug: "http://localhost:4201/project-detail/0",
			task_description: "create login page with email and password",
			task_duedate: "31/8/2021",
			task_status: "Doing"
		},
		{
			id: 2,
			project_id: 1,
			task_name: "Create List of Product",
			task_user: "iqbal",
			task_slug: "http://localhost:4201/project-detail/0",
			task_description: "create list of product to sell",
			task_duedate: "5/9/2021",
			task_status: "To Do"
		}
	];

	statusList = [
		{
			id: 1,
			name: "To Do"
		},
		{
			id: 2,
			name: "Doing"
		},
		{
			id: 3,
			name: "Done"
		}
	];

	constructor() {
		localStorage.setItem('project', JSON.stringify(this.projectList));
		localStorage.setItem('task', JSON.stringify(this.taskList));
		localStorage.setItem('status', JSON.stringify(this.statusList));
	}
}
