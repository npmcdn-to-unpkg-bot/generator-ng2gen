import {
    iit,
    it,
    ddescribe,
    describe,
    expect,
    inject,
    async,
    beforeEach,
    beforeEachProviders,
    fakeAsync,
    tick
} from  '@angular/core/testing';

import {
    ComponentFixture,
    TestComponentBuilder
} from '@angular/compiler/testing';

import { provide } from '@angular/core';

import { AppComponent } from '../../app/home/index';
import {UserService} from "../../app/shared/index";
import {UserCreator as User} from "../creators/index";


var _user = new User().withFirstName('jane');
class MockUserService extends UserService {
    getCurrent() {
        return _user;
    }
}

describe('app component', () => {
    var builder;

    beforeEachProviders(() => [
        provide(UserService, {useClass: MockUserService})
    ]);


    beforeEach(inject([TestComponentBuilder], (tcb) => {
        builder = tcb;
    }));


    it('should display the full name', async(() => {
        return builder.createAsync(AppComponent).then((fixture: ComponentFixture<AppComponent>) => {
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement;

            expect(compiled).toContainText(`Hello ${_user.firstName} ${_user.lastName}`);
        });
    }));


    it('should display the employee number', async(() => {
        return builder.createAsync(AppComponent).then((fixture: ComponentFixture<AppComponent>) => {
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement;

            expect(compiled).toContainText(`Your employee number is: ${_user.id}`);
        });
    }));

});
