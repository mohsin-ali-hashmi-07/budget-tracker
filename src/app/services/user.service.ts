import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

interface Expense {
  id: number;
  price: number;
  date: string | number;
  expense: string;
  total_Expenditure: string;
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone_number?: number;
  budget_limit?: number;
  role?: string;
  job_title?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: number;
  complete_address?: string;
  dob?: number;
  education?: string;
  gender?: string;
  expenses?: Expense[];
}

const BASE_URL = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);

  users = signal<User[]>([]);

  userCount = computed(() => this.users().length);

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(BASE_URL);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${BASE_URL}?id=${id}`);
  }

  createUser(user:  Pick<User, 'id' | 'first_name' | 'last_name' | 'email' | 'password' | 'budget_limit' | 'expenses' | 'role'>): Observable< Pick<User,  'id' | 'first_name' | 'last_name' | 'email' | 'password' | 'budget_limit'| 'expenses' | 'role'>> {
    return this.http.post<User>(BASE_URL, user);
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}?email=${email}&password=${password}`);
  }

  updateUser(userId: number, updatedData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${BASE_URL}/${userId}`, updatedData);
  }

  addExpense(userId: number, expense: Expense): Observable<User> {
    return this.getUserById(userId).pipe(
      switchMap((user: any) => {
        const updatedExpenses = [...user[0].expenses ?? [], expense];
        return this.updateUser(userId, { expenses: updatedExpenses });
      })
    );
  }

  updateExpense(userId: number, expenseId: number, updatedExpense: Partial<Expense>): Observable<User> {
    return this.getUserById(userId).pipe(
      switchMap((user:any) => {

        const updatedExpenses = user[0].expenses?.map((exp: any) =>
          exp.id === expenseId ? { ...exp, ...updatedExpense } : exp
        );
        return this.updateUser(userId, { expenses: updatedExpenses });
      })
    );
  }

  deleteExpense(userId: number, expenseId: number): Observable<User> {
    return this.getUserById(userId).pipe(
      switchMap((user: any) => {
          const updatedExpenses = user[0].expenses?.filter((exp: Expense) => exp.id !== expenseId);
          return this.updateUser(userId, { expenses: updatedExpenses });
      })
    );
  }
}
