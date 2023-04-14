import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router"
import { QueryProcessingToolComponent } from "./query-processing-input/query-processing-tool/query-processing-tool.component";
import { DifferencesComponent } from "./query-processing-result/differences/differences.component";
import { ResultComponent } from "./query-processing-result/result/result.component";


const appRoutes:Routes = [{path: '',redirectTo:'/query' ,pathMatch: 'full'},
{path: 'query',component:QueryProcessingToolComponent},
{path: 'query/result',component:ResultComponent},
{path: 'query/compare',component:DifferencesComponent},
{path: '**',component:QueryProcessingToolComponent},
]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{
}