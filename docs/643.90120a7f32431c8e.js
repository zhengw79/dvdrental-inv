"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[643],{6643:(Et,A,c)=>{c.r(A),c.d(A,{OrderModule:()=>Ot});var v=c(6895),_=c(6216),e=c(8256),$=c(7064);function j(r,n){1&r&&e._UZ(0,"router-outlet")}let L=(()=>{class r{constructor(){}ngOnInit(){}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-order"]],decls:3,vars:0,consts:[["child",""]],template:function(t,o){1&t&&(e.TgZ(0,"app-main"),e.YNc(1,j,1,0,"ng-template",null,0,e.W1O),e.qZA())},dependencies:[_.lC,$.C]}),r})();var k=c(2340);let B=(()=>{class r{constructor(t){this.router=t;const o=localStorage.getItem("access_token");this.dataTableOption={responsive:!0,processing:!0,serverSide:!0,searching:!1,ajax:{url:`${k.N.apiUrl}graphql`,type:"POST",contentType:"application/json",headers:{authorization:`bearer ${o}`},statusCode:{401:()=>{this.router.navigate(["/auth/login"])}}}}}initCustomersDatatable(){const t=Object.assign({},this.dataTableOption);return t.ajax.data=o=>{const s={operationName:null,query:"query retrieveCustomerDatatablePagination($pageOption: DatatablePaginationInput!){\n          retrieveCustomerDatatablePagination(pageOption: $pageOption) {\n            data { customer_id store_id first_name last_name email create_date address_id address } totalCount } }",variables:{pageOption:{paginate:{page:o.start/o.length,limit:o.length},sort:[{field:o.columns[o.order[0].column].data,order:o.order[0].dir.toUpperCase()}],search:o.search.vale??""}}};return JSON.stringify(s)},t.ajax.dataSrc=o=>{const{data:i,errors:s}=o;if(!s||!s[0]||"Unauthorized"!==s[0].message){const{retrieveCustomerDatatablePagination:a}=i;return o.recordsTotal=a.totalCount,o.recordsFiltered=a.totalCount,a.data}this.router.navigate(["/auth/login"])},t}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(_.F0))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();const X=["customer_tbl"],ee=function(){return["/order/customer/create"]};let te=(()=>{class r{constructor(t,o,i){this.datatableService=t,this.router=o,this.ngZone=i,this.$=window.jQuery}ngOnInit(){window.onSelectCustomer=this.onSelectCustomer.bind(this)}ngAfterViewInit(){const t=this.datatableService.initCustomersDatatable();t.columnDefs=[{target:0,data:"customer_id",title:"Id",render:o=>`<button type='button' class='btn btn-primary btn-sm' onClick="onSelectCustomer(${o})"><i class="fas fa-eye"></i></button>`},{target:1,data:"first_name",title:"Customer Name",render:(o,i,s)=>`${o} ${s.last_name}`},{target:2,data:"email",title:"Email"},{target:3,data:"address",title:"Address"},{target:4,data:"store_id",title:"Store Id"}],this.$(this.customer_tbl?.nativeElement).DataTable(t)}onSelectCustomer(t){this.ngZone.run(()=>this.router.navigate([`/order/customer/${t}`]))}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(B),e.Y36(_.F0),e.Y36(e.R0b))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-customers"]],viewQuery:function(t,o){if(1&t&&e.Gf(X,5),2&t){let i;e.iGM(i=e.CRH())&&(o.customer_tbl=i.first)}},hostBindings:function(t,o){1&t&&e.NdJ("onSelectCustomer",function(s){return o.onSelectCustomer(s)},!1,e.Jf7)},decls:15,vars:2,consts:[[1,"d-sm-flex","align-items-center","justify-content-between","mb-4"],[1,"h3","mb-0","text-gray-800"],["type","button",1,"btn","btn-primary",3,"routerLink"],[1,"fas","fa-plus"],[1,"row"],["ckass","col-12 mb-4"],[1,"col-12","mb-4"],[1,"card","shadow"],[1,"card-header"],[1,"card-body"],[1,"datatable"],[1,"display"],["customer_tbl",""]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2,"Customers "),e.TgZ(3,"a",2),e._UZ(4,"i",3),e.qZA()()(),e.TgZ(5,"div",4),e._UZ(6,"div",5),e.qZA(),e.TgZ(7,"div",6)(8,"div",7)(9,"div",8),e._uU(10,"Customers"),e.qZA(),e.TgZ(11,"div",9)(12,"div",10),e._UZ(13,"table",11,12),e.qZA()()()()),2&t&&(e.xp6(3),e.Q6J("routerLink",e.DdM(1,ee)))},dependencies:[_.yS]}),r})();var m=c(5861),l=c(433),U=c(9688),re=c(9646),N=c(8421),x=c(9751),q=c(5577),oe=c(1144),y=c(576),ne=c(3268);const ie=["addListener","removeListener"],se=["addEventListener","removeEventListener"],le=["on","off"];function T(r,n,t,o){if((0,y.m)(t)&&(o=t,t=void 0),o)return T(r,n,t).pipe((0,ne.Z)(o));const[i,s]=function de(r){return(0,y.m)(r.addEventListener)&&(0,y.m)(r.removeEventListener)}(r)?se.map(a=>u=>r[a](n,u,t)):function ae(r){return(0,y.m)(r.addListener)&&(0,y.m)(r.removeListener)}(r)?ie.map(D(r,n)):function ce(r){return(0,y.m)(r.on)&&(0,y.m)(r.off)}(r)?le.map(D(r,n)):[];if(!i&&(0,oe.z)(r))return(0,q.z)(a=>T(a,n,t))((0,N.Xf)(r));if(!i)throw new TypeError("Invalid event target");return new x.y(a=>{const u=(...d)=>a.next(1<d.length?d:d[0]);return i(u),()=>s(u)})}function D(r,n){return t=>o=>r[t](n,o)}var J=c(4004),O=c(8505),ue=c(9300),fe=c(4408);const E=new(c(640).v)(fe.o),pe=E;var he=c(4482),F=c(5403);const Q={leading:!0,trailing:!1};var ge=c(3532);function Se(r,n=E,t=Q){const o=function ye(r=0,n,t=pe){let o=-1;return null!=n&&((0,ge.K)(n)?t=n:o=n),new x.y(i=>{let s=function ve(r){return r instanceof Date&&!isNaN(r)}(r)?+r-t.now():r;s<0&&(s=0);let a=0;return t.schedule(function(){i.closed||(i.next(a++),0<=o?this.schedule(void 0,o):i.complete())},s)})}(r,n);return function _e(r,n=Q){return(0,he.e)((t,o)=>{const{leading:i,trailing:s}=n;let a=!1,u=null,d=null,f=!1;const p=()=>{d?.unsubscribe(),d=null,s&&(C(),f&&o.complete())},g=()=>{d=null,f&&o.complete()},S=h=>d=(0,N.Xf)(r(h)).subscribe((0,F.x)(o,p,g)),C=()=>{if(a){a=!1;const h=u;u=null,o.next(h),!f&&S(h)}};t.subscribe((0,F.x)(o,h=>{a=!0,u=h,(!d||d.closed)&&(i?C():S(h))},()=>{f=!0,(!(s&&a&&d)||d.closed)&&o.complete()}))})}(()=>o,t)}function Ce(r,n,t,o){const i=window&&!!window.document&&window.document.documentElement;let s=i&&n?window:t;if(r&&(s=r&&i&&"string"==typeof r?function Te(r,n,t){return(t?window.document:n).querySelector(r)}(r,t.nativeElement,o):r,!s))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return s}function Z(r){return r&&!r.firstChange}const Ie={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},be={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"};class we{constructor(n=!0){this.vertical=n,this.propsMap=n?Ie:be}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}}function xe(r){return["Window","global"].some(t=>Object.prototype.toString.call(r).includes(t))}function I(r,n){return r?n.document.documentElement:null}function Y(r,n){const t=function Je({container:r,isWindow:n,axis:t}){const{offsetHeightKey:o,clientHeightKey:i}=P(t);return H(r,n,o,i)}(n);return n.isWindow?function qe(r,n,t){const{axis:o,container:i,isWindow:s}=t,{offsetHeightKey:a,clientHeightKey:u}=P(o),d=r+V(I(s,i),o,s),f=H(n.nativeElement,s,a,u),p=function Oe(r,n,t){const o=n.topKey();if(r.getBoundingClientRect)return r.getBoundingClientRect()[o]+V(r,n,t)}(n.nativeElement,o,s)+f;return{height:r,scrolled:d,totalToScroll:p,isWindow:s}}(t,r,n):function De(r,n,t){const{axis:o,container:i}=t;return{height:r,scrolled:i[o.scrollTopKey()],totalToScroll:i[o.scrollHeightKey()],isWindow:!1}}(t,0,n)}function P(r){return{offsetHeightKey:r.offsetHeightKey(),clientHeightKey:r.clientHeightKey()}}function H(r,n,t,o){if(isNaN(r[t])){const i=I(n,r);return i?i[o]:0}return r[t]}function V(r,n,t){const o=n.pageYOffsetKey(),i=n.scrollTopKey(),s=n.offsetTopKey();return isNaN(window.pageYOffset)?I(t,r)[i]:r.ownerDocument?r.ownerDocument.defaultView[o]:r[s]}function Ee(r,n={down:0,up:0},t){let o,i;if(r.totalToScroll<=0)return!1;const s=r.isWindow?r.scrolled:r.height+r.scrolled;return t?(o=(r.totalToScroll-s)/r.totalToScroll,i=(n?.down?n.down:0)/10):(o=r.scrolled/(r.scrolled+(r.totalToScroll-s)),i=(n?.up?n.up:0)/10),o<=i}class He{constructor({totalToScroll:n}){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=n}updateScrollPosition(n){return this.lastScrollPosition=n}updateTotalToScroll(n){this.lastTotalToScroll!==n&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=n)}updateScroll(n,t){this.updateScrollPosition(n),this.updateTotalToScroll(t)}updateTriggeredFlag(n,t){t?this.triggered.down=n:this.triggered.up=n}isTriggeredScroll(n,t){return t?this.triggered.down===n:this.triggered.up===n}}function Ve(r){const{scrollContainer:n,scrollWindow:t,element:o,fromRoot:i}=r,s=function Ue({windowElement:r,axis:n}){return function Ne(r,n){const t=r.isWindow||n&&!n.nativeElement?n:n.nativeElement;return{...r,container:t}}({axis:n,isWindow:xe(r)},r)}({axis:new we(!r.horizontal),windowElement:Ce(n,t,o,i)}),a=new He({totalToScroll:Y(o,s)}),d={up:r.upDistance,down:r.downDistance};return function Me(r){let n=T(r.container,"scroll");return r.throttle&&(n=n.pipe(Se(r.throttle,void 0,{leading:!0,trailing:!0}))),n}({container:s.container,throttle:r.throttle}).pipe((0,q.z)(()=>(0,re.of)(Y(o,s))),(0,J.U)(f=>function We(r,n,t){const{scrollDown:o,fire:i}=function Qe(r,n,t){const o=function Fe(r,n){return r<n.scrolled}(r,n);return{fire:Ee(n,t,o),scrollDown:o}}(r,n,t);return{scrollDown:o,fire:i,stats:n}}(a.lastScrollPosition,f,d)),(0,O.b)(({stats:f})=>a.updateScroll(f.scrolled,f.totalToScroll)),(0,ue.h)(({fire:f,scrollDown:p,stats:{totalToScroll:g}})=>function Ae(r,n,t){return!!(r&&n||!t&&n)}(r.alwaysCallback,f,a.isTriggeredScroll(g,p))),(0,O.b)(({scrollDown:f,stats:{totalToScroll:p}})=>{a.updateTriggeredFlag(p,f)}),(0,J.U)(Ge))}function Ge(r){const{scrollDown:n,stats:{scrolled:t}}=r;return{type:n?"[NGX_ISE] DOWN":"[NGX_ISE] UP",payload:{currentScrollPosition:t}}}let M=(()=>{class r{constructor(t,o){this.element=t,this.zone=o,this.scrolled=new e.vpe,this.scrolledUp=new e.vpe,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:t,infiniteScrollDisabled:o,infiniteScrollDistance:i}){const s=Z(t),a=Z(o),u=Z(i),d=!a&&!this.infiniteScrollDisabled||a&&!o.currentValue||u;(s||a||u)&&(this.destroyScroller(),d&&this.setup())}setup(){(function Ze(){return typeof window<"u"})()&&this.zone.runOutsideAngular(()=>{this.disposeScroller=Ve({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(t=>this.handleOnScroll(t))})}handleOnScroll({type:t,payload:o}){const i="[NGX_ISE] DOWN"===t?this.scrolled:this.scrolledUp;(function ze(r){return r.observed??r.observers.length>0})(i)&&this.zone.run(()=>i.emit(o))}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(e.SBq),e.Y36(e.R0b))},r.\u0275dir=e.lG2({type:r,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[e.TTD]}),r})(),Ke=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({}),r})();const Re=["address_list"];function $e(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"div",14)(1,"div",15)(2,"input",16),e.NdJ("change",function(i){e.CHM(t);const s=e.oxw(2);return e.KtG(s.selected(i))}),e.qZA()(),e.TgZ(3,"div",17)(4,"label",18),e._uU(5),e._UZ(6,"br")(7,"i",19),e._uU(8),e._UZ(9,"br")(10,"i",20),e._uU(11),e.qZA()()()}if(2&r){const t=n.$implicit;e.xp6(2),e.Q6J("value",t.address_id)("id",t.address_id),e.xp6(2),e.Q6J("htmlFor",t.address_id),e.xp6(1),e.xDo("",t.address,", ",t.address2,", ",t.district,", ",t.city,", ",t.country,""),e.xp6(3),e.hij(": ",t.postal_code," "),e.xp6(3),e.hij(": ",t.phone,"")}}function je(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"div",11),e.NdJ("scrolled",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onScroll())}),e.TgZ(1,"form",12),e.YNc(2,$e,12,10,"div",13),e.qZA()()}if(2&r){const t=e.oxw();e.Q6J("infiniteScrollDistance",1)("infiniteScrollThrottle",50)("scrollWindow",!1),e.xp6(1),e.Q6J("formGroup",t.fg_address),e.xp6(1),e.Q6J("ngForOf",t.addresses)}}let Le=(()=>{class r{constructor(t){this.addressService=t,this.addresses=[],this.fg_search=new l.cw({search_txt:new l.NI("")}),this.fg_address=new l.cw({address_id:new l.NI}),this.$=window.jQuery,this.evt_updateAddressId=new e.vpe}ngOnInit(){}ngAfterViewInit(){return(0,m.Z)(function*(){})()}get search_txt(){return this.fg_search.get("search_txt")}onSubmit(){var t=this;return(0,m.Z)(function*(){t.addresses=[],t.search_after=0,yield t.fetchAddress()})()}onScroll(){var t=this;return(0,m.Z)(function*(){yield t.fetchAddress()})()}fetchAddress(){var t=this;return(0,m.Z)(function*(){const{data:o}=yield t.addressService.retrieveScrollAddressES({query:t.search_txt?.value,size:5,search_after:t.search_after??0});o&&(t.addresses=t.addresses.concat(o),t.search_after=o[o.length-1].address_id)})()}selected(t){this.evt_updateAddressId.emit(this.fg_address.value)}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(U.D))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-customer-search-address"]],viewQuery:function(t,o){if(1&t&&e.Gf(Re,5),2&t){let i;e.iGM(i=e.CRH())&&(o.address_list=i.first)}},outputs:{evt_updateAddressId:"evt_updateAddressId"},decls:12,vars:2,consts:[[1,"card","shadow","mb-4"],[1,"card-header"],[1,"m-0","font-weight-bold","text-primary"],[1,"card-body"],[1,"form-inline","mr-auto","w-80","navbar-search",3,"formGroup","ngSubmit"],[1,"input-group","w-100"],["type","text","placeholder","Search for address","aria-label","Search","aria-describedby","search-address","name","search_txt","formControlName","search_txt",1,"form-control","bg-light","border-0","small"],[1,"input-group-append"],["type","submit",1,"btn","btn-primary"],[1,"fas","fa-search","fa-sm"],["class","search-results mt-2","infiniteScroll","",3,"infiniteScrollDistance","infiniteScrollThrottle","scrollWindow","scrolled",4,"ngIf"],["infiniteScroll","",1,"search-results","mt-2",3,"infiniteScrollDistance","infiniteScrollThrottle","scrollWindow","scrolled"],[3,"formGroup"],["class","row my-2 p-2 border-bottom",4,"ngFor","ngForOf"],[1,"row","my-2","p-2","border-bottom"],[1,"col-2","center"],["type","radio","formControlName","address_id",1,"form-control","form-control-user",3,"value","id","change"],[1,"col-10","center"],[1,"form-span","mx-2",3,"htmlFor"],[1,"fas","fa-mail-bulk"],[1,"fas","fa-phone-volume"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h6",2),e._uU(3,"Search Address"),e.qZA()(),e.TgZ(4,"div",3)(5,"form",4),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(6,"div",5),e._UZ(7,"input",6),e.TgZ(8,"div",7)(9,"button",8),e._UZ(10,"i",9),e.qZA()()()(),e.YNc(11,je,3,5,"div",10),e.qZA()()),2&t&&(e.xp6(5),e.Q6J("formGroup",o.fg_search),e.xp6(6),e.Q6J("ngIf",o.addresses.length))},dependencies:[v.sg,v.O5,l._Y,l.Fj,l._,l.JJ,l.JL,l.sg,l.u,M]}),r})();var W=c(2284),G=c(4854),z=c(4158),K=c(9808),ke=c(5136);let Be=(()=>{class r extends ke.b{retrieveCustomerEntityById(t){var o=this;return(0,m.Z)(function*(){const{data:i,errors:s}=yield(0,K.n)(o.apollo.query({query:z.Ps`query {
        retrieveCustomerEntityById(customer_id: ${t}) {
          customer_id store_id first_name last_name email create_date
          address { address_id address address2 district phone postal_code
            city { city { city_id city }
              country { country_id country }}}
          rentals { rental_id rental_date return_date }
          payments { payment_id payment_date paypal_request_id }
        }}`}));return o.redirectToLoginIfError(s),i.retrieveCustomerEntityById})()}updateCustomerInfo(t){var o=this;return(0,m.Z)(function*(){const{data:i,errors:s}=yield(0,K.n)(o.apollo.query({query:z.Ps`mutation updateCustomerInfo($payload: CustomerInfoInput!) {
        updateCustomerInfo(payload: $payload)
      }`,variables:{payload:t}}));return o.redirectToLoginIfError(s),i.updateCustomerInfo})()}}return r.\u0275fac=function(){let n;return function(o){return(n||(n=e.n5z(r)))(o||r)}}(),r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var Xe=c(9103);const et=["customer_card_el"],tt=["phone_el"],rt=["postal_el"],ot=["country_el"],nt=["city_el"];function it(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1," Please enter customer's first name. "),e.qZA())}function st(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1,"Please enter customer's last name."),e.qZA())}function lt(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,st,2,0,"div",10),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.last_name.errors?null:t.last_name.errors.required)}}function at(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1,"Please enter customer's email."),e.qZA())}function ct(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1,"Please enter a valid customer's email."),e.qZA())}function dt(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,at,2,0,"div",10),e.YNc(2,ct,2,0,"div",10),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.email.errors?null:t.email.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.email.errors?null:t.email.errors.email)}}function ut(r,n){1&r&&e._UZ(0,"i",34)}function ft(r,n){1&r&&e._UZ(0,"i",35)}function mt(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1,"Please enter the customer's address."),e.qZA())}function pt(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,mt,2,0,"div",10),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.address.errors?null:t.address.errors.required)}}function ht(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1," Please enter customer's district. "),e.qZA())}function _t(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,ht,2,0,"div",10),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.district.errors?null:t.district.errors.required)}}function gt(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1," Please enter customer's phone number. "),e.qZA())}function vt(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1," Please enter a valid phone number. "),e.qZA())}function yt(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,gt,2,0,"div",10),e.YNc(2,vt,2,0,"div",10),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.phone.errors?null:t.phone.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.phone.errors?null:t.phone.errors.valid_phone)}}function St(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1,"Please enter postal code."),e.qZA())}function Ct(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1,"Please enter a valid postal code. "),e.qZA())}function Tt(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,St,2,0,"div",10),e.YNc(2,Ct,2,0,"div",10),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",null==t.postal_code.errors?null:t.postal_code.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.postal_code.errors?null:t.postal_code.errors.valid_postalcode)}}function Zt(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1," Please choose a country. "),e.qZA())}function It(r,n){1&r&&(e.TgZ(0,"div",33),e._uU(1," Please choose a city. "),e.qZA())}let bt=(()=>{class r{constructor(t,o,i,s){this.orderService=t,this.addressService=o,this._route=i,this.validatorService=s,this.countries=[],this.fg_customer=new l.cw({customer_id:new l.NI(""),store_id:new l.NI(""),address_id:new l.NI(""),first_name:new l.NI("",[l.kI.required]),last_name:new l.NI("",[l.kI.required]),email:new l.NI("",[l.kI.required,l.kI.email]),create_date:new l.NI({disabled:!0,value:""}),address:new l.NI("",[l.kI.required]),address2:new l.NI("",[l.kI.required]),district:new l.NI("",[l.kI.required]),phone:new l.NI("",[l.kI.required,s.phoneNumberValidator]),postal_code:new l.NI("",[l.kI.required,s.postalcodeValidator]),country_id:new l.NI("",[l.kI.required]),city_id:new l.NI({value:"",disabled:!0},l.kI.required)}),this.customer_id=parseInt(i.snapshot.paramMap.get("customer_id")),this.$=window.jQuery}ngOnInit(){}ngAfterViewInit(){var t=this;return(0,m.Z)(function*(){if(yield t.initFormPlugin(),t.customer_id){const o=yield t.orderService.retrieveCustomerEntityById(t.customer_id);t.prefillCustomerForm(o)}})()}initFormPlugin(){var t=this;return(0,m.Z)(function*(){t.im_phone=(0,W.ZP)(t.phone_el?.nativeElement,{mask:"(000)000-00-00",lazy:!1,placeholderChar:"_",commit:(o,i)=>{const{unmaskedValue:s}=i;t.phone?.setValue(s)}}),t.im_postal=(0,W.ZP)(t.postal_el?.nativeElement,{mask:"a0a-0a0",lazy:!1,placeholderChar:"#",commit:(o,i)=>{const{unmaskedValue:s}=i;t.postal_code?.setValue(s)}}),yield t.initCountry()})()}set _address_id(t){t&&this.addressService.retrieveAddress2ById(t?.address_id).then(o=>{const{address_id:i,address:s,address2:a,city_id:u,country_id:d,district:f,phone:p,postal_code:g}=o;this.address_id?.setValue(i),this.address?.setValue(s),this.address2?.setValue(a),this.district?.setValue(f),this.phone?.setValue(p),this.im_phone.value=p,this.postal_code?.setValue(g),this.im_postal.value=g,this.country?.setValue(d),this.sel_country.val(d).trigger("change"),this.city?.setValue(u),this.initCity(d),this.sel_city.val(u).trigger("change")})}set store(t){t&&(this._store=t,this.store_id?.setValue(t.store_id))}prefillCustomerForm(t){const{store_id:o,first_name:i,last_name:s,email:a,create_date:u,address:{address_id:d,address:f,address2:p,district:g,phone:S,postal_code:C,city:{city:{city_id:h},country:{country_id:w}}}}=t;this._customer_id?.setValue(this.customer_id),this.store_id?.setValue(o),this.address_id?.setValue(d),this.first_name?.setValue(i),this.last_name?.setValue(s),this.email?.setValue(a),this.create_date?.setValue(u),this.address?.setValue(f),this.address2?.setValue(p),this.district?.setValue(g?.toUpperCase()),this.phone?.setValue(S),this.im_phone.value=S,this.postal_code?.setValue(C),this.im_postal.value=C,this.country?.setValue(w),this.sel_country?.val(w).trigger("change"),this.city?.setValue(h),this.initCity(w),this.sel_city?.val(h).trigger("change")}initCountry(){var t=this;return(0,m.Z)(function*(){t.$(t.customer_card_el?.nativeElement).block({message:null,css:G.Q});const o=yield t.addressService.retrieveCountryEntities();t.$(t.customer_card_el?.nativeElement).unblock();const i=t.$(t.country_el?.nativeElement);i.hasClass("select2-hidden-accessible")&&(i.empty().trigger("change"),i.select2("destroy")),o&&(t.sel_country=i.select2({data:[{id:"",text:"Please select a country."},...o.map(s=>({id:s.country_id,text:s.country}))]}).on("select2:select",s=>{const{id:a}=s.params.data;t.country?.setValue(+a)}),t.countries=o),t.country?.valueChanges.subscribe(s=>{t.sel_country.val(s).trigger("change"),t.initCity(s)})})()}initCity(t){const o=this.$(this.city_el?.nativeElement);o.hasClass("select2-hidden-accessible")&&(o.empty().trigger("change"),o.select2("destroy"));const i=this.countries.find(s=>s.country_id===t);if(i){const{cities:s}=i;this.sel_city=o.select2({data:[{id:"",text:"Please select a city."},...s.map(a=>({id:a.city_id,text:a.city}))]}).on("select2:select",a=>{const{id:u}=a.params.data;this.city?.setValue(+u)}),this.city?.enable(),this.city?.valueChanges.subscribe(a=>{this.sel_city.val(a).trigger("change")})}else this.city?.disable()}get address_id(){return this.fg_customer.get("address_id")}get store_id(){return this.fg_customer.get("store_id")}get _customer_id(){return this.fg_customer.get("customer_id")}get first_name(){return this.fg_customer.get("first_name")}get last_name(){return this.fg_customer.get("last_name")}get email(){return this.fg_customer.get("email")}get create_date(){return this.fg_customer.get("create_date")}get address(){return this.fg_customer.get("address")}get address2(){return this.fg_customer.get("address2")}get district(){return this.fg_customer.get("district")}get phone(){return this.fg_customer.get("phone")}get postal_code(){return this.fg_customer.get("postal_code")}get country(){return this.fg_customer.get("country_id")}get city(){return this.fg_customer.get("city_id")}onSubmit(){var t=this;return(0,m.Z)(function*(){if(t.fg_customer.markAllAsTouched(),t.fg_customer.invalid)return;const{country_id:o,...i}=t.fg_customer.value;t.$(t.customer_card_el?.nativeElement).block({message:null,css:G.Q}),t.customer_id?yield t.orderService.updateCustomerInfo(i):console.log(i),t.$(t.customer_card_el?.nativeElement).unblock()})()}onReset(){this.fg_customer.reset(),this.ngAfterViewInit()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(Be),e.Y36(U.D),e.Y36(_.gz),e.Y36(Xe.o))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-customer-info"]],viewQuery:function(t,o){if(1&t&&(e.Gf(et,5),e.Gf(tt,5),e.Gf(rt,5),e.Gf(ot,5),e.Gf(nt,5)),2&t){let i;e.iGM(i=e.CRH())&&(o.customer_card_el=i.first),e.iGM(i=e.CRH())&&(o.phone_el=i.first),e.iGM(i=e.CRH())&&(o.postal_el=i.first),e.iGM(i=e.CRH())&&(o.country_el=i.first),e.iGM(i=e.CRH())&&(o.city_el=i.first)}},inputs:{_address_id:["address_id","_address_id"],store:"store"},decls:93,vars:15,consts:[[1,"card","shadow","mb-4"],[1,"card-header"],[1,"m-0","font-weight-bold","text-primary"],[1,"card-body"],["customer_card_el",""],[1,"user",3,"formGroup","ngSubmit"],[1,"form-group","row"],[1,"col-sm-6","mb-3","mb-sm-0"],[1,"form-span","mx-2"],["type","text","formControlName","first_name",1,"form-control","form-control-user"],["class","help-error",4,"ngIf"],["type","text","formControlName","last_name",1,"form-control","form-control-user"],[4,"ngIf"],["type","text","formControlName","email",1,"form-control","form-control-user"],["type","text","formControlName","create_date",1,"form-control","form-control-user"],[1,"col-sm-12","mb-3","mb-sm-0"],["class","fas fa-warehouse",4,"ngIf"],["class","fas fa-user-tie",4,"ngIf"],["type","text","formControlName","address",1,"form-control","form-control-user"],["type","text","formControlName","address2",1,"form-control","form-control-user"],["type","text","formControlName","district",1,"form-control","form-control-user"],["type","text","formControlName","phone",1,"form-control","form-control-user"],["phone_el",""],["type","text","formControlName","postal_code",1,"form-control","form-control-user"],["postal_el",""],["formControlName","country_id",1,"form-control","form-control-user","form-control-select"],["country_el",""],["formControlName","city_id",1,"form-control","form-control-user","form-control-select"],["city_el",""],[1,"form-group","row","mb-3"],[1,"col"],["type","submit",1,"btn","btn-primary","btn-user","btn-block"],["type","button",1,"btn","btn-secondary","btn-user","btn-block",3,"click"],[1,"help-error"],[1,"fas","fa-warehouse"],[1,"fas","fa-user-tie"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h6",2),e._uU(3,"Customer Info"),e.qZA()(),e.TgZ(4,"div",3,4)(6,"form",5),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(7,"div",6)(8,"div",7)(9,"label",8),e._uU(10,"First name*"),e.qZA(),e._UZ(11,"input",9),e.YNc(12,it,2,0,"div",10),e.qZA(),e.TgZ(13,"div",7)(14,"label",8),e._uU(15,"Last name*"),e.qZA(),e._UZ(16,"input",11),e.YNc(17,lt,2,1,"div",12),e.qZA()(),e.TgZ(18,"div",6)(19,"div",7)(20,"label",8),e._uU(21,"Email*"),e.qZA(),e._UZ(22,"input",13),e.YNc(23,dt,3,2,"div",12),e.qZA(),e.TgZ(24,"div",7)(25,"label",8),e._uU(26,"Create date"),e.qZA(),e._UZ(27,"input",14),e.qZA()(),e._UZ(28,"hr"),e.TgZ(29,"div",6)(30,"div",15)(31,"label",8),e._uU(32,"Store* "),e._UZ(33,"br"),e._uU(34),e._UZ(35,"br"),e.YNc(36,ut,1,0,"i",16),e._uU(37),e._UZ(38,"br"),e.YNc(39,ft,1,0,"i",17),e._uU(40),e.qZA()()(),e._UZ(41,"hr"),e.TgZ(42,"div",6)(43,"div",15)(44,"label",8),e._uU(45,"Address*"),e.qZA(),e._UZ(46,"input",18),e.YNc(47,pt,2,1,"div",12),e.qZA()(),e.TgZ(48,"div",6)(49,"div",15)(50,"label",8),e._uU(51,"Address 2"),e.qZA(),e._UZ(52,"input",19),e.qZA()(),e.TgZ(53,"div",6)(54,"div",7)(55,"label",8),e._uU(56,"District*"),e.qZA(),e._UZ(57,"input",20),e.YNc(58,_t,2,1,"div",12),e.qZA(),e.TgZ(59,"div",7)(60,"label",8),e._uU(61,"Phone number*"),e.qZA(),e._UZ(62,"input",21,22),e.YNc(64,yt,3,2,"div",12),e.qZA()(),e.TgZ(65,"div",6)(66,"div",7)(67,"label",8),e._uU(68,"Postal code*"),e.qZA(),e._UZ(69,"input",23,24),e.YNc(71,Tt,3,2,"div",12),e.qZA()(),e.TgZ(72,"div",6)(73,"div",7)(74,"label",8),e._uU(75,"Country*"),e.qZA(),e._UZ(76,"select",25,26),e.YNc(78,Zt,2,0,"div",10),e.qZA(),e.TgZ(79,"div",7)(80,"label",8),e._uU(81,"City*"),e.qZA(),e._UZ(82,"select",27,28),e.YNc(84,It,2,0,"div",10),e.qZA()(),e._UZ(85,"hr"),e.TgZ(86,"div",29)(87,"div",30)(88,"button",31),e._uU(89,"Save"),e.qZA()(),e.TgZ(90,"div",30)(91,"button",32),e.NdJ("click",function(){return o.onReset()}),e._uU(92,"Reset"),e.qZA()()()()()()),2&t&&(e.xp6(6),e.Q6J("formGroup",o.fg_customer),e.xp6(6),e.Q6J("ngIf",o.first_name&&o.first_name.invalid&&(o.first_name.dirty||o.first_name.touched)),e.xp6(5),e.Q6J("ngIf",o.last_name&&o.last_name.invalid&&(o.last_name.dirty||o.last_name.touched)),e.xp6(6),e.Q6J("ngIf",o.email&&o.email.invalid&&(o.email.dirty||o.email.touched)),e.xp6(11),e.hij("Id: ",null==o._store?null:o._store.store_id," "),e.xp6(2),e.Q6J("ngIf",o._store),e.xp6(1),e.hij("\xa0",null==o._store?null:o._store.address.replaceAll(";",", ")," "),e.xp6(2),e.Q6J("ngIf",o._store),e.xp6(1),e.hij("\xa0",null==o._store?null:o._store.manager.replaceAll(";"," ")," "),e.xp6(7),e.Q6J("ngIf",o.address&&o.address.invalid&&(o.address.dirty||o.address.touched)),e.xp6(11),e.Q6J("ngIf",o.district&&o.district.invalid&&(o.district.dirty||o.district.touched)),e.xp6(6),e.Q6J("ngIf",o.phone&&o.phone.invalid&&(o.phone.dirty||o.phone.touched)),e.xp6(7),e.Q6J("ngIf",o.postal_code&&o.postal_code.invalid&&(o.postal_code.dirty||o.postal_code.touched)),e.xp6(7),e.Q6J("ngIf",o.country&&o.country.invalid&&(o.country.dirty||o.country.touched)&&(null==o.country.errors?null:o.country.errors.required)),e.xp6(6),e.Q6J("ngIf",o.city&&o.city.invalid&&(o.city.dirty||o.city.touched)&&(null==o.city.errors?null:o.city.errors.required)))},dependencies:[v.O5,l._Y,l.Fj,l.EJ,l.JJ,l.JL,l.sg,l.u]}),r})();var wt=c(2e3);function At(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"div",14)(1,"div",15)(2,"input",16),e.NdJ("change",function(i){e.CHM(t);const s=e.oxw(2);return e.KtG(s.selected(i))}),e.qZA()(),e.TgZ(3,"div",17)(4,"label",18),e._UZ(5,"i",19),e._uU(6),e._UZ(7,"br")(8,"i",20),e._uU(9),e.qZA()()()}if(2&r){const t=n.$implicit;e.xp6(2),e.Q6J("value",t.store_id)("id",t.store_id),e.xp6(2),e.Q6J("htmlFor",t.store_id),e.xp6(2),e.hij("\xa0",t.address.replaceAll(";",", "),""),e.xp6(3),e.hij("\xa0",t.manager.replaceAll(";"," ")," ")}}function Ut(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"div",11),e.NdJ("scrolled",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onScroll())}),e.TgZ(1,"form",12),e.YNc(2,At,10,5,"div",13),e.qZA()()}if(2&r){const t=e.oxw();e.Q6J("infiniteScrollDistance",1)("infiniteScrollThrottle",50)("scrollWindow",!1),e.xp6(1),e.Q6J("formGroup",t.fg_store),e.xp6(1),e.Q6J("ngForOf",t.stores)}}let Nt=(()=>{class r{constructor(t){this.storeService=t,this.stores=[],this.fg_search=new l.cw({search_txt:new l.NI("")}),this.fg_store=new l.cw({store_id:new l.NI}),this.$=window.jQuery,this.evt_updateStoreId=new e.vpe}ngOnInit(){}get search_txt(){return this.fg_search.get("search_txt")}onSubmit(){var t=this;return(0,m.Z)(function*(){t.stores=[],t.search_after=0,yield t.fetchStores()})()}fetchStores(){var t=this;return(0,m.Z)(function*(){const{data:o}=yield t.storeService.retrieveScrollStoreEs({query:t.search_txt?.value,size:5,search_after:t.search_after??0});o&&(t.stores=t.stores.concat(o),t.search_after=o[o.length-1].store_id)})()}onScroll(){var t=this;return(0,m.Z)(function*(){yield t.fetchStores()})()}selected(t){this.evt_updateStoreId.emit(this.stores.find(o=>o.store_id===this.fg_store.value.store_id))}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(wt.d))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-search-store"]],outputs:{evt_updateStoreId:"evt_updateStoreId"},decls:12,vars:2,consts:[[1,"card","shadow","mb-4"],[1,"card-header"],[1,"m-0","font-weight-bold","text-primary"],[1,"card-body"],[1,"form-inline","mr-auto","navbar-search",3,"formGroup","ngSubmit"],[1,"input-group","w-100"],["type","text","placeholder","Search for store","aria-label","Search","aria-describedby","search-stores","formControlName","search_txt",1,"form-control","bg-light","border-0","small"],[1,"input-group-append"],["type","submit",1,"btn","btn-primary"],[1,"fas","fa-search","fa-sm"],["class","search-results mt-2","infiniteScroll","",3,"infiniteScrollDistance","infiniteScrollThrottle","scrollWindow","scrolled",4,"ngIf"],["infiniteScroll","",1,"search-results","mt-2",3,"infiniteScrollDistance","infiniteScrollThrottle","scrollWindow","scrolled"],[3,"formGroup"],["class","row my-2 p-2 border-bottom",4,"ngFor","ngForOf"],[1,"row","my-2","p-2","border-bottom"],[1,"col-2","center"],["type","radio","formControlName","store_id",1,"form-control","form-control-user",3,"value","id","change"],[1,"col-10","center"],[1,"form-span","mx-2",3,"htmlFor"],[1,"fas","fa-warehouse"],[1,"fas","fa-user-tie"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h6",2),e._uU(3,"Search Store"),e.qZA()(),e.TgZ(4,"div",3)(5,"form",4),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(6,"div",5),e._UZ(7,"input",6),e.TgZ(8,"div",7)(9,"button",8),e._UZ(10,"i",9),e.qZA()()()(),e.YNc(11,Ut,3,5,"div",10),e.qZA()()),2&t&&(e.xp6(5),e.Q6J("formGroup",o.fg_search),e.xp6(6),e.Q6J("ngIf",o.stores.length))},dependencies:[v.sg,v.O5,l._Y,l.Fj,l._,l.JJ,l.JL,l.sg,l.u,M]}),r})();const xt=function(){return["/order/customer"]};let R=(()=>{class r{constructor(){}ngOnInit(){}ngAfterViewInit(){return(0,m.Z)(function*(){})()}onUpdateAddressId(t){this.address_id=t}onUpdateStoreId(t){this.store=t}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-customer"]],decls:11,vars:4,consts:[[1,"d-sm-flex","align-items-center","justify-content-between","mb-4"],[1,"h3","mb-0","text-gray-800"],["type","button",1,"btn","btn-primary",3,"routerLink"],[1,"fas","fa-arrow-circle-left"],[1,"row"],[1,"col-lg-6"],[3,"address_id","store"],[3,"evt_updateStoreId"],[3,"evt_updateAddressId"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"h1",1)(2,"a",2),e._UZ(3,"i",3),e.qZA(),e._uU(4,"\xa0\xa0Customer & rentals"),e.qZA()(),e.TgZ(5,"div",4)(6,"div",5),e._UZ(7,"app-customer-info",6),e.qZA(),e.TgZ(8,"div",5)(9,"app-search-store",7),e.NdJ("evt_updateStoreId",function(s){return o.onUpdateStoreId(s)}),e.qZA(),e.TgZ(10,"app-customer-search-address",8),e.NdJ("evt_updateAddressId",function(s){return o.onUpdateAddressId(s)}),e.qZA()()()),2&t&&(e.xp6(2),e.Q6J("routerLink",e.DdM(3,xt)),e.xp6(5),e.Q6J("address_id",o.address_id)("store",o.store))},dependencies:[_.yS,Le,bt,Nt]}),r})();const qt=[{path:"",component:L,children:[{path:"customer",component:te},{path:"customer/:customer_id",component:R},{path:"customer/create",component:R}]}];let Dt=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[v.ez,_.Bz.forChild(qt)]}),r})();var Jt=c(4805);let Ot=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[v.ez,_.Bz,Dt,l.UX,Jt.x,Ke]}),r})()}}]);