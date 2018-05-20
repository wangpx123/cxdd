
Ext.define('Redm.commons.StorersCombox', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.storerscombo'],
    queryMode: 'local',
	editable: false,
    displayField: 'storerKey',
    valueField: 'storerKey',
    initComponent: function(){
    	this.store = this.buildStore(this.storerType || this.fieldLabel)
        this.callParent(arguments);
    },
    buildStore: function(storerType){
    	var store = new Ext.data.Store({
		    fields: ['storerKey','storerKey'],
		    autoLoad: this.autoLoad || true,
		    proxy: {
		        type: 'ajax',
		        extraParams: {type:storerType},
		        actionMethods: { read: 'POST' },
		        //url : Syscfg.getCfg('appPath') + '/basicdata/queryStorers.action',
		        reader: {type: 'json',root: 'json.data'}
		    }
		});
		return store;
    }
});
Ext.define('Redm.view.warehouse.PurchaseOrderManager', {
    extend: 'Redm.BaseTab',
    alias : 'widget.purchaseordermanager',
    buildTabList: function(){
    	var listFormConfig = {
    		height:100,
    		items : [{
                items: [{
                	xtype: 'storercombo',
                	name:'storerKey',
                	fieldLabel:'货主',
                	labelWidth : 80,
                	width:180
                },{
                    name: 'poKey',
                    fieldLabel: '订单号',
                	labelWidth : 80,
                	width:180
                },{
                	xtype:'codecombo',
                	listname:'POSTATUS',
                    name: 'status',
                    fieldLabel: '状态',
                	labelWidth : 80,
                	width:180
                },{
                	xtype:'datefield',
                    name: 'poDateStr',
                    fieldLabel: '采购日期',
                    format:'Y-m-d H:i',
                	labelWidth : 80,
                	width:210
                },{
                    xtype:'datefield',
                    name: 'poDateEnd',
                    format:'Y-m-d H:i',
                	width:130
                }]
            },{
            	items: [{
            		xtype:'codecombo',
                	listname:'POTYPE',
                	value:'0',
                    name: 'poType',
                    fieldLabel: '订单类型',
                	labelWidth : 80,
                	width:180
                },{
                    name: 'sellersReference',
                    fieldLabel: '销售商参考号',
                	labelWidth : 80,
                	width:180
                },{
                    name: 'buyersReference',
                    fieldLabel: '采购商参考号',
                	labelWidth : 80,
                	width:180
                },{
                    name: 'otherReference',
                    fieldLabel: '其他参考号',
                	labelWidth : 80,
                	width:180
                },{
                    name: 'vendorReference',
                    fieldLabel: '供应商参考号',
                    hidden:true,
                	labelWidth : 80,
                	width:180
                }]
            },{
                items: [{
                    name: 'proNumber',
                    fieldLabel: 'Pro Number',
                    hidden:true,
                	labelWidth : 80,
                	width:180
                }]
            }]
    	};
    	
    	var listGridConfig = {
    		store: Ext.create('Ext.data.Store', {
    			autoLoad: false,
    			remoteSort: true,
		        fields: [
					{name: 'id'},
					{name: 'poKey'},
					{name: 'storerKey'},
					{name: 'poDate'},
					{name: 'sellersReference'},
					{name: 'buyersReference'},
					{name: 'otherReference'},
					{name: 'poType'},
					{name: 'poTypeText'},
					{name: 'sellerKey'},
					{name: 'sellerName'},
					{name: 'sellerAddress1'},
					{name: 'sellerVat'},
					{name: 'sellerPhone'},
					{name: 'sellerMobile'},
					{name: 'buyerName'},
					{name: 'buyerAddress1'},
					{name: 'buyerVat'},
					{name: 'loadingDate',type:'date',dateFormat : 'Y-m-d H:i:s'},
					{name: 'placeOfLoading'},
					{name: 'placeOfDischarge'},
					{name: 'placeofDelivery'},
					{name: 'status'},
					{name: 'statusText'},
					{name: 'notes'},
					{name: 'susr1'},
					{name: 'susr2'},
					{name: 'susr3'},
					{name: 'susr4'},
					{name: 'susr5'},
					{name: 'consigneeKey'},
					{name: 'ckContact'},
					{name: 'ckCompany'},
					{name: 'ckAddress'},
					{name: 'ckPhone'},
					{name: 'buyerMobile'},
					{name: 'carrierKey'},
					{name: 'carrierName'},
					{name: 'carrierAddress1'},
					{name: 'pmtterm'},
					{name: 'incoTerms'}
				],
				proxy: {
		            type: 'ajax',
		            url: 'queryPurchaseOrders.action',
		            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
		            actionMethods: { read: 'POST' },
		            simpleSortMode: true
		        },
		        sorters:[{property :'poKey',direction:'DESC'}]
		    }),
	        columns: [
	       		{ header: "货主", dataIndex: 'storerKey', width: 140, sortable: true},
			    { header: "订单号", dataIndex: 'poKey', width: 140, sortable: true},
			    { header: "状态", dataIndex: 'statusText', width: 120, sortable: true},
			    { header: "订单类型", dataIndex: 'poTypeText', width: 120, sortable: true},
			    { header: "订购日期", dataIndex: 'poDate', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
			    { header: "销售商参考号", dataIndex: 'sellersReference', width: 100, sortable: true},
			    { header: "采购商参考号", dataIndex: 'buyersReference', width: 100, sortable: true},
			    { header: "其他参考号", dataIndex: 'otherReference', width: 110, sortable: true},
			    { header: "Place of Loading", dataIndex: 'placeOfLoading', width: 110, sortable: true},
			    { header: "Place of Delivery", dataIndex: 'placeofDelivery', width: 110, sortable: true}
			]
    	}
    	
		return this.createListTab(listFormConfig,listGridConfig);
	},
	buildTabDetail: function(){
		var me = this;
		var detailFormConfig = {
			actionUrl:'savePo.action',
			orderNo:'poKey',
			items : [{
				xtype: 'container',
				layout: 'vbox',
				items:[{
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						width: 140,
						labelAlign: 'top',
						xtype: 'textfield',
						margin: '5 0 0 5'
					},
					items:[
						{xtype: 'textfield', fieldLabel: 'PO号', name: 'poKey', margin: '5 0 0 10'},
						{xtype: 'codecombo', fieldLabel: '状态', name: 'status',value: '0',listname: 'POSTATUS'},
						{xtype: 'codecombo', fieldLabel: '类型', name: 'poType',value: '0', listname: 'POTYPE',width: 115},
						{
							name: 'poDate',
							xtype: 'datefield', 
							fieldLabel: '订单日期',
							labelWidth: 60,
							width: 150,
							format:'Y-m-d H:i:s',
	    					value:Ext.Date.parse(Ext.Date.format(new Date(), 'Y-m-d 00:00:00'),'Y-m-d H:i:s')
    					},
    					{xtype: 'textfield',fieldLabel: '采购参考号',name: 'buyersReference',width: 120},
						{xtype: 'textfield',fieldLabel: '供应商参考号',labelWidth: 80,name: 'sellersReference',width: 120},
						{xtype: 'textfield',fieldLabel: '其他参考号',name: 'otherReference',width: 120}
    					]
				},{
					xtype: 'container',
					layout: 'hbox',
					margin: '5 0 0 0',
					items: [{
						xtype: 'fieldset',
						width: 310,
						autoHeight: true,
						title: '货主',
						layout: 'vbox',
						items: [
							{
								xtype: 'container',
								width: 500,
								layout: 'hbox',
								defaults: {
									width: 140
								},
								items: [{
										xtype: 'storerscombo',
										name: 'storerKey',
										storerType: '1',
										allowBlank: false,
										listeners: {
											change: function(){
												Ext.Ajax.request({
												    url: 'queryStorerByKey.action',
												    params: {
												        storerKey: this.getValue()
												    },
												    success: function(response){
												        var data = Ext.decode(response.responseText);
												        var address = data.json.address;
												        var contact = data.json.contact;
												        var mobile = data.json.mobile;
												        var phone = data.json.phone;
												        var company = data.json.company;
												        var df = me.detailform.getForm();
												       	df.findField('buyerAddress1').setValue(address);
												       	df.findField('buyerPhone').setValue(phone);
												       	df.findField('buyerContact').setValue(contact);
												       	df.findField('buyerMobile').setValue(mobile);
												       	df.findField('buyerName').setValue(company);
												    }
												});
											}
										}
									},
									{xtype: 'textfield',name: 'buyerContact'}
								]
							},
							{xtype: 'textfield',width: 284,name: 'buyerName'},
							{xtype: 'textfield',width: 284,name: 'buyerAddress1'},
							{
								xtype: 'container',
								width:  500,
								layout: 'hbox',
								defaults: {
									width: 140
								},
								items: [
									{xtype: 'textfield',name: 'buyerPhone'},
									{xtype: 'textfield',name: 'buyerMobile'}
								]
							}
						]
					},{
						xtype: 'fieldset',
						layout: 'vbox',
						title: '供应商',
						margin: '0 0 0 15',
						width: 310,
						autoHeight: true,
						items: [{
								xtype: 'container',
								width: 400,
								layout: 'hbox',
								defaults: {
									width: 140,
									readOnly: true
								},
								items: [{
										xtype: 'storerscombo',
										name: 'sellerKey',
										storerType: '5',
										readOnly: false,
										listeners: {
											change: function(){
												Ext.Ajax.request({
												    url: 'queryStorerByKey.action',
												    params: {
												        storerKey: this.getValue()
												    },
												    success: function(response){
												        var data = Ext.decode(response.responseText);
												        var address = data.json.address;
												        var contact = data.json.contact;
												        var mobile = data.json.mobile;
												        var phone = data.json.phone;
												        var company = data.json.company;
												        var df = me.detailform.getForm();
												       	df.findField('sellerAddress1').setValue(address);
												       	df.findField('sellerPhone').setValue(phone);
												       	df.findField('sellContact').setValue(contact);
												       	df.findField('sellerMobile').setValue(mobile);
												       	df.findField('sellerName').setValue(company);
												    }
												});
											}
										}
									},
									{xtype: 'textfield', name: 'sellContact'}
								]
							},
							{xtype: 'textfield',width: 284, name: 'sellerName'},
							{xtype: 'textfield',width: 284, name: 'sellerAddress1'},
							{
								xtype: 'container',
								width: 400,
								layout: 'hbox',
								defaults: {
									width: 140,
									readOnly: true
								},
								items: [
									{xtype: 'textfield',name: 'sellerPhone'},
									{xtype: 'textfield',name: 'sellerMobile'}
								]
							}
						]
					},{
					xtype: 'fieldset',
					layout: 'vbox',
					title: '运输到',
					margin: '0 0 0 15',
					autoWidth: true,
					autoHeight: true,
					items: [{
							xtype: 'container',
							width: 300,
							layout: 'hbox',
							defaults: {
								width: 140
							},
							items: [{
									xtype: 'storerscombo',
									name: 'consigneeKey',
									storerType: '',
									listeners: {
										change: function(){
											Ext.Ajax.request({
											    url: 'queryStorerByKey.action',
											    params: {
											        storerKey: this.getValue()
											    },
											    success: function(response){
											        var data = Ext.decode(response.responseText);
											        var address = data.json.address;
											        var contact = data.json.contact;
											        var mobile = data.json.mobile;
											        var phone = data.json.phone;
											        var company = data.json.phone;
											        var df = me.detailform.getForm();
											       	df.findField('ckAddress').setValue(address);
											       	df.findField('ckPhone').setValue(phone);
											       	df.findField('ckContact').setValue(contact);
											       	df.findField('ckMobile').setValue(mobile);
											       	df.findField('ckCompany').setValue(company);
											    }
											});
										}
									}
								},
								{xtype: 'textfield', name: 'ckContact'}
							]
						},
						{xtype: 'textfield',width: 284, name: 'ckCompany'},
						{xtype: 'textfield',width: 284, name: 'ckAddress'},
						{
							xtype: 'container',
							width: 300,
							defaults: {
								width: 140
							},
							layout: 'hbox',
							items: [
								{xtype: 'textfield',name: 'ckPhone'},
								{xtype: 'textfield',name: 'ckMobile'}
							]
						}]
				
					}]
				},{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'container',
						layout: 'vbox',
						items: [{
							xtype: 'container',
							layout: 'hbox',
							defaults:{
								xtype: 'textfield',
								labelAlign: 'top',
								width: 155
							},
							items: [{
				                    name: 'vesselDate',
				                    xtype:'datefield',
				                	format:'Y-m-d H:i:s',
			    					value:Ext.Date.parse(Ext.Date.format(new Date(), 'Y-m-d 00:00:00'),'Y-m-d H:i:s'),
				                	margin: '5 0 0 0',
				                	fieldLabel: '装车日期'
				                },{
				                    name: 'placeOfLoading',
				                    margin: '5 0 0 5',
				                    fieldLabel: '装车地点'
				                },{
				                    name: 'pmtterm',
				                    margin: '5 0 0 5',
				                    xtype: 'codecombo',
				                    listname: 'PMTTERM',
				                    value: '',
				                    fieldLabel: '支付方式'
				                },{
				                    name: 'incoTerms',
				                    margin: '5 0 0 5',
				                    xtype: 'codecombo',
				                    listname: 'INCOTERMS',
				                    value: '',
				                    fieldLabel: '交货方式'
				                }]
							},{
								xtype: 'container',
								layout: 'hbox',
								defaults:{
									xtype: 'textfield',
									labelAlign: 'top',
									width: 155
								},
								 items: [{
				                    name: 'placeOfDischarge',
				                    margin: '5 0 0 0',
				                    fieldLabel: '卸货地点',
				                    width: 155
				                },{
				                    name: 'placeofDelivery',
				                    margin: '5 0 0 5',
				                    fieldLabel: '交货地点',
				                    width: 155
				                },{
				                    name: 'notes',
				                    margin: '5 0 0 5',
				                    fieldLabel: '备注',
				                    width: 315
				                }]
						}]
					},{
						xtype: 'fieldset',
						title: '承运商',
						width:310,
						margin: '0 0 0 15',
						autoHeight: true,
						layout: 'vbox',
						items: [{
								xtype: 'container',
								width: 500,
								layout: 'hbox',
								defaults: {
									width: 140
								},
								items: [{
									xtype: 'storerscombo',
									name: 'carrierKey', 
									storerType:'3',
									listeners: {
										change: function(){
											Ext.Ajax.request({
											    url: 'queryStorerByKey.action',
											    params: {
											        storerKey: this.getValue()
											    },
											    success: function(response){
											        var data = Ext.decode(response.responseText);
											        var address = data.json.address;
											        var company = data.json.company;
											        var df = me.detailform.getForm();
											       	df.findField('carrierAddress1').setValue(address);
											       	df.findField('carrierName').setValue(company);
											    }
											});
										}
									}
								},
								{xtype: 'textfield',name: 'carrierName'}
								]
							},
							{xtype: 'textfield',width: 284,name: 'carrierAddress1'}
						]
					}]
				}]
			},{
				xtype: 'container',
				layout: 'hbox',
				defaults:{
					xtype: 'textfield',
					labelAlign: 'top',
					width: 185
				},
				items: [{
                    name: 'susr1',
                    margin: '5 0 0 5',
                    fieldLabel: '自定义1'
                },{
                    name: 'susr2',
                    margin: '5 0 0 5',
                    fieldLabel: '自定义2'
                },{
                    name: 'susr3',
                    margin: '5 0 0 5',
                    fieldLabel: '自定义3'
                },{
                    name: 'susr4',
                    margin: '5 0 0 5',
                    fieldLabel: '自定义4'
                },{
                    name: 'susr5',
                    margin: '5 0 0 5',
                    fieldLabel: '自定义5'
                }]
			
			}],
			listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	this.createDetailformContextMenu(e);
	                },this)
	            },scope:this
	        }
		};
		
		
		Ext.define('Podetail', {
		    extend: 'Ext.data.Model',
		    fields: [
	           {name: 'id'},
	           {name: 'poKey'},
	           {name: 'poLineNumber'},
	           {name: 'sku'},
	           {name: 'storerKey'},
	           {name: 'skuDescription'},
	           {name: 'qtyOrdered',type: 'float'},
	           {name: 'qtyReceived',type: 'float'},
	           {name: 'packKey'},
	           {name: 'uom'},
			   {name: 'uomScale',type:'int',defaultValue:'1'},
	           {name: 'unitPrice'},
	           {name: 'notes'},
	           {name: 'susr1'},
	           {name: 'susr2'},
	           {name: 'susr3'},
	           {name: 'susr4'},
	           {name: 'susr5'},
	           {name: 'addDate'},
			   {name: 'addWho'},
			   {name: 'editDate'},
			   {name: 'editWho'}
		    ],
		    validations: [
		        {type: 'presence',  field: 'sku'},
		        {type: 'presence',  field: 'skuDescription'},
		        {type: 'presence',  field: 'packKey'}
//		        {type: 'presence',  field: 'uom'},
//		        {type: 'format',  field: 'qtyOrdered', matcher: /[1-9][0-9]*/}
		    ],
		    formatations: [
		    	{type: 'index',  field: 'poLineNumber'}
		    ]
		});
		
	    var celledit = Ext.create('Ext.grid.plugin.CellEditing',{
	    	clicksToEdit: 1,
	    	listeners :{
	    		'beforeedit':function(e)
	    		{
	    			var rec = e.record;
//	    			if(e.field=='uom')
//	    			{
//	    				//uomColumn.beforeedit(rec);
//	    			}
	    			
	    			//商品选择前根据货主过滤
	    			if(e.field=='sku'){
	    				var formstorerkey = this.detailform.getForm().findField('storerKey').getValue();
	    				if(formstorerkey!=''){
	    					if(proStore.getProxy().extraParams.storerKey!=formstorerkey){
		    					proStore.load({params:{storerKey:formstorerkey}});
	    					}
		    				proStore.getProxy().extraParams = {storerKey:formstorerkey};
	    				}
	    			}
	    		},scope:this,
	    		edit:function(editor,e)
	    		{
	    			var rec = e.record;
	    			if(e.field =='qtyReceived')
	    			{
	    				if(e.value >rec.data.qtyExpected)
	    				{
	    					Ext.Msg.alert("提示信息","实收数量不能大于预期数量!");
	    					rec.set(e.field,e.originalValue);
	    				}
	    			}
	    			if(e.field =='packKey'&&e.value!=e.originalValue)
	    			{
	    				var packminuom = rec.data.packuom1;//包装的最小单位
		    			rec.set('uom',packminuom);
	    			}
	    			
//	    			if(e.field =='uom'&&e.value!=e.originalValue)
//	    			{
//	    				var qtyDatas = [{name:'qtyOrdered'},{name:'qtyReceived'}];
//	    				//uomColumn.edit(rec,e,qtyDatas);
//	    			}
	    		}
	    	}
	    });
		
//	    var packStore = Ext.create('Ext.data.Store', {
//	        autoLoad: true,
//        	fields: [
//				{name:'packKey'},
//				{name:'packuom1'},
//				{name:'qty'},
//				{name:'packuom2'},
//				{name:'casecnt'},
//				{name:'packuom3'},
//				{name:'innerpack'},
//				{name:'packuom4'},
//				{name:'pallet'},
//				{name:'uomScale',defaultValue:'1'}
//			],
//	        proxy: {
//	            type: 'ajax',
//	            url: Syscfg.getCfg('appPath') + '/basicdata/queryPacks.action',
//	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
//	            actionMethods: { read: 'POST' },
//	            simpleSortMode: true
//	        }
//	    });
	    
	    //var uomColumn = new Ext.util.Uom(packStore);
	    
	    var proStore = Ext.create('Ext.data.Store', {
	        autoLoad: false,
        	fields: [
        	    {name: 'id'},
				{name:'storerKey'},
				{name:'sku'}, 
				{name:'descr'}, 
				{name:'skuDescription',mapping:'descr'}, 
				{name:'packKey'},
				{name:'packMinUom'},
				{name:'uom',mapping:'packMinUom'},
				{name:'uomScale',defaultValue:'1'}
			],
	        proxy: {
	            type: 'ajax',
//	            url: Syscfg.getCfg('appPath') + '/basicdata/querySkus.action',
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        }
	    })
	    
		var detailGridConfig = {
			height: 250,
			plugins: [celledit],
			store: Ext.create('Ext.data.Store', {
		        model:'Podetail',
		        proxy: {
		            type: 'ajax',
		            url: 'queryPodetails.action',
		            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
		            actionMethods: { read: 'POST' },
		            simpleSortMode: true
		        },
		        sorters:[{property :'poLineNumber',direction:'ASC'}]
		    }),
	        columns: [{
		            dataIndex:'poLineNumber',
		            header: "Line #",
		            width: 140,
		            sortable: false
		        },{ header: "商品 *", dataIndex: 'sku', width: 140, sortable: false,
                  	editor: {
		                xtype: 'skucombo'
					    
					}
                },{ header: "名称 *", dataIndex: 'skuDescription', width: 140,
	              	editor: {xtype: 'textfield'}
	            },{ header: "包装 *", dataIndex: 'packKey', width: 140, sortable: false,
	            	editor:{
			            xtype: 'packcombo',
					    allowBlank: false
					}
				},
//	            { 
//	            	header: "单位 *", 
//	            	dataIndex: 'uom', 
//	            	flex: 1, 
//	            	sortable: false,
//	            	editor: {
//        				xtype:'combobox',
//			            store:uomColumn.uomStore,
//					    queryMode: 'local',
//					    displayField: 'value',
//					    valueField: 'value',
//					    allowBlank: false
//					}
//				},
	            { header: "订货数量 *", dataIndex: 'qtyOrdered', width: 140,editor:{xtype:'numberfield',minValue:0,decimalPrecision:0}},
	            { header: "单价", dataIndex: 'unitPrice', width: 140,editor:{xtype:'numberfield',minValue:0,decimalPrecision:2}},
	            { header: "已收数量", dataIndex: 'qtyReceived', width: 140},
	            { header: "自定义1", dataIndex: 'susr1', width: 140, editor:{xtype:'textfield'}},
	            { header: "自定义2", dataIndex: 'susr2', width: 140, editor:{xtype:'textfield'}},
	            { header: "自定义3", dataIndex: 'susr3', width: 140, editor:{xtype:'textfield'}},
	            { header: "自定义4", dataIndex: 'susr4', width: 140, editor:{xtype:'textfield'}},
	            { header: "自定义5", dataIndex: 'susr5', width: 140, editor:{xtype:'textfield'}},
	            { header: "id", dataIndex: 'id', width: 0, editor:{xtype:'hidden'}}
	        ]
		};
		
		return this.createDetailTab(detailFormConfig,detailGridConfig);
	},
	onDeleteClick: function(){
		var lsg = this.listgrid;
        var selection = lsg.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.deleteInfo(selection.data.id,"deletePo.action",this);
        }
    },
    onDeleteDetailClick: function(){
		var dsg = this.detailgrid
        var selection = dsg.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.deleteDetailInfo(selection.data.id,"deletePoDetail.action");
        }
        this.detailgrid.getStore().load();
    },
    setOrderNo: function(){
    	var me = this;
    	if(me.detailform.form.findField('poKey').getValue()=='')
    	{
	    	Ext.Ajax.request({
			    url: "findNextPoKey.action",
			    success: function(response){
			        var data = Ext.decode(response.responseText);
			        me.detailform.form.setValues({poKey:data.json.orderNo});
			    },
			    failure: function(response, opts) {
			    	var data = Ext.decode(response.responseText);
			    }
			});
    	}
    },
    changeMenuDisable:function(){
    	//右键菜单控制
    	//var status = this.detailform.getForm().findField('status').getValue()||'';
    	var id = this.detailform.getForm().findField('id').getValue()||'';
    	if(id==''||status=='1'){
    		this.createAction.enable();
    		this.addAction.enable();
	        this.deleteAction.enable();
    	}else if(status=='9'||status=='0'){
    		this.createAction.disable();
    		
    		this.addAction.disable();
	        this.deleteAction.disable();
    	}
    },
    createDetailformContextMenu:function(e){
    	if(!this.formContextMenu)
    	{
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createNewAction,
					this.createAction,
					this.cancelAction
				]
			});
    	}
		
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    }
});

Ext.onReady(function(){
    new Ext.LoadMask('loading-mask', {msg:"打开中，请稍候..."});
    Ext.QuickTips.init();
    
    Ext.widget('viewport', {
    	id : 'viewportName',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [Ext.widget('purchaseordermanager')]
    });
    setTimeout(function() {
		Ext.get('loading-mask').fadeOut({remove : true});
	}, 300);
});