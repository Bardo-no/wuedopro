import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsDataProvider } from '../../providers/events-data/events-data';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventsData: EventsDataProvider
            ) {
  }

  ionViewDidLoad() {
    this.eventsData.fillEventList();
  }

}
