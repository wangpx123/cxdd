/***************************************
密码修改 password.js

****************************************/

Ext.define('Redm.support.Password', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.passwordmanager',
    layout:'border',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createTopPanel()];
        this.callParent(arguments);
    },
    onReset: function(){
    	this.pwform.getForm().reset();
    },


    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		height: 100,
    		border: false,
    		items:[this.createPwForm()]
    	});
    	return this.toppanel;
    },

    //顶部查询面板
    createPwForm: function(){
    	var me = this;
    	this.pwform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		layout: 'vbox',
    		border: false,
    		height: 300,
			frame : true,
			autoScroll :true,
			resizable: true,
			collapsible : true,
			layout: 'anchor',
			buttonAlign:'left',  
            
            //以下是每个item的公共属性
            defaults: {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                width:260,
                defaults: {
					margins: '0 2 0 6'
                }
            },
    		items:[
                {
                    xtype: 'textfield',
                    width:240,
                    labelWidth: 100,
                    name: 'oldPass',
                    fieldLabel: '原密码',
                    margin:'30 0 0 40',
                    inputType: 'password'
                },
                {
                    xtype: 'textfield',
                    width:240,
                    name: 'newPass1',
                    labelWidth: 100,
                    fieldLabel: '新密码',
                    margin:'10 0 0 40',
                    inputType: 'password',
                    id:'pass'
                },
                {
                    xtype: 'textfield',
                    width:240,
                    name: 'newPass2',
                    labelWidth: 100,
                    fieldLabel: '确认新密码',
                    margin:'10 0 0 40',
                    inputType: 'password',
                    VTypes:'password',     //不起作用 qxue 
                    initialPassField:'pass' // id of the initial password field
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'button',
                        width: 80,
                        margin:'10 0 0 40'
                    },
                    items: [
                        {
                            handler: me.savePassword,
                            scope: this,
                            iconCls: 'icon-edit',
                            text: '修改'
                        },
                        {
                            handler: me.onReset,
                            scope: this,
                            iconCls: 'icon-reset',
                            text: '重置'
                        }
                    ]
                }
            ]
    	});
    	return this.pwform;
    },

	savePassword: function(){
    	var me = this;
    	var pw = this.pwform.getForm();
    	var pwvalues = pw.getValues();
        
    	if(!(pw.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/system/doUpdatePass.action',
		    params: {
		        oldPass: pwvalues.oldPass,
		        newPass1: pwvalues.newPass1,
                newPass2: pwvalues.newPass2
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                if(true==success)
                {
                    me.pwform.getForm().reset();
                }
		    }
		});
    }
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'passwordmanager',
	    	region:'center'
	    }]
	});
});