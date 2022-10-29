import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countriesList from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';
import { Contact } from '../models/contact';

declare const require: any;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    countriesList.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getusers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/v1/users');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/v1/users/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:3000/api/v1/users/register',
      user
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteUser(userId: string): Observable<Object> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return this.http.delete<Object>(
      `http://localhost:3000/api/v1/users/${userId}`
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      'http://localhost:3000/api/v1/users/' + user.id,
      user
    );
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(
      countriesList.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesList.getName(countryKey, 'en');
  }

  getUsersCount(): Observable<{ userCount: number }> {
    return this.http
      .get<{ userCount: number }>(
        'http://localhost:3000/api/v1/users/get/count'
      )
      .pipe();
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuthenticated() {
    return this.usersFacade.isAuhtenticated$;
  }


  createContact(contact: Contact):Observable<Contact>{
    return this.http.post<Contact>('http://localhost:3000/api/v1/users/contact',contact)
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/api/v1/users/get/contact');
  }


 
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteContact(contactId: string): Observable<Object> {
    
    // eslint-disable-next-line @typescript-eslint/ban-types
    return this.http.delete<Object>(
      `http://localhost:3000/api/v1/users/contact/${contactId}`
    );
  }

 
}
