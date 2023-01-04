"use strict";(self.webpackChunk_vendure_admin_ui=self.webpackChunk_vendure_admin_ui||[]).push([[90],{1090:function(e,t,n){n.r(t),n.d(t,{HealthCheckComponent:function(){return b},JobListComponent:function(){return X},JobStateLabelComponent:function(){return w},SystemModule:function(){return te},systemRoutes:function(){return ee}});var s=n(30464),r=n(15455),o=n(27346),c=n(54364),a=n(38276),i=n(65671),l=n(74447),u=n(70325),d=n(2651);function Z(e,t){1&e&&(s.ynx(0),s._uU(1),s.ALo(2,"translate"),s.BQk()),2&e&&(s.xp6(1),s.hij(" ",s.lcZ(2,1,"system.health-all-systems-up")," "))}function g(e,t){1&e&&(s._uU(0),s.ALo(1,"translate")),2&e&&s.hij(" ",s.lcZ(1,1,"system.health-error")," ")}const p=function(e,t){return{"is-success":e,"is-danger":t}};function h(e,t){if(1&e&&(s.TgZ(0,"div",7),s.TgZ(1,"div",8),s._UZ(2,"clr-icon",9),s.qZA(),s.TgZ(3,"div",10),s.YNc(4,Z,3,3,"ng-container",11),s.YNc(5,g,2,3,"ng-template",null,12,s.W1O),s.TgZ(7,"div",13),s._uU(8),s.ALo(9,"translate"),s.ALo(10,"localeDate"),s.ALo(11,"async"),s.qZA(),s.qZA(),s.qZA()),2&e){const e=t.ngIf,n=s.MAs(6),r=s.oxw();s.xp6(2),s.Q6J("ngClass",s.WLB(13,p,"ok"===e,"ok"!==e)),s.uIk("shape","ok"===e?"check-circle":"exclamation-circle"),s.xp6(2),s.Q6J("ngIf","ok"===e)("ngIfElse",n),s.xp6(4),s.AsE(" ",s.lcZ(9,6,"system.health-last-checked"),": ",s.xi3(10,8,s.lcZ(11,11,r.healthCheckService.lastCheck$),"mediumTime")," ")}}function m(e,t){1&e&&(s.ynx(0),s._UZ(1,"clr-icon",17),s._uU(2),s.ALo(3,"translate"),s.BQk()),2&e&&(s.xp6(2),s.hij(" ",s.lcZ(3,1,"system.health-status-up")," "))}function f(e,t){1&e&&(s._UZ(0,"clr-icon",18),s._uU(1),s.ALo(2,"translate")),2&e&&(s.xp6(1),s.hij(" ",s.lcZ(2,1,"system.health-status-down")," "))}function A(e,t){if(1&e&&(s.TgZ(0,"tr"),s.TgZ(1,"td",14),s._uU(2),s.qZA(),s.TgZ(3,"td",14),s.TgZ(4,"vdr-chip",15),s.YNc(5,m,4,3,"ng-container",11),s.YNc(6,f,3,3,"ng-template",null,16,s.W1O),s.qZA(),s.qZA(),s.TgZ(8,"td",14),s._uU(9),s.qZA(),s.qZA()),2&e){const e=t.$implicit,n=s.MAs(7);s.xp6(2),s.Oqu(e.key),s.xp6(2),s.Q6J("colorType","up"===e.result.status?"success":"error"),s.xp6(1),s.Q6J("ngIf","up"===e.result.status)("ngIfElse",n),s.xp6(4),s.Oqu(e.result.message)}}class b{constructor(e){this.healthCheckService=e}}b.\u0275fac=function(e){return new(e||b)(s.Y36(r.Gpz))},b.\u0275cmp=s.Xpm({type:b,selectors:[["vdr-health-check"]],decls:25,vars:18,consts:[["class","system-status-header",4,"ngIf"],["locationId","system-status"],[1,"btn","btn-secondary",3,"click"],["shape","refresh"],[1,"table"],[1,"left"],[4,"ngFor","ngForOf"],[1,"system-status-header"],[1,"status-icon"],["size","48",3,"ngClass"],[1,"status-detail"],[4,"ngIf","ngIfElse"],["error",""],[1,"last-checked"],[1,"align-middle","left"],[3,"colorType"],["down",""],["shape","check-circle"],["shape","exclamation-circle"]],template:function(e,t){1&e&&(s.TgZ(0,"vdr-action-bar"),s.TgZ(1,"vdr-ab-left"),s.YNc(2,h,12,16,"div",0),s.ALo(3,"async"),s.qZA(),s.TgZ(4,"vdr-ab-right"),s._UZ(5,"vdr-action-bar-items",1),s.TgZ(6,"button",2),s.NdJ("click",function(){return t.healthCheckService.refresh()}),s._UZ(7,"clr-icon",3),s._uU(8),s.ALo(9,"translate"),s.qZA(),s.qZA(),s.qZA(),s.TgZ(10,"table",4),s.TgZ(11,"thead"),s.TgZ(12,"tr"),s.TgZ(13,"th",5),s._uU(14),s.ALo(15,"translate"),s.qZA(),s.TgZ(16,"th",5),s._uU(17),s.ALo(18,"translate"),s.qZA(),s.TgZ(19,"th",5),s._uU(20),s.ALo(21,"translate"),s.qZA(),s.qZA(),s.qZA(),s.TgZ(22,"tbody"),s.YNc(23,A,10,5,"tr",6),s.ALo(24,"async"),s.qZA(),s.qZA()),2&e&&(s.xp6(2),s.Q6J("ngIf",s.lcZ(3,6,t.healthCheckService.status$)),s.xp6(6),s.hij(" ",s.lcZ(9,8,"system.health-refresh")," "),s.xp6(6),s.hij(" ",s.lcZ(15,10,"common.name")," "),s.xp6(3),s.hij(" ",s.lcZ(18,12,"system.health-status")," "),s.xp6(3),s.hij(" ",s.lcZ(21,14,"system.health-message")," "),s.xp6(3),s.Q6J("ngForOf",s.lcZ(24,16,t.healthCheckService.details$)))},directives:[o.Kk,o.BN,c.O5,o.mz,a.W,i.qvL,c.sg,c.mk,l.Y],pipes:[c.Ov,u.X$,d.H],styles:[".system-status-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start}.system-status-header[_ngcontent-%COMP%]   .status-detail[_ngcontent-%COMP%]{font-weight:bold;margin-right:6px}.system-status-header[_ngcontent-%COMP%]   .last-checked[_ngcontent-%COMP%]{font-weight:normal;color:var(--color-grey-500)}"],changeDetection:0});var v=n(1707),q=n(12702),x=n(22663),y=n(9170),T=n(33927),_=n(16320),U=n(57890),N=n(36868),j=n(20365),L=n(30901),I=n(33146);function k(e,t){if(1&e&&(s.TgZ(0,"span",3),s._uU(1),s.ALo(2,"percent"),s.qZA()),2&e){const e=s.oxw();s.xp6(1),s.hij(" ",s.lcZ(2,1,e.job.progress/100)," ")}}class w{get iconShape(){switch(this.job.state){case r.Zyh.COMPLETED:return"check-circle";case r.Zyh.FAILED:return"exclamation-circle";case r.Zyh.CANCELLED:return"ban";case r.Zyh.PENDING:case r.Zyh.RETRYING:return"hourglass";case r.Zyh.RUNNING:return"sync"}}get colorType(){switch(this.job.state){case r.Zyh.COMPLETED:return"success";case r.Zyh.FAILED:case r.Zyh.CANCELLED:return"error";case r.Zyh.PENDING:case r.Zyh.RETRYING:return"";case r.Zyh.RUNNING:return"warning"}}}w.\u0275fac=function(e){return new(e||w)},w.\u0275cmp=s.Xpm({type:w,selectors:[["vdr-job-state-label"]],inputs:{job:"job"},decls:5,vars:6,consts:[[3,"colorType"],[1,"mr1"],["class","progress",4,"ngIf"],[1,"progress"]],template:function(e,t){1&e&&(s.TgZ(0,"vdr-chip",0),s._UZ(1,"clr-icon",1),s._uU(2),s.ALo(3,"titlecase"),s.YNc(4,k,3,3,"span",2),s.qZA()),2&e&&(s.Q6J("colorType",t.colorType),s.xp6(1),s.uIk("shape",t.iconShape),s.xp6(1),s.hij(" ",s.lcZ(3,4,t.job.state)," "),s.xp6(2),s.Q6J("ngIf","RUNNING"===t.job.state))},directives:[l.Y,i.qvL,c.O5],pipes:[c.rS,c.Zx],styles:[".progress[_ngcontent-%COMP%]{margin-left:3px}clr-icon[_ngcontent-%COMP%]{min-width:12px}"],changeDetection:0});var C=n(30735),J=n(41519),O=n(28854),Q=n(2702),P=n(15111),Y=n(66826),E=n(81689),S=n(97388);function D(e,t){1&e&&(s.ynx(0),s._uU(1),s.ALo(2,"translate"),s.BQk()),2&e&&(s.xp6(1),s.hij(" ",s.lcZ(2,1,"system.all-job-queues")," "))}function F(e,t){if(1&e&&(s.TgZ(0,"vdr-chip",8),s._uU(1),s.qZA()),2&e){const e=s.oxw().item;s.Q6J("colorFrom",e.name),s.xp6(1),s.Oqu(e.name)}}function M(e,t){if(1&e&&(s.YNc(0,D,3,3,"ng-container",6),s.YNc(1,F,2,2,"ng-template",null,7,s.W1O)),2&e){const e=t.item,n=s.MAs(2);s.Q6J("ngIf","all"===e.name)("ngIfElse",n)}}function R(e,t){if(1&e&&(s.TgZ(0,"vdr-dropdown"),s.TgZ(1,"button",15),s.ALo(2,"translate"),s._UZ(3,"clr-icon",16),s.qZA(),s.TgZ(4,"vdr-dropdown-menu"),s.TgZ(5,"div",17),s._UZ(6,"vdr-object-tree",18),s.qZA(),s.qZA(),s.qZA()),2&e){const e=s.oxw().item;s.xp6(1),s.Q6J("title",s.lcZ(2,2,"system.job-data")),s.xp6(5),s.Q6J("value",e.data)}}function $(e,t){if(1&e&&(s.TgZ(0,"div",19),s._uU(1),s.qZA()),2&e){const e=s.oxw().item;s.xp6(1),s.hij(" after ",e.attempts," attempts ")}}function G(e,t){if(1&e&&(s.TgZ(0,"div",19),s._uU(1),s.qZA()),2&e){const e=s.oxw().item;s.xp6(1),s.AsE(" attempting ",e.attempts+1," of ",e.retries," ")}}function B(e,t){if(1&e&&(s.TgZ(0,"vdr-dropdown"),s.TgZ(1,"button",20),s._UZ(2,"clr-icon",16),s._uU(3),s.ALo(4,"translate"),s.qZA(),s.TgZ(5,"vdr-dropdown-menu"),s.TgZ(6,"div",17),s._UZ(7,"vdr-object-tree",18),s.qZA(),s.qZA(),s.qZA()),2&e){const e=s.oxw().item;s.xp6(3),s.hij(" ",s.lcZ(4,2,"system.job-result")," "),s.xp6(4),s.Q6J("value",e.result)}}function W(e,t){if(1&e&&(s.TgZ(0,"vdr-dropdown"),s.TgZ(1,"button",20),s._UZ(2,"clr-icon",21),s._uU(3),s.ALo(4,"translate"),s.qZA(),s.TgZ(5,"vdr-dropdown-menu"),s.TgZ(6,"div",17),s._uU(7),s.qZA(),s.qZA(),s.qZA()),2&e){const e=s.oxw().item;s.xp6(3),s.hij(" ",s.lcZ(4,2,"system.job-error")," "),s.xp6(4),s.hij(" ",e.error," ")}}const z=function(){return["DeleteSettings","DeleteSystem"]};function H(e,t){if(1&e){const e=s.EpF();s.TgZ(0,"vdr-dropdown"),s.TgZ(1,"button",22),s._UZ(2,"clr-icon",23),s.qZA(),s.TgZ(3,"vdr-dropdown-menu",24),s.TgZ(4,"button",25),s.NdJ("click",function(){s.CHM(e);const t=s.oxw().item;return s.oxw().cancelJob(t.id)}),s.ALo(5,"hasPermission"),s._UZ(6,"clr-icon",26),s._uU(7),s.ALo(8,"translate"),s.qZA(),s.qZA(),s.qZA()}2&e&&(s.xp6(4),s.Q6J("disabled",!s.lcZ(5,2,s.DdM(6,z))),s.xp6(3),s.hij(" ",s.lcZ(8,4,"common.cancel")," "))}function K(e,t){if(1&e&&(s.TgZ(0,"td",9),s._UZ(1,"vdr-entity-info",10),s.qZA(),s.TgZ(2,"td",9),s.YNc(3,R,7,4,"vdr-dropdown",11),s.TgZ(4,"vdr-chip",8),s._uU(5),s.qZA(),s.qZA(),s.TgZ(6,"td",9),s._uU(7),s.ALo(8,"timeAgo"),s.qZA(),s.TgZ(9,"td",9),s._UZ(10,"vdr-job-state-label",12),s.YNc(11,$,2,1,"div",13),s.YNc(12,G,2,2,"div",13),s.qZA(),s.TgZ(13,"td",9),s._uU(14),s.ALo(15,"duration"),s.qZA(),s.TgZ(16,"td",9),s.YNc(17,B,8,4,"vdr-dropdown",11),s.YNc(18,W,8,4,"vdr-dropdown",11),s.qZA(),s.TgZ(19,"td",14),s.YNc(20,H,9,7,"vdr-dropdown",11),s.qZA()),2&e){const e=t.item,n=s.oxw();s.xp6(1),s.Q6J("entity",e),s.xp6(2),s.Q6J("ngIf",e.data),s.xp6(1),s.Q6J("colorFrom",e.queueName),s.xp6(1),s.Oqu(e.queueName),s.xp6(2),s.Oqu(s.lcZ(8,12,e.createdAt)),s.xp6(3),s.Q6J("job",e),s.xp6(1),s.Q6J("ngIf","FAILED"===e.state),s.xp6(1),s.Q6J("ngIf","RUNNING"===e.state||"RETRYING"===e.state),s.xp6(2),s.Oqu(s.lcZ(15,14,e.duration)),s.xp6(3),s.Q6J("ngIf",n.hasResult(e)),s.xp6(1),s.Q6J("ngIf",e.error),s.xp6(2),s.Q6J("ngIf",!e.isSettled&&"FAILED"!==e.state)}}class X extends r.t7C{constructor(e,t,n,s,o){super(s,o),this.dataService=e,this.modalService=t,this.notificationService=n,this.liveUpdate=new v.NI(!0),this.hideSettled=new v.NI(!0),this.queueFilter=new v.NI("all"),super.setQueryFn((...e)=>this.dataService.settings.getAllJobs(...e),e=>e.jobs,(e,t)=>{const n="all"===this.queueFilter.value?null:{queueName:{eq:this.queueFilter.value}},s=this.hideSettled.value;return{options:{skip:e,take:t,filter:Object.assign(Object.assign({},n),s?{isSettled:{eq:!1}}:{}),sort:{createdAt:r.Asd.DESC}}}})}ngOnInit(){super.ngOnInit(),(0,q.H)(5e3,2e3).pipe((0,x.R)(this.destroy$),(0,y.h)(()=>this.liveUpdate.value)).subscribe(()=>{this.refresh()}),this.queues$=this.dataService.settings.getJobQueues().mapStream(e=>e.jobQueues).pipe((0,T.U)(e=>[{name:"all",running:!0},...e]))}hasResult(e){const t=e.result;return null!=t&&("object"!=typeof t||Object.keys(t).length>0)}cancelJob(e){this.dataService.settings.cancelJob(e).subscribe(()=>this.refresh())}}X.\u0275fac=function(e){return new(e||X)(s.Y36(r.DoR),s.Y36(r.Z7U),s.Y36(r.gqp),s.Y36(_.F0),s.Y36(_.gz))},X.\u0275cmp=s.Xpm({type:X,selectors:[["vdr-job-list"]],features:[s.qOj],decls:41,vars:45,consts:[["type","checkbox","clrCheckbox","","name","live-update",3,"formControl"],["type","checkbox","clrCheckbox","","name","hide-settled",3,"formControl","change"],["bindValue","name",3,"addTag","items","hideSelected","multiple","markFirst","clearable","searchable","formControl","change"],["ng-label-tmp","","ng-option-tmp",""],["locationId","job-list"],[3,"items","itemsPerPage","totalItems","currentPage","pageChange","itemsPerPageChange"],[4,"ngIf","ngIfElse"],["others",""],[3,"colorFrom"],[1,"left","align-middle"],[3,"entity"],[4,"ngIf"],[3,"job"],["class","retry-info",4,"ngIf"],[1,"right","align-middle"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-icon",3,"title"],["shape","details"],[1,"result-detail"],[3,"value"],[1,"retry-info"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-sm","details-button"],["shape","exclamation-circle"],["vdrDropdownTrigger","",1,"icon-button"],["shape","ellipsis-vertical"],["vdrPosition","bottom-right"],["type","button","vdrDropdownItem","",1,"delete-button",3,"disabled","click"],["shape","ban",1,"is-danger"]],template:function(e,t){1&e&&(s.TgZ(0,"vdr-action-bar"),s.TgZ(1,"vdr-ab-left"),s.TgZ(2,"clr-checkbox-container"),s.TgZ(3,"clr-checkbox-wrapper"),s._UZ(4,"input",0),s.TgZ(5,"label"),s._uU(6),s.ALo(7,"translate"),s.qZA(),s.qZA(),s.TgZ(8,"clr-checkbox-wrapper"),s.TgZ(9,"input",1),s.NdJ("change",function(){return t.refresh()}),s.qZA(),s.TgZ(10,"label"),s._uU(11),s.ALo(12,"translate"),s.qZA(),s.qZA(),s.qZA(),s.qZA(),s.TgZ(13,"vdr-ab-right"),s.TgZ(14,"ng-select",2),s.NdJ("change",function(){return t.refresh()}),s.ALo(15,"async"),s.YNc(16,M,3,2,"ng-template",3),s.qZA(),s._UZ(17,"vdr-action-bar-items",4),s.qZA(),s.qZA(),s.TgZ(18,"vdr-data-table",5),s.NdJ("pageChange",function(e){return t.setPageNumber(e)})("itemsPerPageChange",function(e){return t.setItemsPerPage(e)}),s.ALo(19,"async"),s.ALo(20,"async"),s.ALo(21,"async"),s.ALo(22,"async"),s._UZ(23,"vdr-dt-column"),s.TgZ(24,"vdr-dt-column"),s._uU(25),s.ALo(26,"translate"),s.qZA(),s.TgZ(27,"vdr-dt-column"),s._uU(28),s.ALo(29,"translate"),s.qZA(),s.TgZ(30,"vdr-dt-column"),s._uU(31),s.ALo(32,"translate"),s.qZA(),s.TgZ(33,"vdr-dt-column"),s._uU(34),s.ALo(35,"translate"),s.qZA(),s.TgZ(36,"vdr-dt-column"),s._uU(37),s.ALo(38,"translate"),s.qZA(),s._UZ(39,"vdr-dt-column"),s.YNc(40,K,21,16,"ng-template"),s.qZA()),2&e&&(s.xp6(4),s.Q6J("formControl",t.liveUpdate),s.xp6(2),s.Oqu(s.lcZ(7,21,"common.live-update")),s.xp6(3),s.Q6J("formControl",t.hideSettled),s.xp6(2),s.Oqu(s.lcZ(12,23,"system.hide-settled-jobs")),s.xp6(3),s.Q6J("addTag",!1)("items",s.lcZ(15,25,t.queues$))("hideSelected",!0)("multiple",!1)("markFirst",!1)("clearable",!1)("searchable",!1)("formControl",t.queueFilter),s.xp6(4),s.Q6J("items",s.lcZ(19,27,t.items$))("itemsPerPage",s.lcZ(20,29,t.itemsPerPage$))("totalItems",s.lcZ(21,31,t.totalItems$))("currentPage",s.lcZ(22,33,t.currentPage$)),s.xp6(7),s.Oqu(s.lcZ(26,35,"system.job-queue-name")),s.xp6(3),s.Oqu(s.lcZ(29,37,"common.created-at")),s.xp6(3),s.Oqu(s.lcZ(32,39,"system.job-state")),s.xp6(3),s.Oqu(s.lcZ(35,41,"system.job-duration")),s.xp6(3),s.Oqu(s.lcZ(38,43,"system.job-result")))},directives:[o.Kk,o.BN,i.Y_4,i.PEh,U.y,v.Wl,i.KKC,v.JJ,v.oH,i.MgK,o.mz,N.w9,N.bb,N.Z2,a.W,j.Q,L.E,c.O5,l.Y,I.V,w,C.J,J.U,i.qvL,O.N,Q._,P.H],pipes:[u.X$,c.Ov,Y.e,E.u,S.j],styles:[".result-detail[_ngcontent-%COMP%]{margin:0 12px}.retry-info[_ngcontent-%COMP%]{margin-left:6px;color:var(--color-grey-400)}"],changeDetection:0});var V=n(30724);const ee=[{path:"jobs",component:X,data:{breadcrumb:(0,V.J)("breadcrumb.job-queue")}},{path:"system-status",component:b,data:{breadcrumb:(0,V.J)("breadcrumb.system-status")}}];class te{}te.\u0275fac=function(e){return new(e||te)},te.\u0275mod=s.oAB({type:te}),te.\u0275inj=s.cJS({imports:[[r.m81,_.Bz.forChild(ee)]]})}}]);
//# sourceMappingURL=90-es2015.14b33e7c779a0f1e6a77.js.map