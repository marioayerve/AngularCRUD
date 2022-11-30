import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
//import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
//import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-info-grid',
  templateUrl: './info-grid.component.html',
  styleUrls: ['./info-grid.component.css']
})
export class InfoGridComponent implements OnInit {
  editdata:any;
  customDetail !: FormGroup;
  custObj : Customer = new Customer(0,"","","",[""]);
  custList : Customer[] = [];
  colorList: any;

  constructor(private formBuilder : FormBuilder, private custService: CustomerService) { } //, @inject(MAT_DIALOG_DATA) public data:any

  
  ngOnInit(): void {

    this.getAllCustomer();

    this.customDetail = this.formBuilder.group({
      id:this.formBuilder.control({value:'',disabled:false}),
      fullName:this.formBuilder.control('',Validators.required),
      email:this.formBuilder.control('',Validators.required),
      purchaseDescr:this.formBuilder.control('',Validators.required),
      colors:this.formBuilder.control([''],Validators.required)
    })
  }
  selectedValue: any;
  mySelect = '2';

  selectChange(value:string) {
    console.log('prev: '+this.colorList[0]);
    console.log('colID: ' + value);
    
    this.selectedValue = this.custService.getDropDownText(this.mySelect, this.custList)[0].colors;
    console.log(this.selectedValue);
}

  /*customDetail=this.formBuilder.group({
    id:this.formBuilder.control({value:'',disabled:true}),
    fullName:this.formBuilder.control('',Validators.required),
    email:this.formBuilder.control('',Validators.required),
    purchaseDescr:this.formBuilder.control('',Validators.required),
    colors:this.formBuilder.control([''],Validators.required)
  })*/

  addCustomer(){
    //this.custObj.id = this.customDetail.value.id;
    //this.custObj.fullName = this.customDetail.value.fullName;
    //this.custObj.email = this.customDetail.value.email;
    //this.custObj.purchaseDescr = this.customDetail.value.purchaseDescr;
    if(this.customDetail.valid){
      this.custService.addCustomer(this.customDetail.value).subscribe(res =>{
        console.log(res);
        alert("Save succesfully");
        this.getAllCustomer();
      });
    }
  }


  getAllCustomer(){
    this.custService.getAllCustomer().subscribe(res =>{
      this.custList = res;
      //this.colorList = res;
      console.log(res);  
    });
  }

  editCustomer(cus : Customer){
      this.customDetail.controls['id'].setValue(cus.id);
      this.customDetail.controls['fullName'].setValue(cus.fullName);
      this.customDetail.controls['email'].setValue(cus.email);
      this.customDetail.controls['purchaseDescr'].setValue(cus.purchaseDescr);
      this.customDetail.controls['colors'].setValue(cus.colors);

      this.colorList = this.customDetail.controls['colors'].value;
      console.log(this.colorList);
  }

  updateCustomer(){
    this.custObj.id = this.customDetail.value.id;
    this.custObj.fullName = this.customDetail.value.fullName;
    this.custObj.email = this.customDetail.value.email;
    this.custObj.purchaseDescr = this.customDetail.value.purchaseDescr;
    this.custObj.colors = this.customDetail.value.colors;

    this.custService.updateCustomer(this.customDetail.value.id,this.customDetail.value).subscribe(res=>{
      console.log(res);
      //this.customDetail.setValue({id:this.custObj.id, fullName:this.custObj.fullName, email:this.custObj.email, purchaseDescr: this.custObj.purchaseDescr});      
      this.getAllCustomer();
    });
  }

  deleteCustomer(cus: Customer){
    console.log('Registro a eliminar es: '+ cus.id);
    this.custService.deleteCustomer(cus.id).subscribe(res=>{
      console.log(res);
      alert('Customer deleted successfully');
      this.getAllCustomer();
    })
  }

}
