import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { concatMap, map, catchError, of } from 'rxjs';

import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {


  buildUsersSession$ = createEffect(()=> this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(()=> {
      if(this.localService.isValidToken()){
        const userId = this.localService.getUserIdFromToken();
        if(userId){
          return  this.usersService.getUser(userId).pipe(
            map((user)=>{
              return UsersActions.buildUserSessionSuccess({user:user});
            }),
            catchError( () => of(UsersActions.buildUserSessionFailed()))
          );

        }
        else{

          return of(UsersActions.buildUserSessionFailed());
  
        }

      }else{
        return of(UsersActions.buildUserSessionFailed());

      }
    })
  ))

 
 

  constructor(private actions$: Actions, private localService:LocalstorageService, private usersService:UsersService) {}
}
