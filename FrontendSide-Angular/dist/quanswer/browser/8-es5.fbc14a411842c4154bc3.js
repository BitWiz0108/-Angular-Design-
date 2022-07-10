!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function n(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var o=r(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(arguments.length<3?e:n):i.value}}).apply(this,arguments)}function r(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=c(e)););return e}function i(e,t){return(i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,o=c(e);if(t){var r=c(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return a(this,n)}}function a(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{LceX:function(t,r,a){"use strict";a.r(r),a.d(r,"AuthModule",function(){return Oe});var l,d,u=a("ofXK"),p=a("3Pt+"),g=a("tk/3"),f=a("tyNb"),h=a("fXoL"),m=a("nSnJ"),b=a("0np6"),y=a("z0FN"),w=((l=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&i(e,t)}(a,t);var r=s(a);function a(t){var n;return e(this,a),(n=r.call(this,t)).http=t,n.prefix="auth",n.suffix="",n}return n(a,[{key:"login",value:function(e){return o(c(a.prototype),"postService",this).call(this,"/login",e)}},{key:"register",value:function(e){return o(c(a.prototype),"postService",this).call(this,"/signup",e)}},{key:"changePassword",value:function(e){return o(c(a.prototype),"putService",this).call(this,"/change-password",e)}},{key:"getEmailAddressByCode",value:function(e){return o(c(a.prototype),"getService",this).call(this,"/get-verification-details-by-code",{code:e})}},{key:"sendEmail",value:function(e,t){return o(c(a.prototype),"getService",this).call(this,"/send-email",{email:e,codeType:t})}}]),a}(y.a)).\u0275fac=function(e){return new(e||l)(h.ec(g.b))},l.\u0275prov=h.Qb({token:l,factory:l.\u0275fac,providedIn:"root"}),l),v=a("VO+5"),C=((d=n(function t(){e(this,t),this.codeType=new h.q})).\u0275fac=function(e){return new(e||d)},d.\u0275prov=h.Qb({token:d,factory:d.\u0275fac,providedIn:"root"}),d);function P(e,t){1&e&&(h.ac(0,"h2",18),h.Ic(1,"Sign up"),h.Zb())}function M(e,t){1&e&&(h.ac(0,"h2",18),h.Ic(1,"Forget password"),h.Zb())}function O(e,t){1&e&&(h.ac(0,"small",19),h.Ic(1," Dear user, we sent you a confirmation email, check user email address. "),h.Zb())}function x(e,t){1&e&&(h.ac(0,"small",20),h.Ic(1,"Please enter your email address."),h.Zb())}function k(e,t){1&e&&(h.ac(0,"small",20),h.Ic(1," Please enter the email in the right pattern. "),h.Zb())}function I(e,t){1&e&&h.Vb(0,"i",21)}function _(e,t){if(1&e){var n=h.bc();h.ac(0,"p",22),h.Ic(1," By clicking \u201cSend verification email\u201d, you agree to our "),h.Vb(2,"br"),h.ac(3,"a",23),h.hc("click",function(){return h.Bc(n),h.kc().openModal("privacy-policy-modal")}),h.Ic(4," privacy policy"),h.Zb(),h.Zb()}}var E,S=function(e,t){return{"is-valid":e,"is-invalid":t}},Z=function(){return["/auth/signIn"]},U=((E=function(){function t(n,o,r,i,s,a){e(this,t),this.router=n,this.fb=o,this.authService=r,this.notifierService=i,this.activatedRoute=s,this.codeTypeDataService=a,this.loading=!1,this.signUpClicked=!1,this.showSuccessMessage=!1,this.codeType=N.SIGNUP,this.codeTypeEnum=N,localStorage.clear(),this.emailForm=this.fb.group({email:new p.d(null,[p.o.required,p.o.pattern(m.a.email)])})}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.codeTypeEnum=this.activatedRoute.snapshot.queryParams.codeType,this.codeTypeDataService.codeType.subscribe(function(t){e.codeType=t})}},{key:"sendEmail",value:function(){var e=this;this.loading=!0,this.authService.sendEmail(this.email,this.codeType).subscribe(function(t){console.log(t),e.loading=!1,t?e.showSuccessMessage=!0:e.notifierService.notify("error","Something went wrong, Please try again.")},function(t){e.loading=!1})}},{key:"openModal",value:function(e){$("#"+e).modal("show")}}]),t}()).\u0275fac=function(e){return new(e||E)(h.Ub(f.b),h.Ub(p.c),h.Ub(w),h.Ub(v.c),h.Ub(f.a),h.Ub(C))},E.\u0275cmp=h.Ob({type:E,selectors:[["app-sign-up"]],decls:25,vars:17,consts:[[1,"my-container"],[1,"row"],[1,"column","box-border"],["class","text-center font-weight-bold mt-3 mb-5",4,"ngIf"],["class","form-text text-center text-success",4,"ngIf"],[3,"formGroup"],[1,"form-group"],["for","username",1,"control-label"],[1,"input-group"],[1,"fa-2x","fa","fa-user","input-group-addon"],["type","email","id","email","name","email","aria-describedby","emailHelp","placeholder","Enter your email address","formControlName","email",1,"form-control",3,"disabled","ngModel","ngClass","ngModelChange","change"],["class","form-text text-muted",4,"ngIf"],[1,"loginBtn","mt-3"],["type","button",1,"btn","btn-success","w-100",3,"disabled","click"],["class","fa fa-spin fa-spinner btn-loading-bar",4,"ngIf"],[1,"mt-2","text-center"],["type","button",1,"text-center","color-primary","font-weight-bold",3,"routerLink"],["class","text-muted mt-5 text-center",4,"ngIf"],[1,"text-center","font-weight-bold","mt-3","mb-5"],[1,"form-text","text-center","text-success"],[1,"form-text","text-muted"],[1,"fa","fa-spin","fa-spinner","btn-loading-bar"],[1,"text-muted","mt-5","text-center"],[1,"font-weight-bold","color-primary",3,"click"]],template:function(e,t){1&e&&(h.ac(0,"div",0),h.ac(1,"div",1),h.ac(2,"div",2),h.Gc(3,P,2,0,"h2",3),h.Gc(4,M,2,0,"h2",3),h.Gc(5,O,2,0,"small",4),h.ac(6,"form",5),h.ac(7,"div",6),h.ac(8,"label",7),h.Ic(9," Email "),h.Zb(),h.ac(10,"div",8),h.Vb(11,"i",9),h.ac(12,"input",10),h.hc("ngModelChange",function(e){return t.email=e})("change",function(){return t.showSuccessMessage=!1}),h.Zb(),h.Zb(),h.Gc(13,x,2,0,"small",11),h.Gc(14,k,2,0,"small",11),h.Zb(),h.Zb(),h.ac(15,"div",12),h.ac(16,"button",13),h.hc("click",function(){return t.sendEmail()}),h.Yb(17),h.Ic(18,"Send verification email"),h.Xb(),h.Gc(19,I,1,0,"i",14),h.Zb(),h.Zb(),h.ac(20,"div",15),h.Ic(21," Or "),h.ac(22,"a",16),h.Ic(23," login"),h.Zb(),h.Zb(),h.Gc(24,_,5,0,"p",17),h.Zb(),h.Zb(),h.Zb()),2&e&&(h.Kb(3),h.rc("ngIf",t.codeType===t.codeTypeEnum.SIGNUP),h.Kb(1),h.rc("ngIf",t.codeType===t.codeTypeEnum.FORGET_PASSWORD),h.Kb(1),h.rc("ngIf",t.showSuccessMessage),h.Kb(1),h.rc("formGroup",t.emailForm),h.Kb(6),h.rc("disabled",t.showSuccessMessage)("ngModel",t.email)("ngClass",h.vc(13,S,t.emailForm.controls.email.valid&&t.emailForm.controls.email.touched,(t.signUpClicked||t.emailForm.controls.email.touched)&&t.emailForm.controls.email.invalid)),h.Kb(1),h.rc("ngIf",(t.signUpClicked||t.emailForm.controls.email.touched)&&t.emailForm.controls.email.hasError("required")),h.Kb(1),h.rc("ngIf",t.emailForm.controls.email.hasError("pattern")),h.Kb(2),h.rc("disabled",t.loading||t.showSuccessMessage),h.Kb(3),h.rc("ngIf",t.loading),h.Kb(3),h.rc("routerLink",h.tc(16,Z)),h.Kb(2),h.rc("ngIf",t.codeType===t.codeTypeEnum.SIGNUP))},directives:[u.l,p.p,p.k,p.f,p.b,p.j,p.e,u.j,f.d],styles:["",".carousel-item[_ngcontent-%COMP%]{background-color:#e8eaee}.my-container[_ngcontent-%COMP%]{min-height:100vh;padding-top:5vh;width:450px;top:150px;margin-right:auto;margin-left:auto}.my-container[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{margin:0!important}.box-border[_ngcontent-%COMP%]{border-radius:15px;padding:1.5rem;border:1px solid #e1e1e1;box-shadow:0 2px 7px #dfdfdf}.without-box-shadow[_ngcontent-%COMP%]{box-shadow:none}.form-group[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%] > select[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .2rem rgba(255,165,0,.25)}.authLogo[_ngcontent-%COMP%]{max-width:200px!important;border-radius:100%}.logo[_ngcontent-%COMP%]{text-align:center}.column[_ngcontent-%COMP%]{min-width:450px;background-color:#fff;border:1px solid #000;border-radius:15px}.loginBtn[_ngcontent-%COMP%]{text-align:center}.modal-dialog[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{background-color:hsla(0,0%,100%,0);border-radius:0;padding:0;border:0}.footer-links[_ngcontent-%COMP%]{display:flex;margin:auto;color:#fff;justify-content:space-between}.footer-links[_ngcontent-%COMP%]   .text-center[_ngcontent-%COMP%]{margin:5px 1px;font-size:1.01rem}input[_ngcontent-%COMP%]{border:0 solid;border-bottom:1px solid #000;transition:border .2s ease-in;background-color:#fff!important}input[_ngcontent-%COMP%]:hover{border:1px solid #000}.forget-password-btn[_ngcontent-%COMP%]{color:#000!important}a[_ngcontent-%COMP%], div[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], input[_ngcontent-%COMP%], label[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-family:Roboto!important}"]}),E),T=n(function t(){e(this,t)}),N=function(e){return e[e.SIGNUP="SIGNUP"]="SIGNUP",e[e.FORGET_PASSWORD="FORGET_PASSWORD"]="FORGET_PASSWORD",e}({});function G(e,t){1&e&&(h.ac(0,"small",24),h.Ic(1,"Username or password is incorrect."),h.Zb())}function F(e,t){1&e&&(h.ac(0,"small",25),h.Ic(1,"Please enter your email."),h.Zb())}function K(e,t){1&e&&(h.ac(0,"small",25),h.Ic(1,"Please enter your email in the right pattern."),h.Zb())}function A(e,t){1&e&&(h.ac(0,"small",25),h.Ic(1,"Please Enter your password"),h.Zb())}function D(e,t){1&e&&(h.ac(0,"small",25),h.Ic(1,"Please Enter your password in the right pattern."),h.Zb())}function R(e,t){1&e&&h.Vb(0,"i",26)}var B,L,j,q=function(e,t){return{"is-valid":e,"is-invalid":t}},V=function(){return["/auth/signUp"]},z=function(e){return{codeType:e}},H=((B=function(){function t(n,o,r,i,s){e(this,t),this.router=n,this.fb=o,this.codeTypeDataService=r,this.authService=i,this.notifierService=s,this.loading=!1,this.signInClicked=!1,this.wrongAccount=!1,this.codeType=N,localStorage.clear(),this.form=this.fb.group({username:new p.d(null,[p.o.required,p.o.pattern(m.a.email)]),password:new p.d(null,[p.o.required,p.o.pattern(m.a.password)])}),this.signInModel=new W,r.codeType.emit(N.SIGNUP)}return n(t,[{key:"ngOnInit",value:function(){}},{key:"signIn",value:function(){var e=this;this.form.invalid?this.notifierService.notify("error","Form is not completed"):(this.wrongAccount=!1,this.loading=!0,this.signInClicked=!0,this.authService.login(this.signInModel).subscribe(function(t){console.log(t),e.loading=!1,t&&t.accessToken?(b.a.setLocalStorageToken(t.accessToken),b.a.setUser(t.user),e.router.navigateByUrl("/question/list")):t&&t.errorCode>0&&(e.wrongAccount=!0)},function(t){e.wrongAccount=!0,e.loading=!1,console.log(t)}))}},{key:"changeType",value:function(e){this.codeTypeDataService.codeType.emit(e)}},{key:"openModal",value:function(e){$("#"+e).modal("show")}}]),t}()).\u0275fac=function(e){return new(e||B)(h.Ub(f.b),h.Ub(p.c),h.Ub(C),h.Ub(w),h.Ub(v.c))},B.\u0275cmp=h.Ob({type:B,selectors:[["app-sign-in"]],decls:40,vars:28,consts:[[1,"my-container"],[1,"row"],[1,"column"],[1,"box-border",3,"formGroup"],[1,"text-center","font-weight-bold","mt-3","mb-5"],["class","form-text text-center text-danger",4,"ngIf"],[1,"form-group"],["for","username",1,"control-label"],[1,"input-group"],[1,"fa-2x","fa","fa-user","input-group-addon"],["type","email","id","username","name","username","aria-describedby","emailHelp","placeholder","username(email)","formControlName","username",1,"form-control",3,"ngModel","ngClass","ngModelChange","keydown.enter"],["class","form-text text-muted",4,"ngIf"],["for","password",1,"control-label"],[1,"fa-2x","fa","fa-lock","input-group-addon"],["type","password","id","password","name","password","placeholder","password","formControlName","password",1,"form-control",3,"ngModel","ngClass","ngModelChange","keydown.enter"],[1,"d-flex","flex-row-reverse","justify-content-between"],["type","button",1,"form-text","text-center","text-info","forget-password-btn",3,"routerLink","queryParams"],[1,"loginBtn","mt-5"],["type","button",1,"btn","btn-success","w-100",3,"disabled","click"],["class","fa fa-spin fa-spinner btn-loading-bar",4,"ngIf"],[1,"mt-2","text-center"],["type","button",1,"text-center","color-primary","font-weight-bold",3,"routerLink","queryParams"],[1,"mt-5","text-center"],[1,"color-primary","font-weight-bold",3,"click"],[1,"form-text","text-center","text-danger"],[1,"form-text","text-muted"],[1,"fa","fa-spin","fa-spinner","btn-loading-bar"]],template:function(e,t){1&e&&(h.ac(0,"div",0),h.ac(1,"div",1),h.ac(2,"div",2),h.ac(3,"form",3),h.ac(4,"h2",4),h.Ic(5,"Login"),h.Zb(),h.Gc(6,G,2,0,"small",5),h.ac(7,"div",6),h.ac(8,"label",7),h.Ic(9," Username "),h.Zb(),h.ac(10,"div",8),h.Vb(11,"i",9),h.ac(12,"input",10),h.hc("ngModelChange",function(e){return t.signInModel.username=e})("keydown.enter",function(){return t.signIn()}),h.Zb(),h.Zb(),h.Gc(13,F,2,0,"small",11),h.Gc(14,K,2,0,"small",11),h.Zb(),h.ac(15,"div",6),h.ac(16,"label",12),h.Ic(17," Password "),h.Zb(),h.ac(18,"div",8),h.Vb(19,"i",13),h.ac(20,"input",14),h.hc("ngModelChange",function(e){return t.signInModel.password=e})("keydown.enter",function(){return t.signIn()}),h.Zb(),h.Zb(),h.ac(21,"div",15),h.ac(22,"div",1),h.ac(23,"a",16),h.Ic(24,"Forget password"),h.Zb(),h.Zb(),h.Gc(25,A,2,0,"small",11),h.Gc(26,D,2,0,"small",11),h.Zb(),h.Zb(),h.ac(27,"div",17),h.ac(28,"button",18),h.hc("click",function(){return t.signIn()}),h.Ic(29,"Login "),h.Gc(30,R,1,0,"i",19),h.Zb(),h.Zb(),h.ac(31,"div",20),h.Ic(32," Or "),h.ac(33,"a",21),h.Ic(34," Sign up"),h.Zb(),h.Zb(),h.ac(35,"div",22),h.Ic(36," by clicking on login you have accepted our "),h.Vb(37,"br"),h.ac(38,"a",23),h.hc("click",function(){return t.openModal("privacy-policy-modal")}),h.Ic(39," privacy policy "),h.Zb(),h.Zb(),h.Zb(),h.Zb(),h.Zb(),h.Zb()),2&e&&(h.Kb(3),h.rc("formGroup",t.form),h.Kb(3),h.rc("ngIf",t.wrongAccount),h.Kb(6),h.rc("ngModel",t.signInModel.username)("ngClass",h.vc(16,q,t.form.controls.username.valid&&t.form.controls.username.touched,(t.signInClicked||t.form.controls.username.touched)&&t.form.controls.username.invalid)),h.Kb(1),h.rc("ngIf",(t.signInClicked||t.form.controls.username.touched)&&t.form.controls.username.hasError("required")),h.Kb(1),h.rc("ngIf",(t.signInClicked||t.form.controls.username.touched)&&t.form.controls.username.hasError("pattern")),h.Kb(6),h.rc("ngModel",t.signInModel.password)("ngClass",h.vc(19,q,t.form.controls.password.valid&&t.form.controls.password.touched,(t.signInClicked||t.form.controls.password.touched)&&t.form.controls.password.invalid)),h.Kb(3),h.rc("routerLink",h.tc(22,V))("queryParams",h.uc(23,z,t.codeType.FORGET_PASSWORD)),h.Kb(2),h.rc("ngIf",(t.signInClicked||t.form.controls.password.touched)&&t.form.controls.password.hasError("required")),h.Kb(1),h.rc("ngIf",(t.signInClicked||t.form.controls.password.touched)&&t.form.controls.password.hasError("pattern")),h.Kb(2),h.rc("disabled",t.loading),h.Kb(2),h.rc("ngIf",t.loading),h.Kb(3),h.rc("routerLink",h.tc(25,V))("queryParams",h.uc(26,z,t.codeType.SIGNUP)))},directives:[p.p,p.k,p.f,u.l,p.b,p.j,p.e,u.j,f.d],styles:[".carousel-item[_ngcontent-%COMP%]{background-color:#e8eaee}.my-container[_ngcontent-%COMP%]{min-height:100vh;padding-top:5vh;width:450px;top:150px;margin-right:auto;margin-left:auto}.my-container[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{margin:0!important}.box-border[_ngcontent-%COMP%]{border-radius:15px;padding:1.5rem;border:1px solid #e1e1e1;box-shadow:0 2px 7px #dfdfdf}.without-box-shadow[_ngcontent-%COMP%]{box-shadow:none}.form-group[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%] > select[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .2rem rgba(255,165,0,.25)}.authLogo[_ngcontent-%COMP%]{max-width:200px!important;border-radius:100%}.logo[_ngcontent-%COMP%]{text-align:center}.column[_ngcontent-%COMP%]{min-width:450px;background-color:#fff;border:1px solid #000;border-radius:15px}.loginBtn[_ngcontent-%COMP%]{text-align:center}.modal-dialog[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{background-color:hsla(0,0%,100%,0);border-radius:0;padding:0;border:0}.footer-links[_ngcontent-%COMP%]{display:flex;margin:auto;color:#fff;justify-content:space-between}.footer-links[_ngcontent-%COMP%]   .text-center[_ngcontent-%COMP%]{margin:5px 1px;font-size:1.01rem}input[_ngcontent-%COMP%]{border:0 solid;border-bottom:1px solid #000;transition:border .2s ease-in;background-color:#fff!important}input[_ngcontent-%COMP%]:hover{border:1px solid #000}.forget-password-btn[_ngcontent-%COMP%]{color:#000!important}a[_ngcontent-%COMP%], div[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], input[_ngcontent-%COMP%], label[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-family:Roboto!important}"]}),B),W=n(function t(){e(this,t)}),J=((j=function(){function t(){e(this,t)}return n(t,[{key:"ngOnInit",value:function(){}}]),t}()).\u0275fac=function(e){return new(e||j)},j.\u0275cmp=h.Ob({type:j,selectors:[["app-auth"]],decls:6,vars:0,consts:[["id","carouselExampleIndicators","data-interval","false",1,"carousel","slide"],[1,"carousel-inner"],[1,"carousel-item","active"],[1,"carousel-item"]],template:function(e,t){1&e&&(h.ac(0,"div",0),h.ac(1,"div",1),h.ac(2,"div",2),h.Vb(3,"app-sign-in"),h.Zb(),h.ac(4,"div",3),h.Vb(5,"app-sign-up"),h.Zb(),h.Zb(),h.Zb())},directives:[H,U],styles:[".carousel-item[_ngcontent-%COMP%]{background-color:#e8eaee}"]}),j),X=((L=function(){function t(n,o){e(this,t),this.el=n,this.renderer=o,this.password="",this.showMessage=!1,this.color="#ff0000",this.message=" Bad "}return n(t,[{key:"ngOnInit",value:function(){this.showMessage&&(this.strengthElement=this.renderer.createElement("div"),this.renderer.addClass(this.strengthElement,"strength"),this.strengthBarElement=this.renderer.createElement("ul"),this.bar1Element=this.renderer.createElement("li"),this.bar2Element=this.renderer.createElement("li"),this.bar3Element=this.renderer.createElement("li"),this.bar4Element=this.renderer.createElement("li"),this.renderer.addClass(this.strengthBarElement,"strengthBar"),this.renderer.addClass(this.bar1Element,"point"),this.renderer.addClass(this.bar2Element,"point"),this.renderer.addClass(this.bar3Element,"point"),this.renderer.addClass(this.bar4Element,"point"),this.renderer.appendChild(this.strengthBarElement,this.bar1Element),this.renderer.appendChild(this.strengthBarElement,this.bar2Element),this.renderer.appendChild(this.strengthBarElement,this.bar3Element),this.renderer.appendChild(this.strengthBarElement,this.bar4Element),this.renderer.appendChild(this.strengthElement,this.strengthBarElement),this.messageElement=this.renderer.createElement("p"),this.renderer.appendChild(this.strengthElement,this.messageElement),this.el.nativeElement.after(this.strengthElement),this.renderer.setStyle(this.messageElement,"text-align","center"),this.renderer.setStyle(this.messageElement,"text-shadow","1px 1px 1px #000000")),this.passwordDifficulty(this.password)}},{key:"ngOnChanges",value:function(e){this.passwordDifficulty(e.password.currentValue)}},{key:"passwordDifficulty",value:function(e){if(this.showMessage&&(this.renderer.setStyle(this.bar1Element,"background","#DDD"),this.renderer.setStyle(this.bar2Element,"background","#DDD"),this.renderer.setStyle(this.bar3Element,"background","#DDD"),this.renderer.setStyle(this.bar4Element,"background","#DDD")),!e)return this.color="#ff0000",this.el.nativeElement.style.borderBottom="1px solid ".concat(this.color),void(this.showMessage&&(this.renderer.setStyle(this.messageElement,"color",this.color),this.renderer.setProperty(this.messageElement,"innerHTML","Password strength : Bad ")));var t=this.hasNumber(e)+this.hasLowercaseLetter(e)+this.hasUppercaseLetter(e)+this.hasSpecialCharacter(e);if(e.length<9)this.color="#ff0000",this.el.nativeElement.style.borderBottom="1px solid ".concat(this.color),this.showMessage&&(this.renderer.setStyle(this.messageElement,"color",this.color),this.renderer.setProperty(this.messageElement,"innerHTML","Password strength : Bad "));else{switch(t){case 4:this.showMessage&&(this.renderer.setStyle(this.bar1Element,"background","#0f0"),this.renderer.setStyle(this.bar2Element,"background","#0f0"),this.renderer.setStyle(this.bar3Element,"background","#0f0"),this.renderer.setStyle(this.bar4Element,"background","#0f0")),this.color="#00ff00",this.message=" Strict ";break;case 3:this.showMessage&&(this.renderer.setStyle(this.bar1Element,"background","#d4ff05"),this.renderer.setStyle(this.bar2Element,"background","#d4ff05"),this.renderer.setStyle(this.bar3Element,"background","#d4ff05")),this.color="#d4ff05",this.message=" Hard ";break;case 2:this.showMessage&&(this.renderer.setStyle(this.bar1Element,"background","#ffac00"),this.renderer.setStyle(this.bar2Element,"background","#ffac00")),this.color="#ffac00",this.message=" Normal ";break;case 1:this.showMessage&&this.renderer.setStyle(this.bar1Element,"background","#ff4700"),this.color="#ff4700",this.message=" poor ";break;default:this.color="#ff0000",this.message=" bad "}this.el.nativeElement.style.borderBottom="1px solid ".concat(this.color),this.showMessage&&(this.renderer.setStyle(this.messageElement,"color",this.color),this.renderer.setProperty(this.messageElement,"innerHTML","Password strength : ".concat(this.message)))}}},{key:"hasNumber",value:function(e){return/([0-9])+/.test(e)?1:0}},{key:"hasLowercaseLetter",value:function(e){return/([a-z])+/.test(e)?1:0}},{key:"hasUppercaseLetter",value:function(e){return/([A-Z])+/.test(e)?1:0}},{key:"hasSpecialCharacter",value:function(e){return/([!@#$%^&*()])+/.test(e)?1:0}}]),t}()).\u0275fac=function(e){return new(e||L)(h.Ub(h.o),h.Ub(h.L))},L.\u0275dir=h.Pb({type:L,selectors:[["","appPasswordStrength",""]],inputs:{password:"password",showMessage:"showMessage"},features:[h.Ib]}),L);function Q(e,t){1&e&&(h.ac(0,"h2",28),h.Ic(1,"Verification Sign up"),h.Zb())}function Y(e,t){1&e&&(h.ac(0,"h2",28),h.Ic(1,"Forget password"),h.Zb())}var ee=function(e,t){return{"is-valid":e,"is-invalid":t}};function te(e,t){if(1&e){var n=h.bc();h.ac(0,"input",29),h.hc("ngModelChange",function(e){return h.Bc(n),h.kc().signUp.displayName=e}),h.Zb()}if(2&e){var o=h.kc();h.rc("ngModel",o.signUp.displayName)("ngClass",h.vc(2,ee,o.signUpForm.controls.displayName.valid&&o.signUpForm.controls.displayName.touched,(o.signUpClicked||o.signUpForm.controls.displayName.touched)&&o.signUpForm.controls.displayName.invalid))}}function ne(e,t){if(1&e&&h.Vb(0,"input",30),2&e){var n=h.kc();h.rc("ngModel",n.signUp.displayName)}}function oe(e,t){1&e&&(h.ac(0,"small",31),h.Ic(1,'Display name must include at least 5 characters and can include only the following characters: letters, numbers,"_", "-", ".".'),h.Zb())}function re(e,t){1&e&&(h.ac(0,"small",31),h.Ic(1,"Password is required."),h.Zb())}function ie(e,t){1&e&&(h.ac(0,"small",31),h.Ic(1," Password must include at least 9 characters, including one capital letter, one small letter, one number and one special character. "),h.Zb())}function se(e,t){1&e&&(h.ac(0,"small",31),h.Ic(1,"Please Enter the repetition of the password"),h.Zb())}function ae(e,t){1&e&&(h.ac(0,"small",31),h.Ic(1," Please enter the repetition in the right pattern. "),h.Zb())}function ce(e,t){1&e&&(h.ac(0,"span"),h.Ic(1,"Sign up"),h.Zb())}function le(e,t){1&e&&h.Ic(0,"Change Password")}function de(e,t){1&e&&h.Vb(0,"i",32)}function ue(e,t){if(1&e){var n=h.bc();h.ac(0,"p",33),h.Ic(1," By clicking \u201cSign up\u201d, you agree to our "),h.Vb(2,"br"),h.ac(3,"a",34),h.hc("click",function(){return h.Bc(n),h.kc().openModal("privacy-policy-modal")}),h.Ic(4," privacy policy "),h.Zb(),h.Zb()}}var pe,ge,fe,he,me,be=function(){return{standalone:!0}},ye=function(){return["/auth/signIn"]},we=[{path:"",redirectTo:"signIn",pathMatch:"full"},{path:"signIn",component:J},{path:"signUp",component:U},{path:"verification",component:(pe=function(){function t(n,o,r,i,s){e(this,t),this.router=n,this.fb=o,this.authService=r,this.activatedRoute=i,this.notifierService=s,this.signUp=new T,this.loading=!1,this.signUpClicked=!1,this.codeType=N.SIGNUP,this.codeTypeEnum=N,localStorage.clear(),this.signUpForm=this.fb.group({displayName:new p.d(null,[p.o.required,p.o.pattern(m.a.displayName)]),password:new p.d(null,[p.o.required,p.o.pattern(m.a.password)]),repeatPassword:new p.d(null,[p.o.required,p.o.pattern(m.a.password)])})}return n(t,[{key:"ngOnInit",value:function(){this.signUp.code=this.activatedRoute.snapshot.queryParams.code,null!=this.signUp.code&&this.getEmailAddressByCode()}},{key:"getEmailAddressByCode",value:function(){var e=this;this.authService.getEmailAddressByCode(this.signUp.code).subscribe(function(t){console.log(t),t&&(e.signUp.email=t.email,e.codeType=t.codeType,t.codeType===e.codeTypeEnum.FORGET_PASSWORD&&(e.signUp.displayName=t.displayName))})}},{key:"signUpFunction",value:function(){var e=this;this.repeatPassword===this.signUp.password?(this.loading=!0,this.signUpClicked=!0,this.codeType===N.SIGNUP?this.authService.register(this.signUp).subscribe(function(t){console.log(t),e.loading=!1,t&&t.accessToken?($("#forgetPassword").modal("hide"),b.a.setLocalStorageToken(t.accessToken),b.a.setUser(t.user),e.router.navigateByUrl("/question/list")):t&&t.errorCode>0&&e.notifierService.notify("error","Something went wrong try again please.")},function(t){e.loading=!1,console.log(t),e.notifierService.notify("error",t.error.message)}):this.authService.changePassword(this.signUp).subscribe(function(t){console.log(t),e.loading=!1,t&&t.accessToken?($("#forgetPassword").modal("hide"),b.a.setLocalStorageToken(t.accessToken),b.a.setUser(t.user),e.router.navigateByUrl("/question/list")):t&&t.errorCode>0&&e.notifierService.notify("error","Something went wrong try again please.")},function(t){e.loading=!1,console.log(t),e.notifierService.notify("error",t.error.message)})):this.notifierService.notify("error","Password and confirm password is not equals.")}},{key:"openModal",value:function(e){$("#"+e).modal("show")}}]),t}(),pe.\u0275fac=function(e){return new(e||pe)(h.Ub(f.b),h.Ub(p.c),h.Ub(w),h.Ub(f.a),h.Ub(v.c))},pe.\u0275cmp=h.Ob({type:pe,selectors:[["app-verification-for-sign-up"]],decls:50,vars:33,consts:[["id","carouselExampleIndicators","data-interval","false",1,"carousel","slide"],[1,"carousel-inner"],[1,"carousel-item","active"],[1,"my-container"],[1,"row"],[1,"column","box-border"],["class","text-center font-weight-bold mt-3 mb-5",4,"ngIf"],[3,"formGroup"],[1,"form-group"],["for","username",1,"control-label"],[1,"input-group"],[1,"fa-2x","fa","fa-envelope","input-group-addon"],["type","email","id","email2","name","email","aria-describedby","emailHelp","placeholder","email","disabled","",1,"form-control",3,"ngModel","ngModelOptions"],[1,"fa-2x","fa","fa-user","input-group-addon"],["type","email","class","form-control","id","displayName","placeholder","displayName","formControlName","displayName","name","displayName",3,"ngModel","ngClass","ngModelChange",4,"ngIf"],["type","email","class","form-control","id","displayName","placeholder","Display name","disabled","","formControlName","displayName","name","displayName",3,"ngModel",4,"ngIf"],["class","form-text text-muted",4,"ngIf"],[1,"fa-2x","fa","fa-lock","input-group-addon"],["type","password","id","password","name","password","aria-describedby","emailHelp","placeholder","password","formControlName","password","appPasswordStrength","",1,"form-control",3,"ngModel","password","showMessage","ngClass","ngModelChange"],["type","password","id","repeatPassword","name","repeatPassword","aria-describedby","emailHelp","appPasswordStrength","","placeholder","Confirm password","formControlName","repeatPassword",1,"form-control",3,"password","ngModel","ngClass","ngModelChange"],[1,"loginBtn"],["type","button",1,"btn","btn-success","w-100",3,"disabled","click"],[4,"ngIf","ngIfElse"],["forgetPass",""],["class","fa fa-spin fa-spinner btn-loading-bar",4,"ngIf"],[1,"mt-2","text-center"],["type","button",1,"text-center","color-primary","font-weight-bold",3,"routerLink"],["class"," mt-3 text-center",4,"ngIf"],[1,"text-center","font-weight-bold","mt-3","mb-5"],["type","email","id","displayName","placeholder","displayName","formControlName","displayName","name","displayName",1,"form-control",3,"ngModel","ngClass","ngModelChange"],["type","email","id","displayName","placeholder","Display name","disabled","","formControlName","displayName","name","displayName",1,"form-control",3,"ngModel"],[1,"form-text","text-muted"],[1,"fa","fa-spin","fa-spinner","btn-loading-bar"],[1,"mt-3","text-center"],[1,"color-primary","font-weight-bold",3,"click"]],template:function(e,t){if(1&e&&(h.ac(0,"div",0),h.ac(1,"div",1),h.ac(2,"div",2),h.ac(3,"div",3),h.ac(4,"div",4),h.ac(5,"div",5),h.Gc(6,Q,2,0,"h2",6),h.Gc(7,Y,2,0,"h2",6),h.ac(8,"form",7),h.ac(9,"div",8),h.ac(10,"label",9),h.Ic(11," Email "),h.Zb(),h.ac(12,"div",10),h.Vb(13,"i",11),h.Vb(14,"input",12),h.Zb(),h.Zb(),h.ac(15,"div",8),h.ac(16,"label",9),h.Ic(17," Username "),h.Zb(),h.ac(18,"div",10),h.Vb(19,"i",13),h.Gc(20,te,1,5,"input",14),h.Gc(21,ne,1,1,"input",15),h.Zb(),h.Gc(22,oe,2,0,"small",16),h.Zb(),h.ac(23,"div",8),h.ac(24,"label",9),h.Ic(25," Password "),h.Zb(),h.ac(26,"div",10),h.Vb(27,"i",17),h.ac(28,"input",18),h.hc("ngModelChange",function(e){return t.signUp.password=e}),h.Zb(),h.Zb(),h.Gc(29,re,2,0,"small",16),h.Gc(30,ie,2,0,"small",16),h.Zb(),h.ac(31,"div",8),h.ac(32,"label",9),h.Ic(33," Confirm Password "),h.Zb(),h.ac(34,"div",10),h.Vb(35,"i",17),h.ac(36,"input",19),h.hc("ngModelChange",function(e){return t.repeatPassword=e}),h.Zb(),h.Zb(),h.Gc(37,se,2,0,"small",16),h.Gc(38,ae,2,0,"small",16),h.Zb(),h.Zb(),h.ac(39,"div",20),h.ac(40,"button",21),h.hc("click",function(){return t.signUpFunction()}),h.Gc(41,ce,2,0,"span",22),h.Gc(42,le,1,0,"ng-template",null,23,h.Hc),h.Gc(44,de,1,0,"i",24),h.Zb(),h.Zb(),h.ac(45,"div",25),h.Ic(46," Or "),h.ac(47,"a",26),h.Ic(48," login"),h.Zb(),h.Zb(),h.Gc(49,ue,5,0,"p",27),h.Zb(),h.Zb(),h.Zb(),h.Zb(),h.Zb(),h.Zb()),2&e){var n=h.zc(43);h.Kb(6),h.rc("ngIf",t.codeType===t.codeTypeEnum.SIGNUP),h.Kb(1),h.rc("ngIf",t.codeType===t.codeTypeEnum.FORGET_PASSWORD),h.Kb(1),h.rc("formGroup",t.signUpForm),h.Kb(6),h.rc("ngModel",t.signUp.email)("ngModelOptions",h.tc(25,be)),h.Kb(6),h.rc("ngIf",t.codeType!==t.codeTypeEnum.FORGET_PASSWORD),h.Kb(1),h.rc("ngIf",t.codeType===t.codeTypeEnum.FORGET_PASSWORD),h.Kb(1),h.rc("ngIf",(t.signUpClicked||t.signUpForm.controls.displayName.touched)&&t.signUpForm.controls.displayName.hasError("required")),h.Kb(6),h.rc("ngModel",t.signUp.password)("password",t.signUp.password)("showMessage",!0)("ngClass",h.vc(26,ee,t.signUpForm.controls.password.valid&&t.signUpForm.controls.password.touched,(t.signUpClicked||t.signUpForm.controls.password.touched)&&t.signUpForm.controls.password.invalid)),h.Kb(1),h.rc("ngIf",(t.signUpClicked||t.signUpForm.controls.password.touched)&&t.signUpForm.controls.password.hasError("required")),h.Kb(1),h.rc("ngIf",(t.signUpClicked||t.signUpForm.controls.password.touched)&&t.signUpForm.controls.password.hasError("pattern")),h.Kb(6),h.rc("password",t.repeatPassword)("ngModel",t.repeatPassword)("ngClass",h.vc(29,ee,t.signUpForm.controls.repeatPassword.valid&&t.signUpForm.controls.repeatPassword.touched,(t.signUpClicked||t.signUpForm.controls.repeatPassword.touched)&&t.signUpForm.controls.repeatPassword.invalid)),h.Kb(1),h.rc("ngIf",(t.signUpClicked||t.signUpForm.controls.repeatPassword.touched)&&t.signUpForm.controls.repeatPassword.hasError("required")),h.Kb(1),h.rc("ngIf",(t.signUpClicked||t.signUpForm.controls.repeatPassword.touched)&&t.signUpForm.controls.repeatPassword.hasError("pattern")),h.Kb(2),h.rc("disabled",t.loading),h.Kb(1),h.rc("ngIf",t.codeType===t.codeTypeEnum.SIGNUP)("ngIfElse",n),h.Kb(3),h.rc("ngIf",t.loading),h.Kb(3),h.rc("routerLink",h.tc(32,ye)),h.Kb(2),h.rc("ngIf",t.codeType===t.codeTypeEnum.SIGNUP)}},directives:[u.l,p.p,p.k,p.f,p.b,p.j,p.m,p.e,X,u.j,f.d],styles:[".strength[_ngcontent-%COMP%]{width:100%}",".carousel-item[_ngcontent-%COMP%]{background-color:#e8eaee}.my-container[_ngcontent-%COMP%]{min-height:100vh;padding-top:5vh;width:450px;top:150px;margin-right:auto;margin-left:auto}.my-container[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{margin:0!important}.box-border[_ngcontent-%COMP%]{border-radius:15px;padding:1.5rem;border:1px solid #e1e1e1;box-shadow:0 2px 7px #dfdfdf}.without-box-shadow[_ngcontent-%COMP%]{box-shadow:none}.form-group[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%] > select[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 .2rem rgba(255,165,0,.25)}.authLogo[_ngcontent-%COMP%]{max-width:200px!important;border-radius:100%}.logo[_ngcontent-%COMP%]{text-align:center}.column[_ngcontent-%COMP%]{min-width:450px;background-color:#fff;border:1px solid #000;border-radius:15px}.loginBtn[_ngcontent-%COMP%]{text-align:center}.modal-dialog[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{background-color:hsla(0,0%,100%,0);border-radius:0;padding:0;border:0}.footer-links[_ngcontent-%COMP%]{display:flex;margin:auto;color:#fff;justify-content:space-between}.footer-links[_ngcontent-%COMP%]   .text-center[_ngcontent-%COMP%]{margin:5px 1px;font-size:1.01rem}input[_ngcontent-%COMP%]{border:0 solid;border-bottom:1px solid #000;transition:border .2s ease-in;background-color:#fff!important}input[_ngcontent-%COMP%]:hover{border:1px solid #000}.forget-password-btn[_ngcontent-%COMP%]{color:#000!important}a[_ngcontent-%COMP%], div[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], input[_ngcontent-%COMP%], label[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-family:Roboto!important}"]}),pe)}],ve=((he=n(function t(){e(this,t)})).\u0275fac=function(e){return new(e||he)},he.\u0275mod=h.Sb({type:he}),he.\u0275inj=h.Rb({imports:[[f.e.forChild(we)],f.e]}),he),Ce=((fe=function(){function t(n){e(this,t),this.ngZone=n,this.fns=[],this.commands=[],this.ing=!1}return n(t,[{key:"start",value:function(){var e=this;!0!==this.ing&&(this.ing=!0,this.nextTime=+new Date,this.ngZone.runOutsideAngular(function(){e.process()}))}},{key:"process",value:function(){for(var e=this;this.commands.length;)this.commands.shift()();var t=+new Date-this.nextTime,n=1+Math.floor(t/100);t=100-t%100,this.nextTime+=100*n;for(var o=0,r=this.fns.length;o<r;o+=2){var i=this.fns[o+1];if(0===i)this.fns[o](n);else{i+=2*n-1;var s=Math.floor(i/20);s>0&&this.fns[o](s),this.fns[o+1]=i%20+1}}this.ing&&setTimeout(function(){return e.process()},t)}},{key:"add",value:function(e,t){var n=this;return this.commands.push(function(){n.fns.push(e),n.fns.push(1e3===t?1:0),n.ing=!0}),this}},{key:"remove",value:function(e){var t=this;return this.commands.push(function(){var n=t.fns.indexOf(e);-1!==n&&t.fns.splice(n,2),t.ing=t.fns.length>0}),this}}]),t}()).\u0275fac=function(e){return new(e||fe)(h.ec(h.F))},fe.\u0275prov=h.Qb({token:fe,factory:fe.\u0275fac}),fe),Pe=((ge=n(function t(){e(this,t)})).\u0275fac=function(e){return new(e||ge)},ge.\u0275mod=h.Sb({type:ge}),ge.\u0275inj=h.Rb({providers:[Ce],imports:[[u.b]]}),ge),Me=a("PCNd"),Oe=((me=n(function t(){e(this,t)})).\u0275fac=function(e){return new(e||me)},me.\u0275mod=h.Sb({type:me}),me.\u0275inj=h.Rb({imports:[[u.b,p.g,Pe,g.c,p.n,ve,Me.a]]}),me)},nSnJ:function(t,o,r){"use strict";r.d(o,"a",function(){return i});var i=function(){var t=n(function t(){e(this,t)});return t.email="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",t.link="https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",t.phone="(([0]+[9])([0-9]{9})||([\u06f0]+[\u06f9])([\u06f0-\u06f9]{9}))$",t.tell="(([0])([0-9]{10})||([\u06f0])([\u06f0-\u06f9]{10}))$",t.nationalCode="(([0-9]{10})||([\u06f0-\u06f9]{10}))$",t.faText="[\u0622\u0627-\u06cc ]+",t.date="^(([0-9]{1})([.,/]([0-9]{1,2})){0,1}|([\u06f0-\u06f9]{1})([.,/]([\u06f0-\u06f9]{1,2})){0,1})",t.streetName="[\u06f0-\u06f9-0-9\u0622-\u06cc ]+",t.bankCard="((([1-9])([0-9]{18})||([\u06f1-\u06f9])([\u06f0-\u06f9]{18}))||(([1-9])([0-9]{15})||([\u06f1-\u06f9])([\u06f0-\u06f9]{15})))$",t.shabaNumber="(([1-9])([0-9]{23})||([\u06f1-\u06f9])([\u06f0-\u06f9]{23}))",t.bcNumber="([1-9]{1}||[1-9]+[0-9]+||[\u06f1-\u06f9]{1}||[\u06f1-\u06f9]+[\u06f0-\u06f9]+)$",t.password="[-_/@!#$%^&*().A-Za-z0-9]{9,}",t.smartCode="[-_/@!#$%^&*().A-Za-z0-9\u06f0-\u06f9]+",t.userName="[_.A-Za-z0-9]+",t.number="^([0-9]*)$|^([\u06f0-\u06f9]*)$",t.EnNumber="^([0-9]*)$",t.faNumberAndText="[\u06f0-\u06f9]*|[\u0622-\u06cc ]*",t.postalCode="((([1-9]{1})([0-9]{9}))||(([\u06f1-\u06f9]{1})([\u06f0-\u06f9]{9})))$",t.DriverAndVehicleSmartCode="(([0-9]{7})||([\u06f0-\u06f9]{7}))$",t.nameAndFamily="([\u0622\u0627\u0626-\u06cc]+)+([\u0622\u0627\u0626-\u06cc ]+)+([\u0622\u0627\u0626-\u06cc])",t.enAndFaCharacter="[0-9\u06f0-\u06f9A-Za-z\u0622\u0627-\u06cc ]+",t.displayName="^([a-zA-Z0-9\\_\\-\\.]{5,})$",t}()}}])}();