"use strict";(self.webpackChunk_vendure_admin_ui=self.webpackChunk_vendure_admin_ui||[]).push([[982],{90982:function(t,e,n){n.r(e),n.d(e,{DEFAULT_DASHBOARD_WIDGET_LAYOUT:function(){return at},DEFAULT_WIDGETS:function(){return dt},DashboardComponent:function(){return q},DashboardModule:function(){return st},DashboardWidgetComponent:function(){return b},LatestOrdersWidgetComponent:function(){return j},LatestOrdersWidgetModule:function(){return R},OrderSummaryWidgetComponent:function(){return G},OrderSummaryWidgetModule:function(){return K},TestWidgetComponent:function(){return tt},TestWidgetModule:function(){return et},WelcomeWidgetComponent:function(){return it},WelcomeWidgetModule:function(){return rt},dashboardRoutes:function(){return T}});var o=n(87187),i=n(33927),r=n(14921),a=n(30464),d=n(15455),s=n(30735),c=n(41519),l=n(65671),g=n(28854),u=n(54364),p=n(6411),h=n(15111),m=n(59416),f=n(3786),v=n(70325);const Z=["portal"];function y(t,e){if(1&t&&(a.ynx(0),a._uU(1),a.ALo(2,"translate"),a.BQk()),2&t){const t=e.ngIf;a.xp6(1),a.Oqu(a.lcZ(2,1,t))}}function w(t,e){}class b{constructor(t){this.componentFactoryResolver=t}ngAfterViewInit(){this.loadWidget()}loadWidget(){return(0,f.mG)(this,void 0,void 0,function*(){const t=this.widgetConfig.loadComponent(),e=t instanceof Promise?yield t:t;this.componentRef=this.portal.createComponent(this.componentFactoryResolver.resolveComponentFactory(e)),this.componentRef.changeDetectorRef.detectChanges()})}ngOnDestroy(){this.componentRef&&this.componentRef.destroy()}}function A(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",7),a.NdJ("click",function(){const e=a.CHM(t).$implicit;return a.oxw().addWidget(e)}),a._uU(1),a.qZA()}if(2&t){const t=e.$implicit;a.xp6(1),a.hij(" ",t," ")}}b.\u0275fac=function(t){return new(t||b)(a.Y36(a._Vd))},b.\u0275cmp=a.Xpm({type:b,selectors:[["vdr-dashboard-widget"]],viewQuery:function(t,e){if(1&t&&a.Gf(Z,5,a.s_b),2&t){let t;a.iGM(t=a.CRH())&&(e.portal=t.first)}},inputs:{widgetConfig:"widgetConfig"},ngContentSelectors:["*"],decls:9,vars:1,consts:[[1,"card"],[1,"card-header"],[1,"title"],[4,"ngIf"],[1,"controls"],[1,"card-block"],["portal",""]],template:function(t,e){1&t&&(a.F$t(),a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.YNc(3,y,3,3,"ng-container",3),a.qZA(),a.TgZ(4,"div",4),a.Hsn(5),a.qZA(),a.qZA(),a.TgZ(6,"div",5),a.YNc(7,w,0,0,"ng-template",null,6,a.W1O),a.qZA(),a.qZA()),2&t&&(a.xp6(3),a.Q6J("ngIf",e.widgetConfig.title))},directives:[u.O5],pipes:[v.X$],styles:["[_nghost-%COMP%]{display:block}.card[_ngcontent-%COMP%]{margin-top:0;min-height:200px}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between}"],changeDetection:0});const x=function(t){return{width:t}};function C(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",22),a.NdJ("click",function(){const e=a.CHM(t).$implicit,n=a.oxw(2).$implicit;return a.oxw(2).setWidgetWidth(n,e)}),a._uU(1),a.ALo(2,"translate"),a.qZA()}if(2&t){const t=e.$implicit,n=a.oxw(2).$implicit;a.Q6J("disabled",t===n.width),a.xp6(1),a.hij(" ",a.xi3(2,2,"dashboard.widget-width",a.VKq(5,x,t))," ")}}function O(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"vdr-dashboard-widget",12),a.TgZ(1,"div",13),a.TgZ(2,"div",14),a._UZ(3,"clr-icon",15),a.qZA(),a.TgZ(4,"vdr-dropdown"),a.TgZ(5,"button",16),a._UZ(6,"clr-icon",17),a.qZA(),a.TgZ(7,"vdr-dropdown-menu",3),a.TgZ(8,"h4",18),a._uU(9),a.ALo(10,"translate"),a.qZA(),a.YNc(11,C,3,7,"button",19),a._UZ(12,"div",20),a.TgZ(13,"button",7),a.NdJ("click",function(){a.CHM(t);const e=a.oxw().$implicit;return a.oxw(2).removeWidget(e)}),a._UZ(14,"clr-icon",21),a._uU(15),a.ALo(16,"translate"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()}if(2&t){const t=a.oxw().$implicit,e=a.oxw(2);a.Q6J("widgetConfig",t.config),a.xp6(9),a.Oqu(a.lcZ(10,4,"dashboard.widget-resize")),a.xp6(2),a.Q6J("ngForOf",e.getSupportedWidths(t.config)),a.xp6(4),a.hij(" ",a.lcZ(16,6,"dashboard.remove-widget")," ")}}function _(t,e){if(1&t&&(a.TgZ(0,"div",10),a.YNc(1,O,17,8,"vdr-dashboard-widget",11),a.qZA()),2&t){const t=e.$implicit,n=a.oxw(2);a.Q6J("ngClass",n.getClassForWidth(t.width))("cdkDragData",t),a.xp6(1),a.Q6J("vdrIfPermissions",t.config.requiresPermissions||null)}}const L=function(t){return{index:t}};function k(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",8),a.NdJ("cdkDropListDropped",function(e){return a.CHM(t),a.oxw().drop(e)}),a.YNc(1,_,2,3,"div",9),a.qZA()}if(2&t){const t=e.$implicit,n=e.index,o=a.oxw();a.Q6J("cdkDropListData",a.VKq(3,L,n)),a.xp6(1),a.Q6J("ngForOf",t)("ngForTrackBy",o.trackRowItem)}}class q{constructor(t,e,n,o){this.dashboardWidgetService=t,this.localStorageService=e,this.changedDetectorRef=n,this.dataService=o,this.deletionMarker="__delete__"}ngOnInit(){this.availableWidgetIds$=this.dataService.client.userStatus().stream$.pipe((0,i.U)(({userStatus:t})=>t.permissions),(0,i.U)(t=>this.dashboardWidgetService.getAvailableIds(t)),(0,r.b)(t=>this.widgetLayout=this.initLayout(t)))}getClassForWidth(t){switch(t){case 3:return"clr-col-12 clr-col-sm-6 clr-col-lg-3";case 4:return"clr-col-12 clr-col-sm-6 clr-col-lg-4";case 6:return"clr-col-12 clr-col-lg-6";case 8:return"clr-col-12 clr-col-lg-8";case 12:return"clr-col-12";default:(0,o.assertNever)(t)}}getSupportedWidths(t){return t.supportedWidths||[3,4,6,8,12]}setWidgetWidth(t,e){t.width=e,this.recalculateLayout()}trackRow(t,e){return e.map(t=>`${t.id}:${t.width}`).join("|")}trackRowItem(t,e){return e.config}addWidget(t){var e;const n=this.dashboardWidgetService.getWidgetById(t);if(n){const o={id:t,config:n,width:this.getSupportedWidths(n)[0]};let i;this.widgetLayout&&this.widgetLayout.length?i=this.widgetLayout[this.widgetLayout.length-1]:(i=[],null===(e=this.widgetLayout)||void 0===e||e.push(i)),i.push(o),this.recalculateLayout()}}removeWidget(t){t.id=this.deletionMarker,this.recalculateLayout()}drop(t){const{currentIndex:e,previousIndex:n,previousContainer:o,container:i}=t;if((n!==e||o.data.index!==i.data.index)&&this.widgetLayout){const r=this.widgetLayout[o.data.index],a=this.widgetLayout[i.data.index];r.splice(n,1),a.splice(e,0,t.item.data),this.recalculateLayout()}}initLayout(t){const e=this.localStorageService.get("dashboardWidgetLayout");let n;return e&&(n=e.filter(e=>t.includes(e.id))),this.dashboardWidgetService.getWidgetLayout(n)}recalculateLayout(){if(this.widgetLayout){const t=this.widgetLayout.reduce((t,e)=>[...t,...e],[]).filter(t=>t.id!==this.deletionMarker).map(t=>({id:t.id,width:t.width}));this.widgetLayout=this.dashboardWidgetService.getWidgetLayout(t),this.localStorageService.set("dashboardWidgetLayout",t),setTimeout(()=>this.changedDetectorRef.markForCheck())}}}q.\u0275fac=function(t){return new(t||q)(a.Y36(d.ayj),a.Y36(d.n2A),a.Y36(a.sBO),a.Y36(d.DoR))},q.\u0275cmp=a.Xpm({type:q,selectors:[["vdr-dashboard"]],decls:11,vars:8,consts:[[1,"widget-header"],["vdrDropdownTrigger","",1,"btn","btn-secondary","btn-sm"],["shape","plus"],["vdrPosition","bottom-right"],["class","button","vdrDropdownItem","",3,"click",4,"ngFor","ngForOf"],["cdkDropListGroup",""],["class","clr-row dashboard-row","cdkDropList","","cdkDropListOrientation","horizontal",3,"cdkDropListData","cdkDropListDropped",4,"ngFor","ngForOf","ngForTrackBy"],["vdrDropdownItem","",1,"button",3,"click"],["cdkDropList","","cdkDropListOrientation","horizontal",1,"clr-row","dashboard-row",3,"cdkDropListData","cdkDropListDropped"],["class","dashboard-item","cdkDrag","",3,"ngClass","cdkDragData",4,"ngFor","ngForOf","ngForTrackBy"],["cdkDrag","",1,"dashboard-item",3,"ngClass","cdkDragData"],[3,"widgetConfig",4,"vdrIfPermissions"],[3,"widgetConfig"],[1,"flex"],["cdkDragHandle","",1,"drag-handle"],["shape","drag-handle","size","24"],["vdrDropdownTrigger","",1,"icon-button"],["shape","ellipsis-vertical"],[1,"dropdown-header"],["class","button","vdrDropdownItem","",3,"disabled","click",4,"ngFor","ngForOf"],["role","separator",1,"dropdown-divider"],["shape","trash",1,"is-danger"],["vdrDropdownItem","",1,"button",3,"disabled","click"]],template:function(t,e){1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"vdr-dropdown"),a.TgZ(2,"button",1),a._UZ(3,"clr-icon",2),a._uU(4),a.ALo(5,"translate"),a.qZA(),a.TgZ(6,"vdr-dropdown-menu",3),a.YNc(7,A,2,1,"button",4),a.ALo(8,"async"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(9,"div",5),a.YNc(10,k,2,5,"div",6),a.qZA()),2&t&&(a.xp6(4),a.hij(" ",a.lcZ(5,4,"dashboard.add-widget")," "),a.xp6(3),a.Q6J("ngForOf",a.lcZ(8,6,e.availableWidgetIds$)),a.xp6(3),a.Q6J("ngForOf",e.widgetLayout)("ngForTrackBy",e.trackRow))},directives:[s.J,c.U,l.qvL,g.N,u.sg,p.Fd,l.q0d,h.H,p.Wj,p.Zt,u.mk,m.H,b,p.Bh],pipes:[v.X$,u.Ov],styles:["[_nghost-%COMP%]{display:block;max-width:1200px;margin:auto}.widget-header[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.placeholder[_ngcontent-%COMP%]{color:var(--color-grey-300);text-align:center}.placeholder[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]{font-size:3em;margin:24px;line-height:1em}.placeholder[_ngcontent-%COMP%]     .clr-i-outline{fill:var(--color-grey-200)}vdr-dashboard-widget[_ngcontent-%COMP%]{margin-bottom:24px}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.dashboard-row[_ngcontent-%COMP%]{padding:0;border-width:1;margin-bottom:6px;transition:padding .2s,margin .2s}.dashboard-row.cdk-drop-list-dragging[_ngcontent-%COMP%], .dashboard-row.cdk-drop-list-receiving[_ngcontent-%COMP%]{border:1px dashed var(--color-component-border-200);padding:6px}.dashboard-row.cdk-drop-list-dragging[_ngcontent-%COMP%]   .dashboard-item[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"],changeDetection:0});var D=n(16320);const T=[{path:"",component:q,pathMatch:"full"}];var W=n(30724),M=n(20365),S=n(75886),U=n(90458),$=n(28899),I=n(4187),P=n(66826);const J=function(t){return["/orders/",t]};function F(t,e){if(1&t&&(a.TgZ(0,"td",1),a._uU(1),a._UZ(2,"vdr-order-state-label",2),a.qZA(),a.TgZ(3,"td",1),a._UZ(4,"vdr-customer-label",3),a.qZA(),a.TgZ(5,"td",1),a._uU(6),a.ALo(7,"localeCurrency"),a.qZA(),a.TgZ(8,"td",1),a._uU(9),a.ALo(10,"timeAgo"),a.qZA(),a.TgZ(11,"td",4),a._UZ(12,"vdr-table-row-action",5),a.ALo(13,"translate"),a.qZA()),2&t){const t=e.item;a.xp6(1),a.hij(" ",t.code," "),a.xp6(1),a.Q6J("state",t.state),a.xp6(2),a.Q6J("customer",t.customer),a.xp6(2),a.Oqu(a.xi3(7,7,t.total,t.currencyCode)),a.xp6(3),a.Oqu(a.lcZ(10,10,t.orderPlacedAt)),a.xp6(3),a.Q6J("label",a.lcZ(13,12,"common.open"))("linkTo",a.VKq(14,J,t.id))}}class j{constructor(t){this.dataService=t}ngOnInit(){this.latestOrders$=this.dataService.order.getOrders({take:10,filter:{active:{eq:!1},state:{notEq:"Cancelled"}},sort:{orderPlacedAt:d.Asd.DESC}}).refetchOnChannelChange().mapStream(t=>t.orders.items)}}j.\u0275fac=function(t){return new(t||j)(a.Y36(d.DoR))},j.\u0275cmp=a.Xpm({type:j,selectors:[["vdr-latest-orders-widget"]],decls:3,vars:3,consts:[[3,"items"],[1,"left","align-middle"],[3,"state"],[3,"customer"],[1,"right","align-middle"],["iconShape","shopping-cart",3,"label","linkTo"]],template:function(t,e){1&t&&(a.TgZ(0,"vdr-data-table",0),a.ALo(1,"async"),a.YNc(2,F,14,16,"ng-template"),a.qZA()),2&t&&a.Q6J("items",a.lcZ(1,1,e.latestOrders$))},directives:[M.Q,S.G,U.d,$.v],pipes:[u.Ov,I.k,P.e,v.X$],styles:["vdr-data-table[_ngcontent-%COMP%]     table{margin-top:0}"],changeDetection:0});class R{}R.\u0275fac=function(t){return new(t||R)},R.\u0275mod=a.oAB({type:R}),R.\u0275inj=a.cJS({imports:[[d.IR2,d.m81]]});var N=n(47491),Q=n.n(N),Y=n(76491),B=n(83720),H=n(92597),V=n(79902),E=n(2651);function z(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",7),a.TgZ(1,"button",8),a.NdJ("click",function(){a.CHM(t);const e=a.oxw();return e.selection$.next({timeframe:"day",date:e.today})}),a._uU(2),a.ALo(3,"translate"),a.qZA(),a.TgZ(4,"button",8),a.NdJ("click",function(){a.CHM(t);const e=a.oxw();return e.selection$.next({timeframe:"day",date:e.yesterday})}),a._uU(5),a.ALo(6,"translate"),a.qZA(),a.TgZ(7,"button",8),a.NdJ("click",function(){return a.CHM(t),a.oxw().selection$.next({timeframe:"week"})}),a._uU(8),a.ALo(9,"translate"),a.qZA(),a.TgZ(10,"button",8),a.NdJ("click",function(){return a.CHM(t),a.oxw().selection$.next({timeframe:"month"})}),a._uU(11),a.ALo(12,"translate"),a.qZA(),a.qZA()}if(2&t){const t=e.ngIf,n=a.oxw();a.xp6(1),a.ekj("btn-primary",t.date===n.today),a.xp6(1),a.hij(" ",a.lcZ(3,12,"dashboard.today")," "),a.xp6(2),a.ekj("btn-primary",t.date===n.yesterday),a.xp6(1),a.hij(" ",a.lcZ(6,14,"dashboard.yesterday")," "),a.xp6(2),a.ekj("btn-primary","week"===t.timeframe),a.xp6(1),a.hij(" ",a.lcZ(9,16,"dashboard.thisWeek")," "),a.xp6(2),a.ekj("btn-primary","month"===t.timeframe),a.xp6(1),a.hij(" ",a.lcZ(12,18,"dashboard.thisMonth")," ")}}function X(t,e){if(1&t&&(a.TgZ(0,"div",9),a._uU(1),a.ALo(2,"localeDate"),a.ALo(3,"localeDate"),a.qZA()),2&t){const t=e.ngIf;a.xp6(1),a.AsE(" ",a.lcZ(2,2,t.start)," - ",a.lcZ(3,4,t.end)," ")}}class G{constructor(t){this.dataService=t,this.today=new Date,this.yesterday=new Date((new Date).setDate(this.today.getDate()-1)),this.selection$=new Y.X({timeframe:"day",date:this.today})}ngOnInit(){this.dateRange$=this.selection$.pipe((0,B.x)(),(0,i.U)(t=>({start:Q()(t.date).startOf(t.timeframe).toDate(),end:Q()(t.date).endOf(t.timeframe).toDate()})),(0,H.d)(1));const t=this.dateRange$.pipe((0,V.w)(({start:t,end:e})=>this.dataService.order.getOrderSummary(t,e).refetchOnChannelChange().mapStream(t=>t.orders)),(0,H.d)(1));this.totalOrderCount$=t.pipe((0,i.U)(t=>t.totalItems)),this.totalOrderValue$=t.pipe((0,i.U)(t=>t.items.reduce((t,e)=>t+e.total,0)/100)),this.currencyCode$=this.dataService.settings.getActiveChannel().refetchOnChannelChange().mapStream(t=>t.activeChannel.currencyCode||void 0)}}G.\u0275fac=function(t){return new(t||G)(a.Y36(d.DoR))},G.\u0275cmp=a.Xpm({type:G,selectors:[["vdr-order-summary-widget"]],decls:22,vars:23,consts:[[1,"stats"],[1,"stat"],[1,"stat-figure"],[1,"stat-label"],[1,"footer"],["class","btn-group btn-outline-primary btn-sm",4,"ngIf"],["class","date-range p5",4,"ngIf"],[1,"btn-group","btn-outline-primary","btn-sm"],[1,"btn",3,"click"],[1,"date-range","p5"]],template:function(t,e){1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a._uU(3),a.ALo(4,"async"),a.qZA(),a.TgZ(5,"div",3),a._uU(6),a.ALo(7,"translate"),a.qZA(),a.qZA(),a.TgZ(8,"div",1),a.TgZ(9,"div",2),a._uU(10),a.ALo(11,"currency"),a.ALo(12,"async"),a.ALo(13,"async"),a.qZA(),a.TgZ(14,"div",3),a._uU(15),a.ALo(16,"translate"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(17,"div",4),a.YNc(18,z,13,20,"div",5),a.ALo(19,"async"),a.YNc(20,X,4,6,"div",6),a.ALo(21,"async"),a.qZA()),2&t&&(a.xp6(3),a.Oqu(a.lcZ(4,6,e.totalOrderCount$)),a.xp6(3),a.Oqu(a.lcZ(7,8,"dashboard.total-orders")),a.xp6(4),a.hij(" ",a.xi3(11,10,a.lcZ(12,13,e.totalOrderValue$),a.lcZ(13,15,e.currencyCode$)||void 0)," "),a.xp6(5),a.Oqu(a.lcZ(16,17,"dashboard.total-order-value")),a.xp6(3),a.Q6J("ngIf",a.lcZ(19,19,e.selection$)),a.xp6(2),a.Q6J("ngIf",a.lcZ(21,21,e.dateRange$)))},directives:[u.O5],pipes:[u.Ov,v.X$,u.H9,E.H],styles:[".stats[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly}.stat[_ngcontent-%COMP%]{text-align:center}.stat-figure[_ngcontent-%COMP%]{font-size:2rem;line-height:3rem}.stat-label[_ngcontent-%COMP%]{text-transform:uppercase}.date-range[_ngcontent-%COMP%]{margin-top:0}.footer[_ngcontent-%COMP%]{margin-top:24px;display:flex;flex-direction:column;justify-content:space-between}"],changeDetection:0});class K{}K.\u0275fac=function(t){return new(t||K)},K.\u0275mod=a.oAB({type:K}),K.\u0275inj=a.cJS({imports:[[d.IR2]]});class tt{}tt.\u0275fac=function(t){return new(t||tt)},tt.\u0275cmp=a.Xpm({type:tt,selectors:[["vdr-test-widget"]],decls:2,vars:0,template:function(t,e){1&t&&(a.TgZ(0,"p"),a._uU(1,"This is a test widget!"),a.qZA())},styles:[""],changeDetection:0});class et{}function nt(t,e){if(1&t&&(a.TgZ(0,"p",4),a._uU(1),a.qZA()),2&t){const t=a.oxw(2);a.xp6(1),a.AsE(" ",t.hideVendureBranding?"":"Vendure"," ",t.hideVersion?"":"Admin UI v"+t.version," ")}}function ot(t,e){if(1&t&&(a.TgZ(0,"div"),a.TgZ(1,"h4",3),a._uU(2),a._UZ(3,"br"),a.TgZ(4,"small",4),a._uU(5),a.ALo(6,"timeAgo"),a.qZA(),a.qZA(),a.YNc(7,nt,2,2,"p",5),a.qZA()),2&t){const t=e.ngIf,n=a.oxw();a.xp6(2),a.AsE(" Welcome, ",t.firstName," ",t.lastName,""),a.xp6(3),a.hij("Last login: ",a.lcZ(6,4,t.user.lastLogin),""),a.xp6(2),a.Q6J("ngIf",!n.hideVendureBranding||!n.hideVersion)}}et.\u0275fac=function(t){return new(t||et)},et.\u0275mod=a.oAB({type:et}),et.\u0275inj=a.cJS({});class it{constructor(t){this.dataService=t,this.version=d.s5M,this.brand=(0,d.hq7)().brand,this.hideVendureBranding=(0,d.hq7)().hideVendureBranding,this.hideVersion=(0,d.hq7)().hideVersion}ngOnInit(){this.administrator$=this.dataService.administrator.getActiveAdministrator().mapStream(t=>t.activeAdministrator||null)}}it.\u0275fac=function(t){return new(t||it)(a.Y36(d.DoR))},it.\u0275cmp=a.Xpm({type:it,selectors:[["vdr-welcome-widget"]],decls:4,vars:3,consts:[[4,"ngIf"],[1,"placeholder"],["shape","line-chart","size","128"],[1,"h4"],[1,"p5"],["class","p5",4,"ngIf"]],template:function(t,e){1&t&&(a.YNc(0,ot,8,6,"div",0),a.ALo(1,"async"),a.TgZ(2,"div",1),a._UZ(3,"clr-icon",2),a.qZA()),2&t&&a.Q6J("ngIf",a.lcZ(1,1,e.administrator$))},directives:[u.O5,l.qvL],pipes:[u.Ov,P.e],styles:["[_nghost-%COMP%]{display:flex;justify-content:space-between}.placeholder[_ngcontent-%COMP%]{color:var(--color-grey-200)}"],changeDetection:0});class rt{}rt.\u0275fac=function(t){return new(t||rt)},rt.\u0275mod=a.oAB({type:rt}),rt.\u0275inj=a.cJS({imports:[[d.IR2]]});const at=[{id:"welcome",width:12},{id:"orderSummary",width:6},{id:"latestOrders",width:6}],dt={welcome:{loadComponent:()=>it},orderSummary:{title:(0,W.J)("dashboard.orders-summary"),loadComponent:()=>G,requiresPermissions:[d.y3$.ReadOrder]},latestOrders:{title:(0,W.J)("dashboard.latest-orders"),loadComponent:()=>j,supportedWidths:[6,8,12],requiresPermissions:[d.y3$.ReadOrder]},testWidget:{title:"Test Widget",loadComponent:()=>tt}};class st{constructor(t){Object.entries(dt).map(([e,n])=>{t.getWidgetById(e)||t.registerWidget(e,n)}),0===t.getDefaultLayout().length&&t.setDefaultLayout(at)}}st.\u0275fac=function(t){return new(t||st)(a.LFG(d.ayj))},st.\u0275mod=a.oAB({type:st}),st.\u0275inj=a.cJS({imports:[[d.m81,D.Bz.forChild(T)]]})}}]);
//# sourceMappingURL=982-es2015.55fcf61130fba3eeee11.js.map