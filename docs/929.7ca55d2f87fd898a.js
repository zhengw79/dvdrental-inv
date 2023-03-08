"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[929],{7929:(fe,f,l)=>{l.r(f),l.d(f,{OrderModule:()=>ue});var m=l(6895),d=l(5567),e=l(8256),T=l(7064);function A(o,s){1&o&&e._UZ(0,"router-outlet")}let q=(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-order"]],decls:3,vars:0,consts:[["child",""]],template:function(t,r){1&t&&(e.TgZ(0,"app-main"),e.YNc(1,A,1,0,"ng-template",null,0,e.W1O),e.qZA())},dependencies:[d.lC,T.C]}),o})();var U=l(2340);let N=(()=>{class o{constructor(t){this.router=t;const r=localStorage.getItem("access_token");this.dataTableOption={responsive:!0,processing:!0,serverSide:!0,searching:!1,ajax:{url:`${U.N.apiUrl}graphql`,type:"POST",contentType:"application/json",headers:{authorization:`bearer ${r}`},statusCode:{401:()=>{this.router.navigate(["/auth/login"])}}}}}initCustomersDatatable(){const t=Object.assign({},this.dataTableOption);return t.ajax.data=r=>{const i={operationName:null,query:"query retrieveCustomerDatatablePagination($pageOption: DatatablePaginationInput!){\n          retrieveCustomerDatatablePagination(pageOption: $pageOption) {\n            data { customer_id store_id first_name last_name email create_date address_id address } totalCount } }",variables:{pageOption:{paginate:{page:r.start/r.length,limit:r.length},sort:[{field:r.columns[r.order[0].column].data,order:r.order[0].dir.toUpperCase()}],search:r.search.vale??""}}};return JSON.stringify(i)},t.ajax.dataSrc=r=>{const{data:n,errors:i}=r;if(!i||!i[0]||"Unauthorized"!==i[0].message){const{retrieveCustomerDatatablePagination:c}=n;return r.recordsTotal=c.totalCount,r.recordsFiltered=c.totalCount,c.data}this.router.navigate(["/auth/login"])},t}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(d.F0))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();const S=["customer_tbl"],w=function(){return["/order/customer/create"]};let x=(()=>{class o{constructor(t,r,n){this.datatableService=t,this.router=r,this.ngZone=n,this.$=window.jQuery}ngOnInit(){window.onSelectCustomer=this.onSelectCustomer.bind(this)}ngAfterViewInit(){const t=this.datatableService.initCustomersDatatable();t.columnDefs=[{target:0,data:"customer_id",title:"Id",render:r=>`<button type='button' class='btn btn-primary btn-sm' onClick="onSelectCustomer(${r})"><i class="fas fa-eye"></i></button>`},{target:1,data:"first_name",title:"Customer Name",render:(r,n,i)=>`${r} ${i.last_name}`},{target:2,data:"email",title:"Email"},{target:3,data:"address",title:"Address"},{target:4,data:"store_id",title:"Store Id"}],this.$(this.customer_tbl?.nativeElement).DataTable(t)}onSelectCustomer(t){this.ngZone.run(()=>this.router.navigate([`/order/customer/${t}`]))}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(N),e.Y36(d.F0),e.Y36(e.R0b))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-customers"]],viewQuery:function(t,r){if(1&t&&e.Gf(S,5),2&t){let n;e.iGM(n=e.CRH())&&(r.customer_tbl=n.first)}},hostBindings:function(t,r){1&t&&e.NdJ("onSelectCustomer",function(i){return r.onSelectCustomer(i)},!1,e.Jf7)},decls:15,vars:2,consts:[[1,"d-sm-flex","align-items-center","justify-content-between","mb-4"],[1,"h3","mb-0","text-gray-800"],["type","button",1,"btn","btn-primary",3,"routerLink"],[1,"fas","fa-plus"],[1,"row"],["ckass","col-12 mb-4"],[1,"col-12","mb-4"],[1,"card","shadow"],[1,"card-header"],[1,"card-body"],[1,"datatable"],[1,"display"],["customer_tbl",""]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2,"Customers "),e.TgZ(3,"a",2),e._UZ(4,"i",3),e.qZA()()(),e.TgZ(5,"div",4),e._UZ(6,"div",5),e.qZA(),e.TgZ(7,"div",6)(8,"div",7)(9,"div",8),e._uU(10,"Customers"),e.qZA(),e.TgZ(11,"div",9)(12,"div",10),e._UZ(13,"table",11,12),e.qZA()()()()),2&t&&(e.xp6(3),e.Q6J("routerLink",e.DdM(1,w)))},dependencies:[d.yS]}),o})();var u=l(5861);let O=(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-customer-search-address"]],decls:2,vars:0,template:function(t,r){1&t&&(e.TgZ(0,"p"),e._uU(1,"search.address works!"),e.qZA())}}),o})();var a=l(433),g=l(2284),v=l(4854),y=l(366),h=l(9808),J=l(5136);let Q=(()=>{class o extends J.b{retrieveCustomerEntityById(t){var r=this;return(0,u.Z)(function*(){const{data:n,errors:i}=yield(0,h.n)(r.apollo.query({query:y.Ps`query {
        retrieveCustomerEntityById(customer_id: ${t}) {
          customer_id store_id first_name last_name email create_date
          address { address_id address address2 district phone postal_code
            city { city { city_id city }
              country { country_id country }}}
          rentals { rental_id rental_date return_date }
          payments { payment_id payment_date paypal_request_id }
        }}`}));return r.redirectToLoginIfError(i),n.retrieveCustomerEntityById})()}updateCustomerInfo(t){var r=this;return(0,u.Z)(function*(){const{data:n,errors:i}=yield(0,h.n)(r.apollo.query({query:y.Ps`mutation updateCustomerInfo($payload: CustomerInfoInput!) {
        updateCustomerInfo(payload: $payload)
      }`,variables:{payload:t}}));return r.redirectToLoginIfError(i),n.updateCustomerInfo})()}}return o.\u0275fac=function(){let s;return function(r){return(s||(s=e.n5z(o)))(r||o)}}(),o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var Y=l(9688),V=l(9103);const P=["customer_card_el"],k=["phone_el"],$=["postal_el"],E=["country_el"],F=["city_el"];function G(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1," Please enter customer's first name. "),e.qZA())}function M(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1,"Please enter customer's last name."),e.qZA())}function D(o,s){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,M,2,0,"div",10),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.last_name.errors?null:t.last_name.errors.required)}}function R(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1,"Please enter customer's email."),e.qZA())}function z(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1,"Please enter a valid customer's email."),e.qZA())}function B(o,s){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,R,2,0,"div",10),e.YNc(2,z,2,0,"div",10),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.email.errors?null:t.email.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.email.errors?null:t.email.errors.email)}}function j(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1,"Please enter the customer's address."),e.qZA())}function H(o,s){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,j,2,0,"div",10),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.address.errors?null:t.address.errors.required)}}function L(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1," Please enter customer's district. "),e.qZA())}function X(o,s){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,L,2,0,"div",10),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.district.errors?null:t.district.errors.required)}}function W(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1," Please enter customer's phone number. "),e.qZA())}function K(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1," Please enter a valid phone number. "),e.qZA())}function ee(o,s){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,W,2,0,"div",10),e.YNc(2,K,2,0,"div",10),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.phone.errors?null:t.phone.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.phone.errors?null:t.phone.errors.valid_phone)}}function te(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1,"Please enter postal code."),e.qZA())}function re(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1,"Please enter a valid postal code."),e.qZA())}function oe(o,s){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,te,2,0,"div",10),e.YNc(2,re,2,0,"div",10),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.postal_code.errors?null:t.postal_code.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.postal_code.errors?null:t.postal_code.errors.valid_postalcode)}}function ne(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1," Please choose a country. "),e.qZA())}function se(o,s){1&o&&(e.TgZ(0,"div",31),e._uU(1," Please choose a city. "),e.qZA())}let ie=(()=>{class o{constructor(t,r,n,i){this.orderService=t,this.addressService=r,this._route=n,this.validatorService=i,this.countries=[],this.fg_customer=new a.cw({customer_id:new a.NI(""),address_id:new a.NI(""),first_name:new a.NI("",[a.kI.required]),last_name:new a.NI("",[a.kI.required]),email:new a.NI("",[a.kI.required,a.kI.email]),create_date:new a.NI({disabled:!0,value:""}),address:new a.NI("",[a.kI.required]),address2:new a.NI("",[a.kI.required]),district:new a.NI("",[a.kI.required]),phone:new a.NI("",[a.kI.required,i.phoneNumberValidator]),postal_code:new a.NI("",[a.kI.required,i.postalcodeValidator]),country_id:new a.NI("",[a.kI.required]),city_id:new a.NI({value:"",disabled:!0},a.kI.required)}),this.customer_id=parseInt(n.snapshot.paramMap.get("customer_id")),this.$=window.jQuery}ngOnInit(){}ngAfterViewInit(){var t=this;return(0,u.Z)(function*(){if(t.im_phone=(0,g.ZP)(t.phone_el?.nativeElement,{mask:"(000)000-00-00",lazy:!1,placeholderChar:"_",commit:(r,n)=>{const{unmaskedValue:i}=n;t.phone?.setValue(i)}}),t.im_postal=(0,g.ZP)(t.postal_el?.nativeElement,{mask:"a0a-0a0",lazy:!1,placeholderChar:"#",commit:(r,n)=>{const{unmaskedValue:i}=n;t.postal_code?.setValue(i)}}),yield t.initCountry(),t.customer_id){const r=yield t.orderService.retrieveCustomerEntityById(t.customer_id);t.prefillCustomerForm(r)}})()}prefillCustomerForm(t){const{first_name:r,last_name:n,email:i,create_date:c,address:{address_id:p,address:me,address2:pe,district:_e,phone:Z,postal_code:I,city:{city:{city_id:b},country:{country_id:_}}}}=t;this._customer_id?.setValue(this.customer_id),this.address_id?.setValue(p),this.first_name?.setValue(r),this.last_name?.setValue(n),this.email?.setValue(i),this.create_date?.setValue(c),this.address?.setValue(me),this.address2?.setValue(pe),this.district?.setValue(_e?.toUpperCase()),this.phone?.setValue(Z),this.im_phone.value=Z,this.postal_code?.setValue(I),this.im_postal.value=I,this.country?.setValue(_),this.sel_country?.val(_).trigger("change"),this.city?.setValue(b),this.initCity(_),this.sel_city?.val(b).trigger("change")}initCountry(){var t=this;return(0,u.Z)(function*(){t.$(t.customer_card_el?.nativeElement).block({message:null,css:v.Q});const r=yield t.addressService.retrieveCountryEntities();t.$(t.customer_card_el?.nativeElement).unblock();const n=t.$(t.country_el?.nativeElement);n.hasClass("select2-hidden-accessible")&&(n.empty().trigger("change"),n.select2("destroy")),r&&(t.sel_country=n.select2({data:[{id:"",text:"Please select a country."},...r.map(i=>({id:i.country_id,text:i.country}))]}).on("select2:select",i=>{const{id:c}=i.params.data;t.country?.setValue(+c)}),t.countries=r),t.country?.valueChanges.subscribe(i=>{t.sel_country.val(i).trigger("change"),t.initCity(i)})})()}initCity(t){const r=this.$(this.city_el?.nativeElement);r.hasClass("select2-hidden-accessible")&&(r.empty().trigger("change"),r.select2("destroy"));const n=this.countries.find(i=>i.country_id===t);if(n){const{cities:i}=n;this.sel_city=r.select2({data:[{id:"",text:"Please select a city."},...i.map(c=>({id:c.city_id,text:c.city}))]}).on("select2:select",c=>{const{id:p}=c.params.data;this.city?.setValue(+p)}),this.city?.enable(),this.city?.valueChanges.subscribe(c=>{this.sel_city.val(c).trigger("change")})}else this.city?.disable()}get address_id(){return this.fg_customer.get("address_id")}get _customer_id(){return this.fg_customer.get("customer_id")}get first_name(){return this.fg_customer.get("first_name")}get last_name(){return this.fg_customer.get("last_name")}get email(){return this.fg_customer.get("email")}get create_date(){return this.fg_customer.get("create_date")}get address(){return this.fg_customer.get("address")}get address2(){return this.fg_customer.get("address2")}get district(){return this.fg_customer.get("district")}get phone(){return this.fg_customer.get("phone")}get postal_code(){return this.fg_customer.get("postal_code")}get country(){return this.fg_customer.get("country_id")}get city(){return this.fg_customer.get("city_id")}onSubmit(){var t=this;return(0,u.Z)(function*(){if(t.fg_customer.markAllAsTouched(),t.fg_customer.invalid)return;const{country_id:r,...n}=t.fg_customer.value;t.$(t.customer_card_el?.nativeElement).block({message:null,css:v.Q}),t.customer_id&&(yield t.orderService.updateCustomerInfo(n)),t.$(t.customer_card_el?.nativeElement).unblock()})()}onReset(){this.fg_customer.reset(),this.ngAfterViewInit()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(Q),e.Y36(Y.D),e.Y36(d.gz),e.Y36(V.o))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-customer-info"]],viewQuery:function(t,r){if(1&t&&(e.Gf(P,5),e.Gf(k,5),e.Gf($,5),e.Gf(E,5),e.Gf(F,5)),2&t){let n;e.iGM(n=e.CRH())&&(r.customer_card_el=n.first),e.iGM(n=e.CRH())&&(r.phone_el=n.first),e.iGM(n=e.CRH())&&(r.postal_el=n.first),e.iGM(n=e.CRH())&&(r.country_el=n.first),e.iGM(n=e.CRH())&&(r.city_el=n.first)}},decls:80,vars:10,consts:[[1,"card","shadow","mb-4"],[1,"card-header"],[1,"m-0","font-weight-bold","text-primary"],[1,"card-body"],["customer_card_el",""],[1,"user",3,"formGroup","ngSubmit"],[1,"form-group","row"],[1,"col-sm-6","mb-3","mb-sm-0"],[1,"form-span","mx-2"],["type","text","formControlName","first_name",1,"form-control","form-control-user"],["class","help-error",4,"ngIf"],["type","text","formControlName","last_name",1,"form-control","form-control-user"],[4,"ngIf"],["type","text","formControlName","email",1,"form-control","form-control-user"],["type","text","formControlName","create_date",1,"form-control","form-control-user"],[1,"col-sm-12","mb-3","mb-sm-0"],["type","text","formControlName","address",1,"form-control","form-control-user"],["type","text","formControlName","address2",1,"form-control","form-control-user"],["type","text","formControlName","district",1,"form-control","form-control-user"],["type","text","formControlName","phone",1,"form-control","form-control-user"],["phone_el",""],["type","text","formControlName","postal_code",1,"form-control","form-control-user"],["postal_el",""],["formControlName","country_id",1,"form-control","form-control-user","form-control-select"],["country_el",""],["formControlName","city_id",1,"form-control","form-control-user","form-control-select"],["city_el",""],[1,"form-group","row","mb-3"],[1,"col"],["type","submit",1,"btn","btn-primary","btn-user","btn-block"],["type","button",1,"btn","btn-secondary","btn-user","btn-block",3,"click"],[1,"help-error"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h6",2),e._uU(3,"Customer Info"),e.qZA()(),e.TgZ(4,"div",3,4)(6,"form",5),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(7,"div",6)(8,"div",7)(9,"label",8),e._uU(10,"First name*"),e.qZA(),e._UZ(11,"input",9),e.YNc(12,G,2,0,"div",10),e.qZA(),e.TgZ(13,"div",7)(14,"label",8),e._uU(15,"Last name*"),e.qZA(),e._UZ(16,"input",11),e.YNc(17,D,2,1,"div",12),e.qZA()(),e.TgZ(18,"div",6)(19,"div",7)(20,"label",8),e._uU(21,"Email*"),e.qZA(),e._UZ(22,"input",13),e.YNc(23,B,3,2,"div",12),e.qZA(),e.TgZ(24,"div",7)(25,"label",8),e._uU(26,"Create date"),e.qZA(),e._UZ(27,"input",14),e.qZA()(),e._UZ(28,"hr"),e.TgZ(29,"div",6)(30,"div",15)(31,"label",8),e._uU(32,"Address*"),e.qZA(),e._UZ(33,"input",16),e.YNc(34,H,2,1,"div",12),e.qZA()(),e.TgZ(35,"div",6)(36,"div",15)(37,"label",8),e._uU(38,"Address 2"),e.qZA(),e._UZ(39,"input",17),e.qZA()(),e.TgZ(40,"div",6)(41,"div",7)(42,"label",8),e._uU(43,"District*"),e.qZA(),e._UZ(44,"input",18),e.YNc(45,X,2,1,"div",12),e.qZA(),e.TgZ(46,"div",7)(47,"label",8),e._uU(48,"Phone number*"),e.qZA(),e._UZ(49,"input",19,20),e.YNc(51,ee,3,2,"div",12),e.qZA()(),e.TgZ(52,"div",6)(53,"div",7)(54,"label",8),e._uU(55,"Postal code*"),e.qZA(),e._UZ(56,"input",21,22),e.YNc(58,oe,3,2,"div",12),e.qZA()(),e.TgZ(59,"div",6)(60,"div",7)(61,"label",8),e._uU(62,"Country*"),e.qZA(),e._UZ(63,"select",23,24),e.YNc(65,ne,2,0,"div",10),e.qZA(),e.TgZ(66,"div",7)(67,"label",8),e._uU(68,"City*"),e.qZA(),e._UZ(69,"select",25,26),e.YNc(71,se,2,0,"div",10),e.qZA()(),e._UZ(72,"hr"),e.TgZ(73,"div",27)(74,"div",28)(75,"button",29),e._uU(76,"Save"),e.qZA()(),e.TgZ(77,"div",28)(78,"button",30),e.NdJ("click",function(){return r.onReset()}),e._uU(79,"Reset"),e.qZA()()()()()()),2&t&&(e.xp6(6),e.Q6J("formGroup",r.fg_customer),e.xp6(6),e.Q6J("ngIf",r.first_name&&r.first_name.invalid&&(r.first_name.dirty||r.first_name.touched)),e.xp6(5),e.Q6J("ngIf",r.last_name&&r.last_name.invalid&&(r.last_name.dirty||r.last_name.touched)),e.xp6(6),e.Q6J("ngIf",r.email&&r.email.invalid&&(r.email.dirty||r.email.touched)),e.xp6(11),e.Q6J("ngIf",r.address&&r.address.invalid&&(r.address.dirty||r.address.touched)),e.xp6(11),e.Q6J("ngIf",r.district&&r.district.invalid&&(r.district.dirty||r.district.touched)),e.xp6(6),e.Q6J("ngIf",r.phone&&r.phone.invalid&&(r.phone.dirty||r.phone.touched)),e.xp6(7),e.Q6J("ngIf",r.postal_code&&r.postal_code.invalid&&(r.postal_code.dirty||r.postal_code.touched)),e.xp6(7),e.Q6J("ngIf",r.country&&r.country.invalid&&(r.country.dirty||r.country.touched)&&(null==r.country.errors?null:r.country.errors.required)),e.xp6(6),e.Q6J("ngIf",r.city&&r.city.invalid&&(r.city.dirty||r.city.touched)&&(null==r.city.errors?null:r.city.errors.required)))},dependencies:[m.O5,a._Y,a.Fj,a.EJ,a.JJ,a.JL,a.sg,a.u]}),o})();const ae=function(){return["/order/customer"]};let C=(()=>{class o{constructor(){}ngOnInit(){}ngAfterViewInit(){return(0,u.Z)(function*(){})()}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-customer"]],decls:10,vars:2,consts:[[1,"d-sm-flex","align-items-center","justify-content-between","mb-4"],[1,"h3","mb-0","text-gray-800"],["type","button",1,"btn","btn-primary",3,"routerLink"],[1,"fas","fa-arrow-circle-left"],[1,"row"],[1,"col-lg-6"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"h1",1)(2,"a",2),e._UZ(3,"i",3),e.qZA(),e._uU(4,"\xa0\xa0Customer & rentals"),e.qZA()(),e.TgZ(5,"div",4)(6,"div",5),e._UZ(7,"app-customer-info"),e.qZA(),e.TgZ(8,"div",5),e._UZ(9,"app-customer-search-address"),e.qZA()()),2&t&&(e.xp6(2),e.Q6J("routerLink",e.DdM(1,ae)))},dependencies:[d.yS,O,ie]}),o})();const le=[{path:"",component:q,children:[{path:"customer",component:x},{path:"customer/:customer_id",component:C},{path:"customer/create",component:C}]}];let ce=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[m.ez,d.Bz.forChild(le)]}),o})();var de=l(4805);let ue=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[m.ez,d.Bz,ce,a.UX,de.x]}),o})()}}]);