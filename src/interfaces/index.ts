// TASK
export interface ITask {
  _id?: string;

  id: string;

  title: string;
  description?: string;

  state: string;

  priority: number;

  createdAt: Date;

  modifiedAt?: Date;

  // category?: {
  //   _id?: string;
  //   id: string;
  //   title: string;
  // };
  category: string;
}

export interface ITaskPriority {
  HIGH: number;
  MEDIUM: number;
  LOW: number;
}

export interface ITaskState {
  TO_DO: string;
  IN_PROGRESS: string;
  DONE: string;
}

export interface ITaskInitialState {
  allTasks: ITask[];
  allCategories: ICategory[];
  loadingFetchTask: boolean;
  loadingFetchAllTasks: boolean;
  loadingFetchCategory: boolean;
  loadingTasksWithOffset: boolean;
  snackBar: {
    open: boolean;
    status: string;
    content: string;
  };
  taskModel: {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    state: string;
    priority: number;
    categoryId: string;
    newCategoryName: string;
    category?: string;
  };
  filter: {
    category: string;
    state: string;
    priority: number;
  };
}

// CATEGOPRY
export interface ICategory {
  id: string;
  title: string;
}

// USER
export interface IUser {
  email: string;
  username: string;
  password: string;
  token?: string;
}
