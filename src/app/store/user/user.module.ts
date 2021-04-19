import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserEffects } from "./user.effects";
import { userFeatureKey, userReducer } from "./user.reducer";


@NgModule({
    imports: [
        StoreModule.forFeature(userFeatureKey, userReducer),
        EffectsModule.forRoot([UserEffects])
    ]
})
export class UserModule { }