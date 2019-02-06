import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { wedevent } from './wedevent';

/*
  Generated class for the EventsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsDataProvider {
  private urlbase = "http://vmi118470.contaboserver.net";
  public event_list:wedevent[];

  constructor(public http: HttpClient) {
    console.log('Hello EventsDataProvider Provider');
    this.event_list = new Array();
  }



  public fillEventList(){
    console.log('requesting events data');
    let url = this.urlbase+'/~wedproduction/eventrest?_format=json';
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let events_observer = this.http.get(url,{headers});
    events_observer.subscribe(
      (val) => {
        this.event_list = new Array();
        this.event_list = Object.keys(val).map(function(index){
          let aux_event = new wedevent();
          aux_event.title = val[index]['title'];
          aux_event.date = val[index]['field_date_event_'];
          aux_event.cover = val[index]['field_cover_events_'];
          aux_event.profile = val[index]['field_profile_event_'];
          return aux_event;
        });
        console.log(this.event_list);
        },response => {},() => {});
  }

}

