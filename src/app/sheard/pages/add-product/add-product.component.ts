import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product-service';
import { Subject } from 'rxjs';
import { DataService } from '../../service/data-service';
import { Iproduct } from '../../model/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddTemplateComponent implements OnInit, OnDestroy {
  productForm !: FormGroup;
  isVisibleControls: boolean = false;
  @Output() isVisbleViewEvent = new EventEmitter()
  unSubscript$: Subject<void> = new Subject<void>()

  constructor(private _prodcutService: ProductService,
    private dataService: DataService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.editProduct();

  }

  createForm(): void {
  
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),
      modifidedBy: new FormControl(),
      modifiedOn: new FormControl(),
      formArray: this._fb.array([]),
      templateId : new FormControl()
    })
  }

  editProduct(): void {
    this.dataService.getProducts().subscribe((data: any) => { })
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this._prodcutService.addProducts(this.productForm.value).subscribe((data) => { });
      this.isVisbleViewEvent.emit(false)
    }
  }

  addFormsArrayFeilds(): void {
    this.isVisibleControls=true;
    const formControl = new FormControl(null, [Validators.required]);
    if (this.getformArray.length>0 && this.getformArray.length < 6) {
      this.getformArray.push(formControl)
    }
  }


  concel(): void {
    this.isVisbleViewEvent.emit(false)
  }

  get getformArray() {
    return this.productForm.get("formArray") as FormArray
  }

  get productFormControls() {
    return this.productForm.controls;
  }

  ngOnDestroy(): void {
    // this.unSubscript$.next();
    // this.unSubscript$.complete()
  }
}
