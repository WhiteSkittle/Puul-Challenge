/**
 * @property {number} completedTasks - The number of tasks completed by the user.
 * @property {number} totalCost - The total cost associated with the user's tasks.
 */
export interface UserWithStats {
  id: number;
  name: string;
  email: string;
  role: string;
  completedTasks: number;
  totalCost: number;
}
