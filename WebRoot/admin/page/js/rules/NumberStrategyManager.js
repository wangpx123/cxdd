/********************************************
号码规则

*********************************************/

Ext.define('NumberRules', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'name'},
        {name:'typeserail'},
        {name:'typeserialLen'},
        {name:'year'},
        {name:'yearLen'},
        {name:'month'},
        {name:'monthLen'},
        {name:'day'},
        {name:'dayLen'},
        {name:'num'},
		{name:'numberLen'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}
    ],
    idProperty: 'id'
});

Ext.define('Redm.rules.NumberRulesGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.numberRulesgrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
        	{ header: "名称", dataIndex: 'name', width: 100, sortable: true},
		    { header: "同类序号", dataIndex: 'typeserail', width: 100, sortable: true},
		    { header: "同类序号长度", dataIndex: 'typeserialLen', width: 100, sortable: true},
		    { header: "年份", dataIndex: 'year', width: 100, sortable: true},
		    { header: "年份长度", dataIndex: 'yearLen', width: 100, sortable: true},
		    { header: "月份", dataIndex: 'month', width: 100, sortable: true},
			{ header: "月份长度", dataIndex: 'monthLen', width: 100, sortable: true},
		    { header: "日期", dataIndex: 'day', width: 100, sortable: true},
		    { header: "日期长度", dataIndex: 'dayLen', width: 100, sortable: true},
			{ header: "流水号", dataIndex: 'num', width: 100, sortable: true},
		    { header: "流水号长度", dataIndex: 'numberLen', width: 100, sortable: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true},
			{ header: "id", dataIndex: 'id',hidden: true}			
	    ];
		return true;
    },
    buildDockedItems: function(){
		this.dockedItems = [
        {
	        xtype: 'pagingtoolbar',
	        store: this.store,   
	        dock: 'bottom',
	        displayInfo: true
	    }
        ];
    },
    initComponent: function(){
    	var me = this;
        this.buildStore(basePath + '/support/doQueryNumber.action','NumberRules',20);
    	this.callParent(arguments);
    }
});

Ext.define('Redm.rules.NumberStrategyManager',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.numberstrategymanager',
    title:'号码规则',
    layout: 'border',
    tabPosition: 'bottom',
	initComponent: function(){
		var me = this;
    	this.items = [this.createNIDPanel()];
        this.callParent(arguments);
	},
    
	createNIDPanel: function(){
		var me = this;
		this.nidpanel = Ext.create('Ext.panel.Panel',{
			title: '基本',
			layout: 'border',
			items:[this.createNumberRulesForm(),this.createNumberRulesGrid(),this.createDTopPanel()]
		});
		return this.nidpanel;
	},
    
	createDTopPanel: function(){
		this.dtoppanel = Ext.create('Ext.panel.Panel',{
			region: 'north',
			layout: 'border',
			height: 40,
			border: false,
			items: [this.createTopForm()]
		});
		return this.dtoppanel;
	},
	createTopForm: function(){
		this.topform = Ext.create('Ext.form.Panel',{
			region: 'center',
			height: 35,
			layout: 'hbox',
			frame: true,
			defaults: {
				xtype: 'textfield',
				margin: '5 0 0 5',
				labelWidth: 60
			},
			items:[
                {
                    fieldLabel: '名称',
					name: 'name',
					xtype:'codecombo',
					codeType:'NUMRULE'
                },
				{
					xtype:'button',
					iconCls: 'icon-create',
					text : '添加',
					handler: this.onAddNumber,
                    scope: this
				}, 
				{
					xtype: 'button',
                    iconCls: 'icon-save',
                    text: '保存',
                    scope: this,
                    handler: this.saveNumberRules
                },
				{
                    xtype: 'button',
                    iconCls: 'icon-search',
                    handler: this.onSelect,
                    scope: this,
                    text: '查询'
                },
                {
                    xtype: 'button',
                    scope: this,
					handler: this.onReset,
                    iconCls: 'icon-reset',
                    text: '重置'
                },
                {
					xtype: 'button',
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
					handler: this.onDelete,
                    scope: this
                }
            ]
		});
		return this.topform;
	},

	saveNumberRules: function(){
		var me = this;
		var numberRules = this.numberRulesform.getForm();
    	var numberRulesformValues = numberRules.getValues();
		if(!(numberRules.isValid())){
			return;
		}; 
		Ext.Ajax.request({
			url: basePath + '/support/doSaveNumberRules.action',
			params: {
				id: numberRulesformValues.id,
				name: numberRulesformValues.name,  
				typeserail:numberRulesformValues.typeserail,
				typeserialLen:numberRulesformValues.typeserialLen,
				year: numberRulesformValues.year,
				yearLen: numberRulesformValues.yearLen,
				month: numberRulesformValues.month,
				monthLen: numberRulesformValues.monthLen,
				day: numberRulesformValues.day,
				dayLen: numberRulesformValues.dayLen,
				num: numberRulesformValues.num,
				numberLen: numberRulesformValues.numberLen,
				addDate: numberRulesformValues.addDate,
				addWho: numberRulesformValues.addWho  
			},
			success: function(response)
            {
				var text = Ext.decode(response.responseText);
				var success = text.success;
				MessageBox.show(success, text.json.msg);
				//保存成功后，需要清空明细表
				if(true==success)
				{
                    me.numberRulesform.getForm().reset();
                    me.numberRulesgrid.getStore().load();
				} 
			}
		}); 
    },
	
	onSelect: function(){
    	this.numberRulesgrid.getStore().load();
    },
    
    //第一个tab页面重置按钮，清空查询条件
    onReset: function(){
    	this.topform.getForm().reset();
    },
	
	onAddNumber: function(){
    	this.numberRulesform.getForm().reset();
		this.numberRulesform.getForm().findField('name').readOnly=false;
		this.numberRulesform.getForm().findField('typeserail').readOnly=false;
		this.numberRulesform.getForm().findField('typeserialLen').readOnly=false;
		this.numberRulesform.getForm().findField('yearLen').readOnly=false;
		this.numberRulesform.getForm().findField('monthLen').readOnly=false;
        this.numberRulesform.getForm().findField('dayLen').readOnly=false;
		this.numberRulesform.getForm().findField('numberLen').readOnly=false;
    },
	
	onDelete: function(){
    	var me = this;
		var records = me.numberRulesgrid.getSelectionModel().getSelection();
		var id=records[0].data.id;
		var nameCode=records[0].data.name;
		var typeserail=records[0].data.typeserail;
		if(records == ""){
			MessageBox.error("错误提示","请选择要删除的数据！");
		 	return;
		} 
        else
        {
        	Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
    			function(btn){
    				if(btn == 'yes'){
						Ext.Ajax.request({
							url: basePath + '/support/doValidateNumber.action',     
							params: {
								name:nameCode,
								typeserail:typeserail
							},
							success: function(response){
								var text = Ext.decode(response.responseText);
								var success = text.success;
								if(true==success)
								{	
									if(0== text.json.data.length){
										Ext.Ajax.request({
											url: basePath + '/support/doDeleteNumberRule.action',
											params: {
												id: id
											},
											success: function(response){
												var text = Ext.decode(response.responseText);
												var success = text.success;
												MessageBox.show(success, text.json.msg);
												//只有删除成功，才清空相关的form和grid
												if(success==true)
												{
													me.numberRulesform.getForm().reset();
													me.numberRulesgrid.getStore().load();
												}
											}
										});
									}else{
										MessageBox.show(false,'该规则正在被使用，不能删除！');
									}
								} 
							}
						});
    				}
                }
			);  
    	}
    },
	
  	createNumberRulesGrid: function(){
		var me=this;
    	this.numberRulesgrid = Ext.create('widget.numberRulesgrid',{
    		region: 'center',
			listeners: {
				itemclick: function(grid,record){
					me.numberRulesform.getForm().loadRecord(record);
					var nameCode=record.data.name;
					var typeserail=record.data.typeserail;
					Ext.Ajax.request({
						url: basePath + '/support/doValidateNumber.action',     
						params: {
							name:nameCode,
							typeserail:typeserail
						},
						success: function(response){
							var text = Ext.decode(response.responseText);
							var success = text.success;
							if(true==success)
							{	
								if(0!= text.json.data.length)
                                {
									me.numberRulesform.getForm().findField('name').readOnly=true;
									me.numberRulesform.getForm().findField('typeserail').readOnly=true;
									me.numberRulesform.getForm().findField('typeserialLen').readOnly=true;
									me.numberRulesform.getForm().findField('yearLen').readOnly=true;
									me.numberRulesform.getForm().findField('monthLen').readOnly=true;
									me.numberRulesform.getForm().findField('dayLen').readOnly=true;
									me.numberRulesform.getForm().findField('numberLen').readOnly=true;
								}
							} 
						}
					}); 
				}
			}
    	});
		this.numberRulesgrid.getStore().on('beforeload',function(store){   //加载前的查询条件
    		var params = store.getProxy().extraParams;
    		var values = this.topform.getForm().getFieldValues();
    		var name = values.name;
    		delete params.name;
    		if(name) params.name = name;
    	},this);
    	return this.numberRulesgrid;
    },

	createNumberRulesForm: function(){
		var me=this;
		this.numberRulesform = Ext.create('Ext.form.Panel',{
			region: 'east',
			border: false,
			frame: true,
			width: 450,
			split:true,  
			collapsible: true,
			defaults: {
				xtype: 'fieldcontainer',
				margin: '5 0 0 5'
			},
			items: [
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        labelAlign: 'top',
                        margin: '5 0 0 5',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '名称',
							name: 'name',
							allowBlank:false,
							xtype:'codecombo',
							codeType:'NUMRULE',
                            allowBlank: false,
							listeners: {
                                blur: function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    var nameValue=txt.getValue();
                                    var typeserailValue=me.numberRulesform.getForm().findField('typeserail').getValue();
                                    if((null!=nameValue &&''!=nameValue )&&(''!=typeserailValue && null!=typeserailValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateName.action',
                                            params: {
                                                name:nameValue,
                                                typeserail:typeserailValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0!=text.json.data.length)
                                                {
                                                   MessageBox.show(false, '记录重复！');
                                                } 
                                            }
                                        })
                                    } 
                                    else
                                    {
                                        MessageBox.show(false, '请先输入名称和同类序号！');
                                    }
								}
                            }	
                        },
						{
							name: 'id',
							hidden:true
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        labelAlign: 'top',
                        margin: '5 0 0 5',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '同类序号',
							name: 'typeserail',
							allowBlank:false,
							value:'0',
							listeners: 
                            {
                                blur: function(txt){
                                    var typeserailValue=txt.getValue();
                                    var nameValue=me.numberRulesform.getForm().findField('name').getValue();
                                    if((null!=nameValue &&''!=nameValue )&&(''!=typeserailValue && null!=typeserailValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateName.action',
                                            params: {
                                                name:nameValue,
                                                typeserail:typeserailValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0!=text.json.data.length)
                                                {
                                                   MessageBox.show(false, '记录重复！');
                                                }
												else{
												} 
                                            }
                                        })
                                    } 
                                    else
                                    {
                                        MessageBox.show(false, '请先输入名称和同类序号！');
                                    }
								}
                            }
                        },
                        {
                            fieldLabel: '同类序号长度',
							name: 'typeserialLen',
                            allowBlank: false
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        labelAlign: 'top',
                        margin: '5 0 0 5',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '年份',
							name: 'year',
							readOnly:true
                        },
                        {
                            fieldLabel: '年份长度',
							name: 'yearLen',
							xtype:'combobox',
                            allowBlank: false,
							displayField: 'text',
                            valueField: 'value',
                            store:Ext.create('Ext.data.Store', 
                                {
                                    fields: ['text','value'],
                                    data: [{text:'0',value:'0'},{text:'2',value:'2'},{text:'4',value:'4'}]
                                }
                            ),
                            forceSelection: true,
							listeners:{
                                select:function(txt){
                                  var value=txt.getValue();
								  if(''!=value)
                                    {
                                       if(value==0){
											me.numberRulesform.getForm().findField('year').setValue('0');
									   }else if(value==2){
											me.numberRulesform.getForm().findField('year').setValue((Ext.util.Format.date(new Date(),"Y-m-d")).substring(2, 4));
									   }else if(value==4){
											me.numberRulesform.getForm().findField('year').setValue((Ext.util.Format.date(new Date(),"Y-m-d")).substring(0, 4));
									   }
                                    } 
                                }
                            }
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        labelAlign: 'top',
                        margin: '5 0 0 5',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '月份',
							name: 'month',
							readOnly:true
                        },
                        {
                            fieldLabel: '月份长度',
							name: 'monthLen',
							xtype:'combobox',
                            allowBlank: false,
							displayField: 'text',
                            valueField: 'value',
                            store:Ext.create('Ext.data.Store', 
                                {
                                    fields: ['text','value'],
                                    data: [{text:'0',value:'0'},{text:'2',value:'2'}]
                                }
                            ),
                            forceSelection: true,
							listeners:{
                                select:function(txt){
                                  var value=txt.getValue();
								  if(''!=value)
                                    {
                                       if(value==0){
											me.numberRulesform.getForm().findField('month').setValue('0');
									   }else if(value==2){
											me.numberRulesform.getForm().findField('month').setValue((Ext.util.Format.date(new Date(),"Y-m-d")).substring(5, 7));
									   }
                                    } 
                                }
                            }
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        labelAlign: 'top',
                        margin: '5 0 0 5',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '日期',
							name: 'day',
							readOnly:true
                        },
                        {
                            fieldLabel: '日期长度',
							name: 'dayLen',
							xtype:'combobox',
                            allowBlank: false,
							displayField: 'text',
                            valueField: 'value',
                            store:Ext.create('Ext.data.Store', 
                                {
                                    fields: ['text','value'],
                                    data: [{text:'0',value:'0'},{text:'2',value:'2'}]
                                }
                            ),
                            forceSelection: true,
							listeners:{
                                select:function(txt){
                                  var value=txt.getValue();
								  if(''!=value)
                                    {
                                       if(value==0){
											me.numberRulesform.getForm().findField('day').setValue('0');
									   }
                                       else if(value==2){
											me.numberRulesform.getForm().findField('day').setValue((Ext.util.Format.date(new Date(),"Y-m-d")).substring(8, 10));
									   }
                                    } 
                                }
                            }
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        labelAlign: 'top',
                        margin: '5 0 0 5',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '流水号',
							name: 'num',
							readOnly:true
                        },
                        {
                            fieldLabel: '流水号长度',
							name: 'numberLen',
							xtype:'combobox',
                            allowBlank: false,
							displayField: 'text',
                            valueField: 'value',
                            store:Ext.create('Ext.data.Store', 
                                {
                                    fields: ['text','value'],
                                    data: [{text:'4',value:'4'},{text:'6',value:'6'},{text:'8',value:'8'},{text:'10',value:'10'},{text:'12',value:'12'}]
                                }
                            ),
                            forceSelection: true,
							listeners:{
                                select:function(txt){
                                  var value=txt.getValue();
								  if(''!=value)
                                    {
                                       if(value==4){
											me.numberRulesform.getForm().findField('num').setValue('0000');
									   }else if(value==6){
											me.numberRulesform.getForm().findField('num').setValue('000000');
									   }else if(value==8){
											me.numberRulesform.getForm().findField('num').setValue('00000000');
									   }else if(value==10){
											me.numberRulesform.getForm().findField('num').setValue('0000000000');
									   }else if(value==12){
											me.numberRulesform.getForm().findField('num').setValue('000000000000');
									   }
                                    } 
                                }
                            }
                        },
						{
                            xtype:'datefield',    //隐藏字段，放置存盘被清空
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden:true
                        },
                        {
                            xtype:'textfield',    //隐藏字段，放置存盘被清空
                            name: 'addWho',
                            hidden:true
                        }   
                    ]
                }
            ]
		});
		return this.numberRulesform;
	}
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'numberstrategymanager',
	    	region:'center'
	    }]
	});
});