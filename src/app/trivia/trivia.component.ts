import { Component } from '@angular/core';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {
  faqs = [
    {
      title: 'Guarantee?',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate reiciendis itaque fuga commodi voluptates consequuntur? Non ut voluptas, inventore cupiditate quae ex fuga ipsa mollitia, sint reiciendis odio autem soluta?',
      active: true
    },
    {
      title: 'Do you have any built-in caching?',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate reiciendis itaque fuga commodi voluptates consequuntur? Non ut voluptas, inventore cupiditate quae ex fuga ipsa mollitia, sint reiciendis odio autem soluta?',
      active: false
    },
    {
      title: 'Can I add/upgrade my plan at any time?',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate reiciendis itaque fuga commodi voluptates consequuntur? Non ut voluptas, inventore cupiditate quae ex fuga ipsa mollitia, sint reiciendis odio autem soluta?',
      active: false
    },
    {
      title: 'What access comes with my hosting plan?',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate reiciendis itaque fuga commodi voluptates consequuntur? Non ut voluptas, inventore cupiditate quae ex fuga ipsa mollitia, sint reiciendis odio autem soluta?',
      active: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].active = !this.faqs[index].active;
  }
}
