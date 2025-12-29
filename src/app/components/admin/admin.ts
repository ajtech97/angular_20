import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit, AfterViewInit, OnChanges {

  constructor() {
    console.log("constructor")
  }

  ngOnChanges() { console.log('OnChanges'); }
  ngOnInit() { console.log('OnInit'); }
  ngDoCheck() { console.log('DoCheck'); }
  ngAfterContentInit() { console.log('AfterContentInit'); }
  ngAfterContentChecked() { console.log('AfterContentChecked'); }
  ngAfterViewInit() { console.log('AfterViewInit'); }
  ngAfterViewChecked() { console.log('AfterViewChecked'); }
  ngOnDestroy() { console.log('OnDestroy'); }

  // 1. ngOnChanges(changes: SimpleChanges)

  // When it runs:

  // Whenever an @Input() value changes.

  // Runs before ngOnInit.

  // Use for:

  // Acting on updated input values.

  // Comparing previous and current values.

  // 2. ngOnInit()

  // When it runs:

  // Once, after the first ngOnChanges.

  // Component is initialized.

  // Use for:

  // Initialization logic

  // API calls

  // Setting default values

  // 3. ngDoCheck()

  // When it runs:

  // During every change detection cycle.

  // Use for:

  // Custom change detection

  // Detecting changes Angular cannot detect automatically (ex: object mutation)

  // 4. ngAfterContentInit()

  // When it runs:

  // After content (ng-content) is projected into the component.

  // Use for:

  // Access projected content first time.

  // 5. ngAfterContentChecked()

  // When it runs:

  // After every check of projected content.

  // 6. ngAfterViewInit()

  // When it runs:

  // After the component’s view (child components, DOM) is initialized.

  // Use for:

  // Access @ViewChild() safely

  // DOM manipulations

  // 7. ngAfterViewChecked()

  // When it runs:

  // After every check of the component’s view.

  // 8. ngOnDestroy()

  // When it runs:

  // Right before Angular destroys the component.

  // Use for:

  // Unsubscribing Observables

  // Clearing timeouts/intervals

  // Detaching event listeners

}
