import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { SenialesComponent } from './seniales/seniales.component';
import { TanqueComponent } from './tanque/tanque.component';
import { TipomotorComponent } from './tipomotor/tipomotor.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { StepEmpresaComponent } from './empresa/formempresa/stepEmpresa/stepEmpresa.component';
import { StepCuartoComponent } from './empresa/formempresa/stepCuarto/stepCuarto.component';
import { StepSitioComponent } from './empresa/formempresa/stepSitio/stepSitio.component';

const routes: Routes = [
    {
        path: '',
        component: MantenimientoComponent,
        children: [
            {
                path: 'empresa',
                component: EmpresaComponent,
                children: [
                    {
                        path: 'stepEmpresa',
                        component: StepEmpresaComponent
                    },
                    {
                        path: 'stepSitios',
                        component: StepSitioComponent
                    },
                    {
                        path: 'stepCuarto',
                        component: StepCuartoComponent
                    }
                ]
            },
            {
                path: 'unidades',
                component: UnidadesComponent
            },
            {
                path: 'tipomotor',
                component: TipomotorComponent
            },
            {
                path: 'seniales',
                component: SenialesComponent
            },
            {
                path: 'tanqueagua',
                component: TanqueComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class MantenimientoRoutingModule { }