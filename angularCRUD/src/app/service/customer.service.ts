import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http'
import { Customer } from '../model/customer';
import {catchError, Observable, throwError } from 'rxjs';
import * as _ from 'lodash';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import { catchError } from 'rxjs/operators'
//import xyz from './data.json';
//import { data } from '../src/JSOnData/data.json';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  _jsonUrl:string ='assets/JSOnData/data.json';
  postInfo: Customer[]=[];
  //getUrl:string;
  //addCustUrl:string;
  getCustUrl:string;
  //updateCustUrl:string;
  deleteCustUrl:string;

  constructor(private http : HttpClient) { 
    /*const dataJson:Observable<Customer> = http.get<Customer>('/assets/JSOnData/data.json');
    dataJson.subscribe(post=>{
      this.postInfo.push(post);
      console.log(post);
    })*/
    //this.addCustUrl = 'http://localhost:9091/customer/addCustomer';
    //console.log(data);
    //this.getUrl='../../src/JSOnData/data.json';
    this.getCustUrl = 'http://localhost:3000/data';
    //this.updateCustUrl = 'http://localhost:9091/customer/updateCustomer';
    this.deleteCustUrl = 'http://localhost:9091/customer/deleteCustomer';
  }

  getDropDownText(id:any, object:Customer[]){
    console.log('1: '+ object); //object[0].colors
    console.log('2: '+ id);
    const selObj = _.filter(object, function (o) {
        return (_.includes(id,o.id));
    });
    console.log('3: '+ selObj);
    return selObj;
  }

  addCustomer(customerData:any){
    //return this.http.post<Customer>(this.addCustUrl, cust);
    return this.http.post(this.getCustUrl,customerData);
  }

  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.getCustUrl);//this.getCustUrl
  }

  //errorhandler(error:HttpErrorResponse){
  //  return throwError(() => 'Server Error');
  //}

  updateCustomer(id:any,customerData:any):Observable<Customer>{ //cus: Customer
    console.log('SERVICE DATA SIDE'+ id);
    return this.http.put<Customer>(this.getCustUrl+'/'+id,customerData);
  }

  deleteCustomer(id:any):Observable<Customer>{
    return this.http.delete<Customer>(this.getCustUrl+'/'+id);
  }
}
