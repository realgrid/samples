import{d as p,t as r,m as C,h as $,n as f,r as g,o as v,c as w,a as P,w as b,u as y,b as R,e as F,F as V,f as _,g as k,i as x,j as O}from"./index-BQlZOH3U.js";const u=(n,t="")=>{const o={};for(let e in n)o[a=t?`${t}-${e}`:e,a.replace(/-./g,i=>i[1].toUpperCase())]=r(n[e]);var a;return o},m=(n,t={},o={})=>{n=n||{};const a=["children"];for(const[e,i]of Object.entries(t))if(!a.includes(e))if(o.hasOwnProperty(e))if(Array.isArray(i))o[e]&&JSON.stringify(i)==JSON.stringify(o[e])||(n[e]=o[e]);else if(i instanceof Object&&!(i instanceof Date||Array.isArray(i)||typeof i=="function"))if(o[e]instanceof Object){const s=m({},i,o[e]);s&&Object.keys(s).length>0&&(n[e]=s)}else n[e]=o[e];else i!==o[e]&&(n[e]=o[e]);else n[e]=null;for(const[e,i]of Object.entries(o))a.includes(e)||t.hasOwnProperty(e)||(n[e]=i);return n},S=p({name:"ComponentBase",props:{},data:()=>({$model:null,$oldValue:null}),mounted(){const n=r(this.$parent);n&&(this.$oldValue=u(r(this.$attrs)),this.mountCB.$mountSeq=this.$.vnode.$mountSeq,n.addCallback(this.mountCB))},unmounted(){const n=this.$parent;n&&(n.removeCallback(this.mountCB),n.addCallback(this.unmountCB))},watch:{$attrs:{handler(n,t){var o;const a=u(r(n)),e=m({},u(r(this.$data.$oldValue)),u(r(n)));if(e&&Object.keys(e).length>0){const i=r((o=this.$data)==null?void 0:o.$model);i&&i.assignFrom(e),this._doWatchAttrs(e),this.$oldValue=a}},deep:!0}},methods:{mountCB(){},unmountCB(){},_doWatchAttrs(n){}},render(){}}),B=p({name:"RGDataColumn",extends:S,data:()=>({}),props:{},methods:{mountCB(n){var t;const o=u(r((t=this.$parent)==null?void 0:t.$props));if(o){const a=o.autoGenerateField,e=n==null?void 0:n.getDataSource(),i=u(r(this.$attrs));let s=i.fieldName;a&&(!s&&i.field&&(s=i.field.fieldName),e&&!e.fieldByName(s)&&e.addField(i.field||s)),n&&(this.$model=n.addColumn({...i,fieldName:s},i.displayIndex??-1))}},unmountCB(n){var t;this.$data.$model&&n.removeColumn(this.$data.$model.name);const o=u(r((t=this.$parent)==null?void 0:t.$props));if(o){const a=o.autoGenerateField,e=n==null?void 0:n.getDataSource(),i=u(r(this.$attrs));let s=i.fieldName;a&&(!s&&i.field&&(s=i.field.fieldName),n.columnByField(s)||e.removeField(s))}},_doWatchAttrs(n){if(n.hasOwnProperty("width")&&!isNaN(n.width)){const t=r(this.$data.$model).layout;t&&(t.cellWidth=n.width)}}}}),I=()=>p({props:{disabled:Boolean,gridProps:Object,dataProps:Object,autoGenerateField:Boolean,rows:Array,rowStyleCallback:Function,cellStyleCallback:Function,layout:Array,onInitialized:Function,onDestroy:Function,onCurrentChanging:Function,onCurrentChanged:Function,onCurrentRowChanged:Function,onValidateColumn:Function,onValidateRow:Function,onValidationFail:Function,onColumnCheckedChanged:Function,onMenuItemClicked:Function,onContextMenuPopup:Function,onPopupMenuPopup:Function,onContextMenuItemClicked:Function,onCellButtonClicked:Function,onScrollToBottom:Function,onTopIndexChanged:Function,onTopIndexChanging:Function,onLeftPosChanged:Function,onRowsDeleting:Function,onRowInserting:Function,onSelectionCleared:Function,onSelectionChanged:Function,onSelectionAdded:Function,onSelectionEnded:Function,onShowEditor:Function,onShowEditCommand:Function,onHideEditor:Function,onEditChange:Function,onGetEditValue:Function,onEditCommit:Function,onEditCanceled:Function,onItemEditCanceled:Function,onItemEditCancel:Function,onEditSearch:Function,onSearchCellButtonClick:Function,onCellEdited:Function,onEditRowChanged:Function,onEditRowPasted:Function,onRowsPasted:Function,onCellPasting:Function,onItemChecked:Function,onItemAllChecked:Function,onErrorClicked:Function,onSorting:Function,onSortingChanged:Function,onFiltering:Function,onFilteringChanged:Function,onWheel:Function,onKeyDown:Function,onKeyPress:Function,onKeyUp:Function,onShowTooltip:Function,onShowHeaderTooltip:Function,onColumnPropertyChanged:Function,onLayoutPropertyChanged:Function,onGridActivated:Function,onCopy:Function,onPaste:Function,onPasted:Function,onItemsChecked:Function,onCellClicked:Function,onCellDblClicked:Function,onCellItemClicked:Function,onCommandStackChanged:Function,onDataLoadComplated:Function,onLayoutExpanding:Function,onLayoutExpanded:Function,onLayoutCollapsing:Function,onLayoutCollapsed:Function},data:()=>({$dataProvider:null,$gridView:null,_mountTimer:null,_mountCBs:[]}),mounted(){const n=this.$el,t=u(r(this.$props)),{grid:o,dataProvider:a}=this._createGrid(n,t);this.dataProvider=a,this.gridView=o,this.executeCB(),((e,i,s)=>{for(const[d,l]of Object.entries(s))d&&typeof l=="function"&&d.startsWith("on")&&(d==="onRowInserting"?e.onRowInserting=l:d==="onDataRowInserting"?i.onRowInserting=l:(e.hasOwnProperty(d)&&(e[d]=l),i.hasOwnProperty(d)&&(i[d]=l)))})(o,a,t),this._applyOptions(t),t.layout&&o.setColumnLayout(t.layout),this._doInitProc(o,t)},computed:{dataProvider:{get(){return r(this.$data.$dataProvider)},set(n){this.$dataProvider=n}},gridView:{get(){return r(this.$data.$gridView)},set(n){this.$gridView=n}}},unmounted(){const n=u(this.$props),t=u(this.$attrs,"on"),o=n.onDestroy||t.onDestroy;o&&o(this.gridView),this.gridView=this.gridView&&this.gridView.destroy(),this.dataProvider=this.dataProvider&&this.dataProvider.destroy()},watch:{gridProps:{handler(n,t){const o=m({},t,n);this.gridView&&o&&Object.keys(o).length>0&&this.gridView.setOptions(o)},deep:!0},disabled(n,t){this.gridView&&(this.gridView.disabled=n)},dataProps:{handler(n,t){const o=m({},t,n);this.dataProvider&&o&&Object.keys(o).length>0&&this.dataProvider.setOptions(o)},deep:!0},layout:{handler(n,t){this.gridView&&this.gridView.setColumnLayout(n)},deep:!0}},methods:{addCallback(n){this.$data._mountCBs.push(n),clearTimeout(this.$data._mountTimer);const t=this;this.$data._mountTimer=setTimeout(function(){t.executeCB()},20)},removeCallback(n){if(this.$data._mountCBs.indexOf(n)>=0){const t=this.$data._mountCBs.indexOf(n);this.$data._mountCBs.splice(t,1)}},executeCB(){if(this.gridView&&(clearTimeout(this._mountTimer),this.gridView&&this.gridView._view)){this.gridView.beginUpdate();try{this.dataProvider.beginUpdate();try{const n=this.$data._mountCBs.sort((t,o)=>(t.$mountSeq==null?-1:t.$mountSeq)-(o.$mountSeq==null?-1:o.$mountSeq));for(;n&&n.length;){const t=n.shift();t==null||t.call(this,this.gridView)}}finally{this.dataProvider.endUpdate()}}finally{this.gridView.endUpdate(!0),this.$data._mountTimer=null,this.$data._mountCBs=[]}}},_applyOptions(n){const t=this.gridView;if(t)for(let[o,a]of Object.entries(n))switch(o){case"gridProps":a&&this.gridView.setOptions(a);break;case"disabled":this.gridView&&(this.gridView.disabled=!!a);break;case"dataProps":a&&this.dataProvider.setOptions(a);break;case"layout":a&&this.gridView&&this.gridView.setColumnLayout(a);break;case"rowStyleCallback":t.setRowStyleCallback(a);break;case"cellStyleCallback":t.setCellStyleCallback(a)}this._doApplyOptions(n)},_createGrid:(n,t)=>({grid:null,dataProvider:null}),_doInitProc(n,t){const o=t.onInitialized;if(o){const a=o.constructor.name;a==="Function"?o(n):a==="AsyncFunction"&&Promise.resolve(o(n))}},_doApplyOptions(n){}},render(){var n;const t=i=>{const s=[];if(Array.isArray(i))for(let d of i)Array.isArray(d.children)?s.push(...t(d.children)):s.push(d);return s},o=[];for(let i of Object.keys(this.$slots)){let s=this.$slots[i];typeof s=="function"&&(s=s()),o.push(...t(s))}let a=0;for(let i=0;i<o.length;i++){const s=o[i];if(s.type instanceof Object&&s.type.hasOwnProperty("name")){const d=s.type.name;d&&/^RG.+Column$/.exec(d)&&(s.props=s.props||{},s.props&&((n=s.props).displayIndex??(n.displayIndex=a++)))}s.$mountSeq=i}const e=this.$attrs.style?this.$attrs.style:{width:"100%",height:"100%"};return $("div",{style:e},o)}}),E=p({name:"RealGridVue",extends:I(),props:{accessibility:Boolean,waiOptions:Object,onPageChanging:Function,onPageChanged:Function,onPageCountChanged:Function,onGrouping:Function,onGrouped:Function,onExpanding:Function,onExpanded:Function,onCollapsing:Function,onCollapsed:Function,onRowCountChanged:Function,onRowUpdating:Function,onRowUpdated:Function,onRowsUpdated:Function,onRowListUpdated:Function,onDataRowInserting:Function,onRowInserted:Function,onRowsInserted:Function,onRowDeleting:Function,onRowDeleted:Function,onRowsDeleted:Function,onRowMoving:Function,onRowMoved:Function,onRowsMoving:Function,onRowsMoved:Function,onRowListMoving:Function,onRowListMoved:Function,onValueChanged:Function,onDataChanged:Function,onRowStateChanged:Function,onRowStatesChanged:Function,onRowStatesCleared:Function,onRestoreRows:Function},data:()=>({$dataProvider:null,$gridView:null}),watch:{rows:{handler(n,t){var o;if(this.$data._mountTimer!=null){const a=()=>{f(()=>{var e;(e=this.dataProvider)==null||e.setRows(r(n))})};a.$mountSeq=1/0,this.addCallback(a)}else(o=this.dataProvider)==null||o.setRows(r(n))}}},methods:{_createGrid(n,t){var o;const a=new C.GridView(n,t==null?void 0:t.accessibility,t==null?void 0:t.waiOptions),e=new C.LocalDataProvider((o=t.dataProps)==null?void 0:o.undoable);return a.setDataSource(e),{grid:a,dataProvider:e}},_doApplyOptions(n){var t;for(const[o,a]of Object.entries(n))o==="rows"&&((t=this.dataProvider)==null||t.setRows(r(a)))}}}),A={class:"about"},D=R("h1",null,"This is an about page",-1),j=p({__name:"AboutView",setup(n){const t=g(),o=g(),a=g();let e;async function i(){return new Promise((d,l)=>{setTimeout(()=>{const c=[];for(let h=0;h<100;h++)c.push({text1:`text1 ${h}`,text2:`text2 ${h}`,text3:`text3 ${h}`,number:Math.round(Math.random()*1e6-1e6)/1e3});d(c)},1e3)})}function s(d,l,c){console.log("onCurrentChanged")}return v(()=>{var l,c;const d=[{fieldName:"text1",name:"text1"},{fieldName:"text2",name:"text2"},{field:{fieldName:"number",dataType:C.ValueType.NUMBER}},{fieldName:"text3"}];o.value=d,e=(l=t.value)==null?void 0:l.gridView,(c=t.value)==null||c.dataProvider,f(async()=>{e.showLoading(!0),a.value=await i(),e.closeLoading()})}),(d,l)=>(F(),w("div",A,[D,P(y(E),{ref_key:"gridRef",ref:t,style:{width:"100%",height:"400px"},"auto-generate-field":!0,rows:a.value,onCurrentRowChanged:s},{default:b(()=>[(F(!0),w(V,null,_(o.value,c=>(F(),k(y(B),x(O(c)),null,16))),256))]),_:1},8,["rows"])]))}});export{j as default};