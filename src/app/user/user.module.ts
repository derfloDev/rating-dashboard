import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserEffects } from "./store/user.effects";
import { userFeatureKey, userReducer } from "./store/user.reducer";


@NgModule({
    imports: [
        StoreModule.forFeature(userFeatureKey, userReducer),
        EffectsModule.forFeature([UserEffects])
    ]
})
export class UserModule { }