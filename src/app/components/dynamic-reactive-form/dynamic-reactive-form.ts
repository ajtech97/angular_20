import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { DNAMIC_FORM } from '../../constant/global.constant';

@Component({
  selector: 'app-dynamic-reactive-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './dynamic-reactive-form.html',
  styleUrl: './dynamic-reactive-form.css',
})
export class DynamicReactiveForm {

  studentForm!: FormGroup
  isFormSubmitted = false;

  constructor(private fb: FormBuilder) {
  }

  formFields = DNAMIC_FORM.EFORM;

  ngOnInit() {
    this.studentForm = this.buildForm(this.formFields);
  }

  buildForm(fields: any[]) {
    const group: any = {};
    fields.forEach(field => {
      group[field.name] = [field.value ?? '', this.mapValidators(field.validators)];
    });
    return this.fb.group(group);
  }

  mapValidators(validators: any) {
    const formValidators: any[] = [];

    if (validators) {
      Object.keys(validators).forEach((validator: any) => {
        switch (validator) {
          case 'required':
            if (validators[validator]) {
              formValidators.push(Validators.required);
            }
            break;
          case 'minLength':
            formValidators.push(Validators.minLength(validators[validator]));
            break;
          case 'maxLength':
            formValidators.push(Validators.maxLength(validators[validator]));
            break;
          case 'requiredTrue':
            if (validators[validator]) {
              formValidators.push(Validators.requiredTrue);
            }
            break;
        }
      });
    }

    return formValidators;
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    console.log(this.studentForm.value);
  }

}
