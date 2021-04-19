import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { NotificationService } from "src/app/services/notification.service";
import { OpenfoodfactsService } from "../services/openfoodfacts.service";
import * as NutritionActions from './nutrition.actions';

@Injectable()
export class NutritionEffects {
    loadNutrientNames$ = createEffect(() => this.actions$.pipe(
        ofType(NutritionActions.loadNutrientNames),
        mergeMap(() =>
            this.openFoodfactsService.getNutrientNames().pipe(
                map(names => NutritionActions.nutrientNamesLoaded({ names: names })),
                catchError(error => {
                    console.log(error);
                    return of(NutritionActions.nutrientNamesLoadedError({ error: error }));
                }),
            )
        )
    ))

    loadFacts$ = createEffect(() => this.actions$.pipe(
        ofType(NutritionActions.loadFacts),
        mergeMap(action =>
            this.openFoodfactsService.getFacts(action.barcode).pipe(
                map(product => NutritionActions.factsLoaded({ product: product })),
                catchError(error => {
                    console.log(error);
                    return of(NutritionActions.factsLoadedError({ error: error }));
                }),
            )
        )
    ))

    factsLoaded$ = createEffect(() => this.actions$.pipe(
        ofType(NutritionActions.factsLoaded),
        map(() => {
            this.router.navigate(['/nutrition/details']);
        })
    ), { dispatch: false })


    factsLoadedError$ = createEffect(() => this.actions$.pipe(
        ofType(NutritionActions.factsLoadedError),
        map((action) => {
            this.notificationService.error(action.error);
        })
    ), { dispatch: false })

    constructor(private actions$: Actions,
        private openFoodfactsService: OpenfoodfactsService,
        private router: Router,
        private notificationService: NotificationService) {

    }
}