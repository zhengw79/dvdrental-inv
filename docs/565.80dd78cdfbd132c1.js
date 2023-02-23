"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[565],{4565:(se,p,a)=>{a.r(p),a.d(p,{AuthModule:()=>ne});var m=a(6895),l=a(919),n=a(433),u=a(4854),e=a(8256),c=a(529);function g(t,o){1&t&&(e.TgZ(0,"div",19),e._uU(1,"Email is required"),e.qZA())}function f(t,o){1&t&&(e.TgZ(0,"div",19),e._uU(1,"Please enter a valid email address."),e.qZA())}function _(t,o){1&t&&(e.TgZ(0,"div",19),e._uU(1,"Sorry, we cannot find this email in our system."),e.qZA())}const v=function(t){return[t]};function h(t,o){if(1&t&&(e.TgZ(0,"div",19),e._uU(1,"Please click "),e.TgZ(2,"a",20),e._uU(3,"here"),e.qZA(),e._uU(4," to verify your email."),e.qZA()),2&t){const i=e.oxw(2);e.xp6(2),e.Q6J("routerLink",e.VKq(1,v,i.verified_url))}}function Z(t,o){1&t&&(e.TgZ(0,"div",19),e._uU(1,"Sorry, your credential doesn't match."),e.qZA())}function w(t,o){1&t&&(e.TgZ(0,"div",19),e._uU(1,"Sorry, too many tries. Please wait for 1 minutes and try it again."),e.qZA())}function T(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,g,2,0,"div",18),e.YNc(2,f,2,0,"div",18),e.YNc(3,_,2,0,"div",18),e.YNc(4,h,5,3,"div",18),e.YNc(5,Z,2,0,"div",18),e.YNc(6,w,2,0,"div",18),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.required),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.email),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.not_found),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.email_unverified),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.credential_invalid),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.too_many_tries)}}function y(t,o){1&t&&(e.TgZ(0,"div",19),e._uU(1,"Password is required."),e.qZA())}function b(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,y,2,0,"div",18),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.password.errors?null:i.password.errors.required)}}const A=function(){return["/"]},C=function(){return["/auth/register"]};let q=(()=>{class t{constructor(i,r){this.httpClient=i,this._router=r,this.loginFormModel=new n.cw({email:new n.NI("wuwlacoj@veldit.il",[n.kI.required,n.kI.email]),password:new n.NI("12345678",[n.kI.required]),remember_me:new n.NI("")}),this.$=window.jQuery}ngOnInit(){}get email(){return this.loginFormModel.get("email")}get password(){return this.loginFormModel.get("password")}onSubmit(){this.loginFormModel.invalid?this.loginFormModel.markAllAsTouched():(this.$("#loginForm").block({message:null,css:u.Q}),this.httpClient.post("api/auth/login",this.loginFormModel.value).subscribe({next:i=>{localStorage.setItem("access_token",i.access_token),localStorage.setItem("remember_token",i.remember_token),this._router.navigate(["/inventory"])},error:i=>{const{error:{response:{statusCode:r,message:s}}}=i;if(401===r)if(/email_unverified;\d+/.test(s)){const d=s.split(";");this.verified_url=`/verify-email/${d[1]}`,this.email?.setErrors({email_unverified:!0})}else this.email.setErrors("credential_invalid"===s?{credential_invalid:!0}:{not_found:!0});else 429===r&&this.email.setErrors({too_many_tries:!0});this.$("#loginForm").unblock()},complete:()=>{this.$("#loginForm").unblock()}}))}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(c.eN),e.Y36(l.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],decls:31,vars:7,consts:[[1,"card-body","p-0"],[1,"row"],[1,"col-lg-6","d-none","d-lg-block","bg-login-image"],["id","loginForm",1,"col-lg-6"],[1,"p-5"],[1,"text-center"],[1,"h4","text-gray-900","mb-4"],[1,"user",3,"formGroup","ngSubmit"],[1,"form-group"],["type","email","aria-describedby","emailHelp","placeholder","Enter Email Address...","formControlName","email",1,"form-control","form-control-user"],[4,"ngIf"],["type","password","id","password","placeholder","Password","formControlName","password",1,"form-control","form-control-user"],["type","submit",1,"btn","btn-primary","btn-user","btn-block"],[1,"btn","btn-google","btn-user","btn-block"],[1,"fab","fa-google","fa-fw"],[1,"btn","btn-facebook","btn-user","btn-block"],[1,"fab","fa-facebook-f","fa-fw"],[1,"small",3,"routerLink"],["class","help-error",4,"ngIf"],[1,"help-error"],[3,"routerLink"]],template:function(i,r){1&i&&(e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"div",2),e.TgZ(3,"div",3)(4,"div",4)(5,"div",5)(6,"h1",6),e._uU(7,"Welcome Back!"),e.qZA()(),e.TgZ(8,"form",7),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(9,"div",8),e._UZ(10,"input",9),e.YNc(11,T,7,6,"div",10),e.qZA(),e.TgZ(12,"div",8),e._UZ(13,"input",11),e.YNc(14,b,2,1,"div",10),e.qZA(),e.TgZ(15,"button",12),e._uU(16,"Login"),e.qZA(),e._UZ(17,"hr"),e.TgZ(18,"a",13),e._UZ(19,"i",14),e._uU(20,"\xa0Login with Google"),e.qZA(),e.TgZ(21,"a",15),e._UZ(22,"i",16),e._uU(23,"\xa0Login with Facebook"),e.qZA()(),e._UZ(24,"hr"),e.TgZ(25,"div",5)(26,"a",17),e._uU(27,"Forgot Password?"),e.qZA()(),e.TgZ(28,"div",5)(29,"a",17),e._uU(30,"Create an Account!"),e.qZA()()()()()()),2&i&&(e.xp6(8),e.Q6J("formGroup",r.loginFormModel),e.xp6(3),e.Q6J("ngIf",r.email&&r.email.invalid&&(r.email.dirty||r.email.touched)),e.xp6(3),e.Q6J("ngIf",r.password&&r.password.invalid&&(r.password.dirty||r.password.touched)),e.xp6(12),e.Q6J("routerLink",e.DdM(5,A)),e.xp6(3),e.Q6J("routerLink",e.DdM(6,C)))},dependencies:[m.O5,l.yS,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u]}),t})();const I=["child"];let k=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["AuthLayout"]],contentQueries:function(i,r,s){if(1&i&&e.Suo(s,I,5),2&i){let d;e.iGM(d=e.CRH())&&(r.child=d.first)}},decls:6,vars:1,consts:[[1,"bg-gradient-primary"],[1,"container"],[1,"row","justify-content-center"],[1,"col-xl-10","col-lg-12","col-md-9"],[1,"card","o-hidden","border-0","shadow-lg","my-5"],[3,"ngTemplateOutlet"]],template:function(i,r){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),e.GkF(5,5),e.qZA()()()()()),2&i&&(e.xp6(5),e.Q6J("ngTemplateOutlet",r.child))},dependencies:[m.tP]}),t})();function x(t,o){1&t&&e._UZ(0,"router-outlet")}function N(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1," Please enter first name. "),e.qZA())}function J(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,N,2,0,"div",26),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.first_name.errors?null:i.first_name.errors.required)}}function F(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1," Please enter last name. "),e.qZA())}function Q(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,F,2,0,"div",26),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.last_name.errors?null:i.last_name.errors.required)}}function L(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1,"Please enter user name."),e.qZA())}function M(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1,"User name length must be less than 16."),e.qZA())}function Y(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,L,2,0,"div",26),e.YNc(2,M,2,0,"div",26),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.username.errors?null:i.username.errors.required),e.xp6(1),e.Q6J("ngIf",null==i.username.errors?null:i.username.errors.maxlength)}}function R(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1," Please enter an email. "),e.qZA())}function S(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1," Please enter a valid email address. "),e.qZA())}function E(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1," Sorry, this email has already been used. "),e.qZA())}function P(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,R,2,0,"div",26),e.YNc(2,S,2,0,"div",26),e.YNc(3,E,2,0,"div",26),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.required),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.email),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.DUP_EMAIL)}}function V(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1,"Password is required."),e.qZA())}function $(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1,"Min length of password is 8."),e.qZA())}function j(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,V,2,0,"div",26),e.YNc(2,$,2,0,"div",26),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.password.errors?null:i.password.errors.required),e.xp6(1),e.Q6J("ngIf",null==i.password.errors?null:i.password.errors.minlength)}}function O(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1,"Please repeat your password."),e.qZA())}function G(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,O,2,0,"div",26),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",(null==i.password2.errors?null:i.password2.errors.required)||(null==i.password2.errors?null:i.password2.errors.mismatch))}}const D=function(){return["/"]},X=function(){return["/auth/login"]},B=["class","email"];function H(t,o){1&t&&(e.TgZ(0,"div",14),e._uU(1,"Please enter your email."),e.qZA())}function W(t,o){1&t&&(e.TgZ(0,"div",14),e._uU(1,"Sorry, we cannot find this email. "),e.qZA())}function K(t,o){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,H,2,0,"div",13),e.YNc(2,W,2,0,"div",13),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.required),e.xp6(1),e.Q6J("ngIf",null==i.email.errors?null:i.email.errors.invalid_email)}}function ee(t,o){1&t&&(e.TgZ(0,"div",15),e._uU(1," We have sent verification email, please check your email box. "),e.qZA())}const te=function(){return["/auth/register"]},ie=function(){return["/auth/login"]},re=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-auth"]],decls:3,vars:0,consts:[["child",""]],template:function(i,r){1&i&&(e.TgZ(0,"AuthLayout"),e.YNc(1,x,1,0,"ng-template",null,0,e.W1O),e.qZA())},dependencies:[l.lC,k]}),t})(),children:[{path:"login",component:q},{path:"register",component:(()=>{class t{constructor(i,r){this.httpClient=i,this._router=r,this.registerFormModel=new n.cw({first_name:new n.NI("",[n.kI.required]),last_name:new n.NI("",[n.kI.required]),email:new n.NI("",[n.kI.required,n.kI.email]),username:new n.NI("",[n.kI.required,n.kI.maxLength(16)]),password:new n.NI("",[n.kI.required,n.kI.minLength(8)]),password2:new n.NI("",[n.kI.required])}),this.$=window.jQuery}ngOnInit(){}get first_name(){return this.registerFormModel.get("first_name")}get last_name(){return this.registerFormModel.get("last_name")}get email(){return this.registerFormModel.get("email")}get username(){return this.registerFormModel.get("username")}get password(){return this.registerFormModel.get("password")}get password2(){return this.registerFormModel.get("password2")}onPasswordChange(){this.password&&this.password2&&this.password2.value===this.password.value?this.password2.setErrors(null):this.password2&&this.password2.setErrors({mismatch:!0})}onSubmit(){this.registerFormModel.invalid?this.registerFormModel.markAllAsTouched():(this.$("#regForm").block({message:null,css:u.Q}),this.httpClient.post("api/auth/register",this.registerFormModel.value).subscribe(r=>{r.access_token?(localStorage.setItem("access_token",r.access_token),this._router.navigate(["/main"])):"failed"===r.status&&"staff_email_unique"===r.code&&this.email?.setErrors({DUP_EMAIL:!0})},null,()=>{this.$("#regForm").unblock()}))}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(c.eN),e.Y36(l.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-register"]],decls:46,vars:11,consts:[[1,"card-body","p-0"],[1,"row"],[1,"col-lg-5","d-none","d-lg-block","bg-register-image"],["id","regForm",1,"col-lg-7"],[1,"p-5"],[1,"text-center"],[1,"h4","text-gray-900","mb-4"],[1,"user",3,"formGroup","ngSubmit"],[1,"form-group","row"],[1,"col-sm-6","mb-3","mb-sm-0"],["type","text","placeholder","First Name","formControlName","first_name",1,"form-control","form-control-user"],[4,"ngIf"],[1,"col-sm-6"],["type","text","placeholder","Last Name","formControlName","last_name",1,"form-control","form-control-user"],[1,"col-sm-12"],["type","text","placeholder","User name","formControlName","username",1,"form-control","form-control-user"],[1,"form-group"],["type","email","id","email","placeholder","Email Address","formControlName","email",1,"form-control","form-control-user"],["type","password","placeholder","Password","name","password","formControlName","password",1,"form-control","form-control-user",3,"input"],["type","password","placeholder","Repeat Password","name","password2","formControlName","password2",1,"form-control","form-control-user",3,"input"],["type","submit",1,"btn","btn-primary","btn-user","btn-block"],["href","#",1,"btn","btn-google","btn-user","btn-block"],[1,"fab","fa-google","fa-fw"],["href","#",1,"btn","btn-facebook","btn-user","btn-block"],[1,"fab","fa-facebook-f","fa-fw"],[1,"small",3,"routerLink"],["class","help-error",4,"ngIf"],[1,"help-error"]],template:function(i,r){1&i&&(e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"div",2),e.TgZ(3,"div",3)(4,"div",4)(5,"div",5)(6,"h1",6),e._uU(7,"Create an Account!"),e.qZA()(),e.TgZ(8,"form",7),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(9,"div",8)(10,"div",9),e._UZ(11,"input",10),e.YNc(12,J,2,1,"div",11),e.qZA(),e.TgZ(13,"div",12),e._UZ(14,"input",13),e.YNc(15,Q,2,1,"div",11),e.qZA()(),e.TgZ(16,"div",8)(17,"div",14),e._UZ(18,"input",15),e.YNc(19,Y,3,2,"div",11),e.qZA()(),e.TgZ(20,"div",16),e._UZ(21,"input",17),e.YNc(22,P,4,3,"div",11),e.qZA(),e.TgZ(23,"div",8)(24,"div",9)(25,"input",18),e.NdJ("input",function(){return r.onPasswordChange()}),e.qZA(),e.YNc(26,j,3,2,"div",11),e.qZA(),e.TgZ(27,"div",12)(28,"input",19),e.NdJ("input",function(){return r.onPasswordChange()}),e.qZA(),e.YNc(29,G,2,1,"div",11),e.qZA()(),e.TgZ(30,"button",20),e._uU(31," Register Account "),e.qZA(),e._UZ(32,"hr"),e.TgZ(33,"a",21),e._UZ(34,"i",22),e._uU(35," Register with Google "),e.qZA(),e.TgZ(36,"a",23),e._UZ(37,"i",24),e._uU(38,"Register with Facebook"),e.qZA()(),e._UZ(39,"hr"),e.TgZ(40,"div",5)(41,"a",25),e._uU(42,"Forgot Password?"),e.qZA()(),e.TgZ(43,"div",5)(44,"a",25),e._uU(45,"Already have an account? Login!"),e.qZA()()()()()()),2&i&&(e.xp6(8),e.Q6J("formGroup",r.registerFormModel),e.xp6(4),e.Q6J("ngIf",r.first_name&&r.first_name.invalid&&(r.first_name.dirty||r.first_name.touched)),e.xp6(3),e.Q6J("ngIf",r.last_name&&r.last_name.invalid&&(r.last_name.dirty||r.last_name.touched)),e.xp6(4),e.Q6J("ngIf",r.username&&r.username.invalid&&(r.username.dirty||r.username.touched)),e.xp6(3),e.Q6J("ngIf",r.email&&r.email.invalid&&(r.email.dirty||r.email.touched)),e.xp6(4),e.Q6J("ngIf",r.password&&r.password.invalid&&(r.password.dirty||r.password.touched)),e.xp6(3),e.Q6J("ngIf",r.password2&&r.password2.invalid&&(r.password2.dirty||r.password2.touched)),e.xp6(12),e.Q6J("routerLink",e.DdM(9,D)),e.xp6(3),e.Q6J("routerLink",e.DdM(10,X)))},dependencies:[m.O5,l.yS,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u]}),t})()},{path:"verify-email/:id",component:(()=>{class t{constructor(i,r,s){this.httpClient=i,this.route=r,this._router=s,this.staff_id=+r.snapshot.paramMap.get("id"),this.email_sent=!1,this.invalid_staff=!1,this.formModel=new n.cw({email:new n.NI("",[n.kI.required,n.kI.email])}),this.$=window.jQuery}ngOnInit(){}ngAfterViewInit(){this.$("#emailForm").block({message:null,css:u.Q}),this.httpClient.get(`api/auth/staff/${this.staff_id}`).subscribe(i=>{if(i){const{email:r,email_verified_at:s}=i;s?this._router.navigate(["/auth/login"]):this.email?.setValue(r)}else this.email?.setValue("")},()=>{},()=>{this.$("#emailForm").unblock()})}get email(){return this.formModel.get("email")}onSubmit(){this.formModel.invalid?this.formModel.markAllAsTouched():(this.$("#emailForm").block({message:null,css:u.Q}),this.httpClient.post("api/auth/verify",this.formModel.value).subscribe(i=>{const{status:r,code:s}=i;"ok"===r&&"verified"===s?this._router.navigate(["/auth/login"]):"ok"===r&&"email_sent"===s?this.email_sent=!0:"failed"===r&&"invalid_email"===s&&this.email?.setErrors({invalid_email:!0})},i=>{},()=>{this.$("#emailForm").unblock()}))}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(c.eN),e.Y36(l.gz),e.Y36(l.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-verify",8,"email"]],attrs:B,decls:23,vars:7,consts:[[1,"row"],[1,"col-lg-6","d-none","d-lg-block","bg-password-image"],["id","emailForm",1,"col-lg-6"],[1,"p-5"],[1,"text-center"],[1,"h4","text-gray-900","mb-2"],[1,"user",3,"formGroup","ngSubmit"],[1,"form-group"],["aria-describedby","emailHelp","formControlName","email","placeholder","Enter email address ...","type","email",1,"form-control","form-control-user"],[4,"ngIf"],["class","help-txt small p-2",4,"ngIf"],["type","submit",1,"btn","btn-primary","btn-user","btn-block"],[1,"small",3,"routerLink"],["class","help-error",4,"ngIf"],[1,"help-error"],[1,"help-txt","small","p-2"]],template:function(i,r){1&i&&(e.TgZ(0,"div",0),e._UZ(1,"div",1),e.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1",5),e._uU(6," Please verify your email "),e.qZA(),e.TgZ(7,"p"),e._uU(8," Thanks for registration, we have sent a verified email. If you didn't receive it, just enter your email address and we'll send you a link to verify your email. "),e.qZA(),e.TgZ(9,"form",6),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(10,"div",7),e._UZ(11,"input",8),e.YNc(12,K,3,2,"div",9),e.YNc(13,ee,2,0,"div",10),e.qZA(),e.TgZ(14,"button",11),e._uU(15,"Resent verify email"),e.qZA()(),e._UZ(16,"hr"),e.TgZ(17,"div",4)(18,"a",12),e._uU(19,"Create an Account!"),e.qZA()(),e.TgZ(20,"div",4)(21,"a",12),e._uU(22,"Already have an account? Login!"),e.qZA()()()()()()),2&i&&(e.xp6(9),e.Q6J("formGroup",r.formModel),e.xp6(3),e.Q6J("ngIf",r.email&&r.email.invalid&&(r.email.dirty||r.email.touched)),e.xp6(1),e.Q6J("ngIf",r.email_sent),e.xp6(5),e.Q6J("routerLink",e.DdM(5,te)),e.xp6(3),e.Q6J("routerLink",e.DdM(6,ie)))},dependencies:[m.O5,l.yS,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u]}),t})()}]}];let oe=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[m.ez,l.Bz.forChild(re)]}),t})(),ne=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[oe,m.ez,l.Bz,n.UX]}),t})()}}]);