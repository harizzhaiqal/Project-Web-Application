
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService {

  constructor() { }

  getAllProject() {
    let projectList: any;
    if (localStorage.getItem('project') && localStorage.getItem('project') !== '') {
      projectList = {
        code: 200,
        message: 'Project List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('project'))
      };
    } else {
      projectList = {
        code: 200,
        message: 'Project List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('project'))
      };
    }
    return projectList;
  }

  doRegisterProject(data, index) {
    const projectList = JSON.parse(localStorage.getItem('project'));
    let returnData;
    console.log('index', index);
    if (index != null) {

      projectList[index] = data;
      localStorage.setItem('project', JSON.stringify(projectList));
      returnData = {
        code: 200,
        message: 'Project Successfully Updated',
        data: JSON.parse(localStorage.getItem('project'))
      };
    } else {
      data.id = this.generateRandomID();
      projectList.unshift(data);

      localStorage.setItem('project', JSON.stringify(projectList));

      returnData = {
        code: 200,
        message: 'Project Successfully Added',
        data: JSON.parse(localStorage.getItem('project'))
      };
    }
    return returnData;
  }

  deleteProject(index: number) {
    const projectList = JSON.parse(localStorage.getItem('project'));

    projectList.splice(index, 1);

    localStorage.setItem('project', JSON.stringify(projectList));

    const returnData = {
      code: 200,
      message: 'Project Successfully Deleted',
      data: JSON.parse(localStorage.getItem('project'))
    };

    return returnData;
  }



  getProjectDetails(index: number) {
    const projectList = JSON.parse(localStorage.getItem('project'));

    const returnData = {
      code: 200,
      message: 'Project Details Fetched',
      projectData: projectList[index]
    };

    return returnData;
  }


  getAllTask() {
    let taskList: any;
    if (localStorage.getItem('task') && localStorage.getItem('task') !== '') {
      taskList = {
        code: 200,
        message: 'Task List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('task'))
      };
    } else {
      taskList = {
        code: 200,
        message: 'Task List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('task'))
      };
    }
    return taskList;
  }

  doRegisterTask(data, index) {
    const taskList = JSON.parse(localStorage.getItem('task'));
    let returnData;
    console.log('index', index);
    if (index != null) {

      taskList[index] = data;
      localStorage.setItem('task', JSON.stringify(taskList));
      returnData = {
        code: 200,
        message: 'Task Successfully Updated',
        data: JSON.parse(localStorage.getItem('task'))
      };
    } else {
      data.id = this.generateRandomID();
      taskList.unshift(data);

      localStorage.setItem('task', JSON.stringify(taskList));

      returnData = {
        code: 200,
        message: 'Task Successfully Added',
        data: JSON.parse(localStorage.getItem('task'))
      };
    }
    return returnData;
  }

  deleteTask(index: number) {
    const taskList = JSON.parse(localStorage.getItem('task'));

    taskList.splice(index, 1);

    localStorage.setItem('task', JSON.stringify(taskList));

    const returnData = {
      code: 200,
      message: 'Task Successfully Deleted',
      data: JSON.parse(localStorage.getItem('task'))
    };

    return returnData;
  }



  getTaskDetails(index: number) {
    const taskList = JSON.parse(localStorage.getItem('task'));

    const returnData = {
      code: 200,
      message: 'Task Details Fetched',
      taskData: taskList[index]
    };

    return returnData;
  }

  getStatus() {
    let statusList: any;
    if (localStorage.getItem('status') && localStorage.getItem('status') !== '') {
      statusList = {
        code: 200,
        message: 'Status List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('status'))
      };
    } else {
      statusList = {
        code: 200,
        message: 'Status List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('status'))
      };
    }
    return statusList;
  }


  generateRandomID() {
    const x = Math.floor((Math.random() * Math.random() * 9999));
    return x;
  }

}
