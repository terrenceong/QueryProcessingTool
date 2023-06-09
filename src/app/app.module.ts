import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {AutosizeModule} from 'ngx-autosize';
import {MatSelectModule} from '@angular/material/select';
import { QueryProcessingToolComponent } from './query-processing-input/query-processing-tool/query-processing-tool.component';
import { AppRoutingModule } from './app.routing-module';
import { ResultComponent } from './query-processing-result/result/result.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { TreeComponent } from './query-processing-tree/tree/tree.component';
import { DifferencesComponent } from './query-processing-result/differences/differences.component';
import {MatRadioModule} from '@angular/material/radio';
import { QueryService } from './query.service';
import { HttpClientModule} from '@angular/common/http'
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './app-config.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    QueryProcessingToolComponent,
    ResultComponent,
    TreeComponent,
    DifferencesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AutosizeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatDividerModule,
    MatRadioModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [QueryService, {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppConfigService],
    useFactory: (appConfigService: AppConfigService) => {
      return () => {
        //Make sure to return a promise!
        return appConfigService.loadAppConfig();
      };
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
