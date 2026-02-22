import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { Attribute } from './components/attribute/attribute';
import { CombineObs } from './components/combine-obs/combine-obs';
import { ControlFlow } from './components/control-flow/control-flow';
import { Crud } from './components/crud/crud';
import { Css } from './components/css/css';
import { DataBinding } from './components/data-binding/data-binding';
import { authGuard } from './components/gaurd/auth-guard';
import { Layout } from './components/layout/layout';
import { Login } from './components/login/login/login';
import { NotFound } from './components/not-found/not-found';
import { Photos } from './components/photos/photos';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';
import { RxjsOperators } from './components/rxjs-operators/rxjs-operators';
import { RxjsReactiveForm } from './components/rxjs-reactive-form/rxjs-reactive-form';
import { SignalInDepth } from './components/signal-in-depth/signal-in-depth';
import { Signal } from './components/signal/signal';
import { SubBehReplay } from './components/sub-beh-replay/sub-beh-replay';
import { Todo } from './components/todo/todo';
import { Todolist } from './components/todolist/todolist';
import { Unsubscribe } from './components/unsubscribe/unsubscribe';
import { User } from './components/user/user';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "",
        component: Layout,
        children: [
            {
                path: "controlflow",
                component: ControlFlow,
                canActivate: [authGuard]
            },
            {
                path: "data-binding",
                component: DataBinding,
                canActivate: [authGuard]
            },
            {
                path: "signal",
                component: Signal,
                canActivate: [authGuard]
            },
            {
                path: "attribute",
                component: Attribute,
                canActivate: [authGuard]
            },
            {
                path: "photos",
                component: Photos,
                canActivate: [authGuard]
            },
            {
                path: "user",
                component: User,
                canActivate: [authGuard]
            },
            {
                path: "todo",
                component: Todo,
                canActivate: [authGuard]
            },
            {
                path: "signal-indepth",
                component: SignalInDepth,
                canActivate: [authGuard]
            },
            {
                path: "rxjs-demo",
                component: RxjsDemo,
                canActivate: [authGuard]
            },
            {
                path: "rxjs-operators",
                component: RxjsOperators,
                canActivate: [authGuard]
            },
            {
                path: "rxjs-sub-beh-replay",
                component: SubBehReplay,
                canActivate: [authGuard]
            },
            {
                path: "combine-obs",
                component: CombineObs,
                canActivate: [authGuard]
            },
            {
                path: "reactiveform-rxjs",
                component: RxjsReactiveForm,
                canActivate: [authGuard]
            },
            {
                path: "reactiveform-unsubscribe",
                component: Unsubscribe,
                canActivate: [authGuard]
            },
            {
                path: "css",
                component: Css,
                canActivate: [authGuard]
            },
            {
                path: "todolist",
                component: Todolist,
                canActivate: [authGuard]
            },
            {
                path: "crud",
                component: Crud,
                canActivate: [authGuard]
            },
        ]
    },
    {
        path: "**",
        component: NotFound
    }
];
