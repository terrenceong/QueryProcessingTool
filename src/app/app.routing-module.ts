import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router"
import { QueryProcessingToolComponent } from "./query-processing-input/query-processing-tool/query-processing-tool.component";
import { ResultComponent } from "./query-processing-result/result/result.component";


const appRoutes:Routes = [{path: '',redirectTo:'/query' ,pathMatch: 'full'},
{path: 'query',component:QueryProcessingToolComponent},
{path: 'query/queryResult',component:ResultComponent}]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{
}