import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [NgClass],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs implements OnInit {

  @Input() tabList: string[] = []

  @Output() onTabChange = new EventEmitter<string>()

  activeTab: string = ""

  ngOnInit(): void {
    this.activeTab = this.tabList[0]
  }

  onTabClick(tabName: string) {
    this.activeTab = tabName
    this.onTabChange.emit(tabName)
  }
}
