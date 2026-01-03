import { Routes } from '@angular/router';
import { Attribute } from './attribute/attribute';
import { ControlFlow } from './components/control-flow/control-flow';
import { DataBinding } from './components/data-binding/data-binding';
import { authGuard } from './components/gaurd/auth-guard';
import { Layout } from './components/layout/layout';
import { Login } from './components/login/login/login';
import { NotFound } from './components/not-found/not-found';
import { Photos } from './components/photos/photos';
import { SignalInDepth } from './components/signal-in-depth/signal-in-depth';
import { Signal } from './components/signal/signal';
import { Todo } from './components/todo/todo';
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
        ]
    },
    {
        path: "**",
        component: NotFound
    }
];
