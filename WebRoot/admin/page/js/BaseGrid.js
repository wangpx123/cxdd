appPath = basePath ;//|| 'http://www.hong56.com';


//快捷键
Ext.ux.ToolbarKeyMap = Ext.extend(Object, (function() {
    var kb,
        owner,
        mappings;
 
    function addKeyBinding(c) {
        if (kb = c.keyBinding) {
            delete c.keyBinding;
            if (!kb.fn && c.handler) {
                kb.fn = function(k, e) {
                    e.preventDefault();
                    e.stopEvent();
                    c.handler.call(c.scope, c, e);
                }
            }
            mappings.push(kb);
            var t = [];
            if (kb.ctrl) t.push('Ctrl');
            if (kb.alt) t.push('Alt');
            if (kb.shift) t.push('Shift');
            t.push(kb.key.toUpperCase());
            c.hotKey = t.join('+');
            c.showHotKey = kb.showHotKey;
            if (c instanceof Ext.menu.Item) {
			    c.onRender = Ext.Function.createSequence(c.onRender,addMenuItemHotKey);
            } else if ((c instanceof Ext.Button) && (c.showHotKey)) {
                c.onRender = Ext.Function.createSequence(c.onRender,addButtonHotKey);
            }
        }
        if ((c instanceof Ext.Button) && c.menu) {
            c.menu.cascade(addKeyBinding);
        }
    }
 
    function findKeyNavs() {
        delete this.onRender;
        if (owner = this.ownerCt) {
            mappings = [];
            this.cascade(addKeyBinding);
             if (!owner.menuKeyMap) {
                owner.menuKeyMap = new Ext.KeyMap(owner.el, mappings);
                owner.el.dom.tabIndex = 0;
            } else {
                owner.menuKeyMap.addBinding(mappings);
            }
        }
    }
 
    function addMenuItemHotKey() {
        delete this.onRender;
        if((this.showHotKey!=null)&&(this.showHotKey == false))
           return;
 
        this.el.child('.x-menu-item-link').setStyle({
            overflow: 'hidden',
            zoom: 1
        });
 
        this.el.child('.x-menu-item-link').child('.x-menu-item-text').setStyle({
                  'float': 'left'
                  });
 
        this.el.child('.x-menu-item-link').createChild({
            style: {
                padding: '0px 0px 0px 15px',
                float: 'right'
            },
            html: this.hotKey
        });
    }
 
    function addButtonHotKey() {
        delete this.onRender;
        if((this.showHotKey!=null)&&(this.showHotKey == false))
           return;
        var p = this.btnEl.up('');
        p.setStyle({
            overflow: 'hidden',
            zoom: 1
        });
		if(p.up('td')!=null)
           p.up('td').setStyle('text-align', 'left');
        this.btnEl.setStyle('.x-menu-item-text').setStyle({
            'float': 'left'
        });
        p = p.createChild({
                style: {
                padding: '0px 0px 0px 15px',
                float: 'right',
                position: 'relative',
                bottom: Ext.isWebKit ? '-1px' : '-2px'
            },
            html: this.hotKey
        });
    }
 
    return {
        init: function(toolbar) {
		 	toolbar.onRender = Ext.Function.createSequence(toolbar.onRender,findKeyNavs);
			toolbar.doLayout = Ext.Function.createSequence(toolbar.doLayout,findKeyNavs);
 
        }
    }
})());

/**
 * 常用的公共下拉或自定义控件
 */
//货主下拉(已用)
Ext.define('Redm.form.StorerComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.storercombo',
	queryMode: 'local',
	editable: false,
	fieldLabel: '货主',
	value:'',
    displayField: 'storerKey',
    valueField: 'storerKey',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'storerKey'},
			{name:'storerKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryStorers.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//货主下拉(只能查货主类型的combo)
Ext.define('Redm.form.Storer2ComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.storer2combo',
	queryMode: 'local',
	editable: false,
	fieldLabel: '货主',
	value:'',
    displayField: 'storerKey',
    valueField: 'storerKey',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'storerKey'},
			{name:'storerKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryStorersCombo.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//商品类型下拉
Ext.define('Redm.form.SkuTypeComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.skuTypecombo',
	queryMode: 'local',
	editable: false,
	fieldLabel: '商品类型',
	value:'',
    displayField: 'skuType',
    valueField: 'skuType',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'skuType'},
			{name:'skuType'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQuerySkuType.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//批校验下拉  已经有了， 重复
/*
Ext.define('Redm.view.form.LotVaComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.lotvacombo',
	value: '',
	queryMode: 'local',
	name: 'lottableValidationKey',
    displayField: 'lottableValidationKey',
    valueField: 'lottableValidationKey',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'lottableValidationKey'},
			{name:'lottableValidationKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/queryLotValidate.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});*/

//国家下拉(已用)
Ext.define('Redm.form.NationComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.nationcombo',
	queryMode: 'local',
	name: 'nationKey',
	value:'',
    displayField: 'descr',
    valueField: 'descr',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'descr'},
			{name:'nationKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryNation.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//省份下拉(已用)
Ext.define('Redm.form.ProvinceComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.provincecombo',
	queryMode: 'local',
	name: 'provinceKey',
	value:'',
    displayField: 'descr',
    valueField: 'descr',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'descr'},
			{name:'descr'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryProvince.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//城市下拉(已用)
Ext.define('Redm.form.CityComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.citycombo',
	queryMode: 'local',
	name: 'cityKey',
	value:'',
    displayField: 'cdescr',
    valueField: 'cdescr',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'descr'},
			{name:'descr'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryCity.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//包装下拉(已用)
Ext.define('Redm.form.PackComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.packcombo',
	queryMode: 'local',
	name: 'packKey',
	value:'',
    displayField: 'packKey',
    valueField: 'packKey',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'packKey'},
			{name:'packKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryPacks.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//(回单设置)物流公司(已用)
Ext.define('Redm.form.LogisticsCompanyComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.logisticscompanycombo',
	queryMode: 'local',
	name: 'logisticsCompany',
	value:'',
    displayField: 'logisticsCompany',
    valueField: 'logisticsCompany',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'logisticsCompany'},
			{name:'logisticsCompany'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/backmenu/doQuerylogisticsCompanyCombo.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//商品下拉(已用)
Ext.define('Redm.view.form.SkuComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.skucombo',
	value: '',
	queryMode: 'local',
	editable: false,
    displayField: 'sku',
    valueField: 'sku',
    store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'sku'},
			{name:'sku'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQuerySkus.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});
//库位下拉
Ext.define('Redm.form.LocComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.loccombo',
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'loc'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryLocation.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'loc',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'loc',
    valueField: 'loc'
});

//区域
Ext.define('Redm.form.AreaComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.areacombo',
	name: 'area',
	editable: false,
	value:'',
    displayField: 'description',
    valueField: 'area',
    store:Ext.create('Ext.data.Store', {
        autoload: true,
    	fields: [
			{name:'area'},
			{name:'description'}     //这里显示描述字段
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryArea.action',//?existall=false
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});

//库区
Ext.define('Redm.form.PutawayZoneComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.putawayzonecombo',
	//editable: false,
    editable: true,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'putawayZone'},
			{name:'descrption'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryPutawayZone.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'putawayZone',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'descrption',
    valueField: 'putawayZone'
});

//库位段下拉(已用)
Ext.define('Redm.form.SectionComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.sectioncombo',
	editable: false,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'section'},
			{name:'description'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQuerySection.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'section',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'description',
    valueField: 'section'
});

//上架策略下拉(已用)
Ext.define('Redm.form.PutawayStrategyComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.putawaystrategycombo',
	editable: false,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'putawayStrategyKey'},
			{name:'putawayStrategyKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/rules/doQueryPutawayStrategy.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'putawayStrategyKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'putawayStrategyKey',
    valueField: 'putawayStrategyKey'
});

//库存周转策略下拉(已用)
Ext.define('Redm.form.RotationStrategyComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.rotationstrategycombo',
	editable: true,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'rotationStrategyKey'},
			{name:'rotationStrategyKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/rules/doQueryRotationStrategy.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'rotationStrategyKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'rotationStrategyKey',
    valueField: 'rotationStrategyKey'
});

//预分配策略下拉(已用)
Ext.define('Redm.form.PreAllocateStrategyComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.preallocatestrategycombo',
	editable: true,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'preAllocationStrategyKey'},
			{name:'preAllocationStrategyKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/rules/doQueryPreAllocateStrategys.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'preAllocationStrategyKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'preAllocationStrategyKey',
    valueField: 'preAllocationStrategyKey'
});


//分配策略下拉(已用)
Ext.define('Redm.form.AllocationStrategyComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.allocationstrategycombo',
	editable: true,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'allocationStrategyKey'},
			{name:'allocationStrategyKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/rules/doQueryAllocationStrategy.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'allocationStrategyKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'allocationStrategyKey',
    valueField: 'allocationStrategyKey'
});


//补货策略下拉(已用)
Ext.define('Redm.form.ReplenishmentStrategyComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.replenishmentstrategycombo',
	editable: false,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'replenishmentStrategyKey'},
			{name:'replenishmentStrategyKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/rules/doQueryReplenishmentStrategy.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'replenishmentStrategyKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'replenishmentStrategyKey',
    valueField: 'replenishmentStrategyKey'
});


//包装下拉(已用)
Ext.define('Redm.form.PackComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.packcombo',
	editable: false,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'packKey'},
			{name:'packKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryPacks.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'packKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'packKey',
    valueField: 'packKey'
});

//装箱
Ext.define('Redm.form.CartonComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cartoncombo',
	editable: false,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'cartonKey'},
			{name:'cartonKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryCartonization.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'cartonKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'cartonKey',
    valueField: 'cartonKey'
});

//批校验
Ext.define('Redm.form.LotValidateComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.lotvalidatecombo',
	editable: false,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'lotKey'},
			{name:'lotKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQueryLotValidate.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        sorters:[{property :'lotKey',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'lotKey',
    valueField: 'lotKey'
});



//数据字典下拉(已用)
Ext.define('Redm.form.CodeComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.codecombo',
	storeAutoLoad: true,
	codeType: 'ABC',
	queryMode: 'local',
	queryParam:'description',
	forceSelection: true,
    displayField: 'description',
    valueField: 'codeValue',
    existall:false,
    editable: false,
    removeDate:[],//排除的记录
	defaultValue:'',//默认值
	initComponent: function(){
		this.store = Ext.create('Ext.data.Store', {
	        autoLoad: this.storeAutoLoad,
	        storeId:'codeStore',
        	fields: [
				{name:'codeValue'},
				{name:'description'}
			],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/system/queryCodeDetail.action?codeType='+this.codeType+'&existall='+this.existall,
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: {read: 'POST'},
	            simpleSortMode: true
	        },
	        sorters:[{property :'codeValue',direction:'ASC'}],
	        listeners:{
				'load':function(sto,recs){
					var value = this.defaultValue || this.originalValue || this.getValue();
					this.setValue(value);
					
					if(this.removeDate)
					{
						for(var i = 0 ;i<this.removeDate.length;i++)
						{
							var temindex = sto.find('codeValue',this.removeDate[i])
							if(temindex!=-1)
							{
								sto.removeAt(temindex);
							}
						}
						
					}
				},scope:this
	        }
	    });
        this.callParent(arguments);
	},
	setValue: function(value, doSelect) {
        var me = this,
            valueNotFoundText = me.valueNotFoundText,
            inputEl = me.inputEl,
            i, len, record,
            models = [],
            displayTplData = [],
            processedValue = [];
		
        //改动过的
        if(!me.defaultValue){
       		me.defaultValue = value;
        }
        
        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            me.value = value;
            me.setHiddenValue(me.value);
            return me;
        }

        // This method processes multi-values, so ensure value is an array.
        value = Ext.Array.from(value);

        // Loop through values
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                record = me.findRecordByValue(record);
            }
            // record found, select it.
            if (record) {
                models.push(record);
                displayTplData.push(record.data);
                processedValue.push(record.get(me.valueField));
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            else {
                // If we are allowing insertion of values not represented in the Store, then set the value, and the display value
                if (!me.forceSelection) {
                    displayTplData.push(value[i]);
                    processedValue.push(value[i]);
                }
                // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (Ext.isDefined(valueNotFoundText)) {
                    displayTplData.push(valueNotFoundText);
                }
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(processedValue);
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
            me.value = null;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method
        me.lastSelection = me.valueModels = models;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        if (doSelect !== false) {
            me.syncSelection();
        }
        me.applyEmptyText();

        return me;
    }
});
Ext.define('Redm.form.WaveKeyComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.wavekeycombo',
	queryMode: 'local',
	editable: false,
//	orderKey: '',
	fieldLabel: '部门',
	value:'',
    displayField: 'waveKey',
    valueField: 'waveKey',
    existall:false,
    store:Ext.create('Ext.data.Store', {
        autoLoad: false,
    	fields: [
			{name:'waveKey'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/suppor/queryPickDetail.action',
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: {read: 'POST'},
            simpleSortMode: true
        }
    })
});



Ext.define('Ext.grid.feature.Summary', {
    extend: 'Ext.grid.feature.AbstractSummary',
    alias: 'feature.summary',
    /**
     * Gets any fragments needed for the template.
     * @private
     * @return {Object} The fragments
     */
    getFragmentTpl: function() {
        this.summaryData = this.generateSummaryData(); 
        return this.getSummaryFragments();
    },
    /**
     * Overrides the closeRows method on the template so we can include our own custom
     * footer.
     * @private
     * @return {Object} The custom fragments
     */
    getTableFragments: function(){
        if (this.showSummaryRow) {
            return {
                closeRows: this.closeRows
            };
        }
    },
    /**
     * Provide our own custom footer for the grid.
     * @private
     * @return {String} The custom footer
     */
    closeRows: function() {
        return '</tpl>{[this.printSummaryRow()]}';
    },
    /**
     * Gets the data for printing a template row
     * @private
     * @param {Number} index The index in the template
     * @return {Array} The template values
     */
    getPrintData: function(index){
        var me = this,
            columns = me.view.headerCt.getColumnsForTpl(),
            i = 0,
            length = columns.length,
            data = [],
            active = me.summaryData,
            column;
            
        for (; i < length; ++i) {
            column = columns[i];
            column.gridSummaryValue = this.getColumnValue(column, active);
            data.push(column);
        }
        return data;
    },
    /**
     * Generates all of the summary data to be used when processing the template
     * @private
     * @return {Object} The summary data
     */
    generateSummaryData: function(){
        var me = this,
            data = {},
            store = me.view.store,
            columns = me.view.headerCt.getColumnsForTpl(),
            i = 0,
            length = columns.length,
            fieldData,
            key,
            comp;
            
        for (i = 0, length = columns.length; i < length; ++i) {
            comp = Ext.getCmp(columns[i].id);
            data[comp.id] = me.getSummary(store, comp.summaryType, comp.dataIndex, false);
        }
        return data;
    }
});

/**
 * 下拉树示例代码
 * {
	name: 'smallType',
	fieldLabel: '小类',
	xtype: 'treecombox',
    valueField: 'id',
    displayField: 'text',
    store: Ext.create('Ext.data.TreeStore', { 
    	fields: ['text','id','parentId'],
    	root: {
            text: '所有分类',
            id: -1,
            expanded: true
        },
        proxy: { 
            type: 'ajax', 
            url: '../../basicdata/doQueryAllps.action'
        }
    })
}
 */
Ext.define('Redm.commons.TreeCombox', {
    extend: 'Ext.form.field.Picker',
    xtype: 'treecombox',
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    config: {
        displayField: null,
        columns: null,
        rootVisible: true,
        selectOnTab: true,
        firstSelected: false,
        maxPickerWidth: 300,
        maxPickerHeight: 280,
        minPickerHeight: 100
    },
    editable: false,
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        this.addEvents('select');
        me.store.on('load', me.onLoad, me);
        
    },
    createPicker: function() {
        var me = this,
            picker = Ext.create('Ext.tree.Panel', {
                store: me.store,
                floating: true,
                hidden: true,
                width: me.maxPickerWidth,
                displayField: me.displayField,
                columns: me.columns,
                maxHeight: me.maxTreeHeight,
                shadow: false,
                rootVisible: me.rootVisible,
                manageHeight: false,
                listeners: {
                    itemclick: Ext.bind(me.onItemClick, me)
                },
                viewConfig: {
                    listeners: {
                        render: function(view) {
                            view.getEl().on('keypress', me.onPickerKeypress, me);
                        }
                    }
                }
            }),
            view = picker.getView();

        view.on('render', me.setPickerViewStyles, me);
        if (Ext.isIE9 && Ext.isStrict) {
            view.on('highlightitem', me.repaintPickerView, me);
            view.on('unhighlightitem', me.repaintPickerView, me);
            view.on('afteritemexpand', me.repaintPickerView, me);
            view.on('afteritemcollapse', me.repaintPickerView, me);
        }
        return picker;
    },
    setPickerViewStyles: function(view) {
        view.getEl().setStyle({
            'min-height': this.minPickerHeight + 'px',
            'max-height': this.maxPickerHeight + 'px'
        });
    },
    repaintPickerView: function() {
        var style = this.picker.getView().getEl().dom.style;
        style.display = style.display;
    },
    alignPicker: function() {
        var me = this,
            picker;

        if (me.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                picker.setWidth(this.picker.getWidth());
            }
            if (picker.isFloating()) {
                me.doAlign();
            }
        }
    },
    onItemClick: function(view, record, node, rowIndex, e) {
        this.selectItem(record);
    },
    onPickerKeypress: function(e, el) {
        var key = e.getKey();

        if(key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(this.picker.getSelectionModel().getSelection()[0]);
        }
    },
    selectItem: function(record) {
        var me = this;
        me.setValue(record.get(this.valueField || 'id'));
        me.picker.hide();
        me.inputEl.focus();
        me.fireEvent('select', me, record)
    },
    onExpand: function() {
        var me = this,
            picker = me.picker,
            store = picker.store,
            value = me.value;
        if(value) {
        	var node = store.getNodeById(value);
        	if(node)
            	picker.selectPath(node.getPath());
        } else {
        	var hasOwnProp = me.store.hasOwnProperty('getRootNode');
        	if(hasOwnProp)
            	picker.getSelectionModel().select(store.getRootNode());
        }

        Ext.defer(function() {
            picker.getView().focus();
        }, 1);
    },
    setValue: function(value) {
        var me = this,record;
        me.value = value;
        if (me.store.loading) {
            return me;
        }
        try{
        	var hasOwnProp = me.store.hasOwnProperty('getRootNode');
        	record = value ? me.store.getNodeById(value) : (hasOwnProp ? me.store.getRootNode() : null);
        	me.setRawValue(record ? record.get(this.displayField) : '');
        }catch(e){
        	me.setRawValue('');
        }

        return me;
    },
    getValue: function() {
        return this.value;
    },
    onLoad: function(store,node,records) {
        var value = this.value;
        if (value) {
            this.setValue(value);
        }else{
        	if(this.firstSelected){
	        	if(records && records.length > 0){
	        		var record = records[0];
	        		this.setValue(record.get(this.valueField));
	        	}
        	}
        }
    },
    getSubmitData: function() {
        var me = this,
            data = null;
        if (!me.disabled && me.submitValue) {
            data = {};
            data[me.getName()] = '' + me.getValue();
        }
        return data;
    },
    onTriggerClick: function() {
        var me = this;
        //me.store.load();
        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                me.expand();
            }
            me.inputEl.focus();
        }
    }
});

/**
 * 数据词典下拉列表，下拉数据远程加载。
 */
Ext.define('Redm.commons.DictonaryCombox', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.dictonary'],
    queryMode: 'local',
	editable: false,
	typeAhead: true,
    displayField: 'dictValue',
    initComponent: function(){
    	if(!this.dictType && !this.fieldLabel){	
    		B.error('Sorry','Unspecified type of business!');
    	}
    	this.store = this.buildStore(this.dictType || this.fieldLabel)
        this.callParent(arguments);
    },
    buildStore: function(type){
    	var store = new Ext.data.Store({
		    fields: ['id','dictCode','dictValue'],
		    autoLoad: this.autoLoad || true,
		    proxy: {
		        type: 'ajax',
		        extraParams: {dictValue:type},
		        actionMethods: { read: 'POST' },
		        url : appPath + '/system/queryDictionarysByType.action',
		        reader: {type: 'json',root: 'json.data'}
		    }
		});
		return store;
    }
});

Ext.define('Ext.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.searchfield',
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    hasSearch : false,
    paramName : 'query',
    initComponent: function(){
        this.callParent(arguments);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
    afterRender: function(){
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },
    onTrigger1Click : function(){
        var me = this,
            store = me.store,
            proxy = store.getProxy(),
            val;
            
        if (me.hasSearch) {
            me.setValue('');
            proxy.extraParams[me.paramName] = '';
            if(me.treeStord === true){
	        	store.load();
	        }else{ 
	        	store.loadPage(1);
	        }
            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.doComponentLayout();
        }
    },
    onTrigger2Click : function(){
        var me = this,
            store = me.store,
            proxy = store.getProxy(),
            value = me.getValue();
        if (value.length < 1) {
            me.onTrigger1Click();
            return;
        }
        proxy.extraParams[me.paramName] = value;
        if(me.treeStord === true){
        	store.load();
        }else{ 
        	store.loadPage(1);
        }
        me.hasSearch = true;
        me.triggerCell.item(0).setDisplayed(true);
        me.doComponentLayout();
    }
});

Ext.define('Redm.BaseGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.basegrid',
	margin: '2 2 2 2',
	viewConfig : {
		autoFill: true,
		forceFit: true
	},
	initComponent: function(){
		this.buildColumns();
    	this.buildDockedItems();
        this.callParent(arguments);
	},
	buildColumns: function(){
		//@Override
	},
	buildDockedItems: function(){
		//@Override
	},
	buildWindow: function(){
		var cfg = this.winConfig;
		return Ext.create('widget.window',{
			width : cfg.width || 800,
			height : cfg.height || 490,
			iconCls: 'icon-win',
			//buttonAlign : "center",
			title : cfg.title || '数据信息',
			modal : cfg.modal == undefined ? true : false,
			border: false,
			closable :true,
			closeAction: cfg.closeAction || 'destroy',
			maximized:cfg.maximized||false,
			shadow : true,
			minimizable : true,
			maximizable :true,
			resizable: true,
			layout : cfg.layout||'fit',
			items : cfg.items,
			buttons : cfg.buttons
		});
	},
	buildStore: function(url,model){
		var autoLoad = this.autoLoad == false ? false : true;
		var pageSize = arguments[2] || 20,
			extraParams = arguments[3] || {},
			sorters = arguments[4] || {};
	    this.store = Ext.create('Ext.data.Store', {
	        pageSize: pageSize,
	        model: model,
	        autoLoad: autoLoad,
	        remoteSort: true,
	        proxy: {
	            type: 'ajax',
	            url: url,
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
                extraParams: extraParams,
	            simpleSortMode: true
	        },
	        sorters: [sorters]
	    });
	},
	showWindow: function(){
		if (!this.win) {
			this.win = this.buildWindow();
			this.win.on("close", function() {
				delete this.win;
				delete this.winConfig;
				delete this.winItems;
				delete this.winButtons;
			}, this);
		}
		this.win.show();
	},
	closeWindow:function(){
		try{
			if (this.win)
				this.win.close();
		}catch(e){}
	},
	hideWindow:function(){
		try{
			if (this.win)
				this.win.hide();
		}catch(e){}
	},
	calRowNumber: function(dataIndex,dataLen){
		dataLen = dataLen || 4;
		this.store.on('datachanged',function(store){
    		var i = 0;
    		var cal = function(data){
    			var len = data.length;
    			if(len < dataLen){
    				var num = '';
    				for(var n = 0; n < dataLen - len; n++)
    					num += '0';
    				data = num + data;
    			}
    			return data;
    		}
    		var max = store.max('lineNo');
    		var num = Number(max);
    		store.each(function(rec){
    			var lineNo = rec.get('lineNo');
    			if(!(lineNo && lineNo != '')){
	    			rec.set(dataIndex,cal('' + (num + 1)));
    				rec.commit();
    			}
    			i++;
    		});
    	});
	}
});

Form = {
	validate : function(formPanel) {
		if (!formPanel.getForm().isValid()) {
			MessageBox.alert("错误提示","表单数据不合法，请注意必填项及录入的数据格式！",null,Ext.Msg.ERROR);
			return false;
		}
		return true;
	},
	submit : function(formPanel,submitUrl,success,failure,scope){
		if (!this.validate(formPanel))
			return;
		scope = scope || this;
		formPanel.submit({
		    clientValidation: true,
		    url: submitUrl,
		    success: function(form, action) {
				MessageBox.show(true,action.result.json.msg,function(){
					if(success)success.call(scope,form,action);
				});
		    },
		    failure: function(form, action) {
		        switch (action.failureType) {
		            case Ext.form.Action.CLIENT_INVALID:
		                MessageBox.show(false, "Form fields may not be submitted with invalid values");
		                break;
		            case Ext.form.Action.CONNECT_FAILURE:
		                MessageBox.show(false, "Ajax communication failed");
		                break;
		            case Ext.form.Action.SERVER_INVALID:
		               	MessageBox.show(false, "操作失败，请重新操作！");
		       }
		    }
		});
	}
};

MessageBox = {
	/**
	 * 精简的提示对话框
	 * @param {String} title 标题
	 * @param {String} msg 消息内容
	 * @param {Object} btns 按扭，默认为：Ext.MessageBox.OK
	 * @param {String} icon 图标，默认为：Ext.MessageBox.INFO
	 * @param {Function} fn 执行后调用的方法
	 */
	alert: function(title,msg,btns,icon,fn,time) {
		btns = btns || Ext.MessageBox.OK;
		icon = icon || Ext.MessageBox.INFO;
		Ext.MessageBox.show({
		   title: title,
		   msg: msg,
		   buttons: btns,
		   fn: fn,
		   icon: icon
		});
		if(!!time){
			setTimeout(function() {
				Ext.MessageBox.hide();
			}, time);
		}
	},
	show: function(success,msg,fn,time) {
		btns = Ext.MessageBox.OK;
		icon = Ext.MessageBox.INFO;
		if(!success){
			icon = Ext.MessageBox.ERROR;
		}
		Ext.MessageBox.show({
		   title: success ? '成功提示': '错误提示',
		   msg: msg,
		   buttons: btns,
		   fn: fn,
		   icon: icon
		});
		if(!!time){
			setTimeout(function() {
				Ext.MessageBox.hide();
			}, time);
		}
	},
	/**
	 * 自动隐藏的错误提示对话框。
	 * @param {String} title 标题信息
	 * @param {String} msg 消息内容
	 * @param {Number} width 对话框的最小宽度
	 * @param {Number} time 显示的时长(以毫秒为单位)，默认2000
	 */
	error: function(title,errorMsg,width,time){
		Ext.MessageBox.show({
			title : title || '应用程序错误',
			msg : errorMsg,
			closable : false,
			icon : Ext.MessageBox.ERROR,
			minWidth : width || 260
		});
		setTimeout(function() {
			Ext.MessageBox.hide();
		}, time || 2000);
	}
};

MB = MessageBox;



Ext.define('Redm.BaseTab',{
	extend: 'Ext.tab.Panel',
	alias : 'widget.basetab',
	initComponent: function(){
		this.activeindex = 0;
		this.buildContextMenu();
		this.createContextMenuItem();
		this.createDetailGridMenuItem();
		Ext.apply(this,{
    		tabPosition: 'bottom',
    		items: [this.buildTabList(),this.buildTabDetail()],
    		initEvents : function(){  
                Ext.TabPanel.superclass.initEvents.call(this);  
                //monitor title dbclick  
                this.tabBar = this.down("tabbar");
                this.mon(this.tabBar.el,'click',function(event, target)
                {
                	var record = this.listgrid.getSelectionModel().getSelection()[0];
                	var tab = this.tabBar.getChildByElement(target)
            		var index = this.tabBar.items.indexOf(tab);
            		if(this.activeindex!=index){
	            		this.activeindex = index;
			    		if(index == 1){
			    			if(record){
			        			this.intiUpdateFormtab(record);
			        		}else{
			        			this.setOrderNo();
			        			this.changeMenuDisable();
			        		}
			    		}
            		}
                },this);  
            }
    	});
    	
        this.callParent(arguments);
        	  
	},
	buildTabList: function(){
		return {title:'List',itemId:'listTab'};
	},
	buildTabDetail: function(){
		return {title:'Form',itemId:'formTab'};
	},
	createListTab:function(formConfig,gridConfig){
		//查询表单
		formConfig = Ext.apply({
			region: 'north',
			height:130,
			labelWidth : 80,
			frame : true,
			border : false,
			layout: 'anchor',
			buttonAlign:'center',
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                defaults: {
					margins: '0 0 0 12'
                }
            },
            buttons:[{
				text : "查询" ,
				iconCls : "icon-find",
				scope : this,
	            handler: this.onSelectClick
			},{
				text : "重置",
				iconCls : "icon-reset",
				scope : this,
	            handler: function(){
	            	this.listform.getForm().reset();
	            }
			}]
		},formConfig);
		
    	this.listform = new Ext.form.FormPanel(formConfig);
		
    	
    	//单据表格
    	gridConfig = Ext.apply({
	        stateful: true,
	        region: 'center',
	        viewConfig: {
	            stripeRows: true
	        },
	        defaultStatus:'1',
	        dockedItems:[{
	            xtype: 'toolbar',
	            dock: 'top',
	            items: [{
	            	itemId:'createToolbar',
	                iconCls: 'icon-create',
	                text: '创建',
	                handler: this.onCreateClick,
	                scope: this
	            },'-',{
	            	itemId:'optionToolbar',
	            	iconCls: 'icon-edit',
	                text: '操作',
	                disabled: true,
	                handler: this.onUpdateClick,
	                scope: this
	            },'-',{
	            	itemId:'deleteToolbar',
	            	iconCls: 'icon-delete',
	                text: '删除',
	                disabled: true,
	                handler: this.onDeleteClick,
	                scope: this
	            }]
            },{
		        xtype: 'pagingtoolbar',
		        store: gridConfig.store,   // same store GridPanel is using
		        dock: 'bottom',
		        displayInfo: true
		    }]
	    },gridConfig);
	    
		this.listgrid =  Ext.create('Ext.grid.Panel',gridConfig);
	    
		var optionToolbar = this.listgrid.down('#optionToolbar');
		var deleteToolbar = this.listgrid.down('#deleteToolbar');
		var defaultStatus = this.listgrid.defaultStatus;
		this.listgrid.getSelectionModel().on({
	        selectionchange: function(sm, selections) {
	        	if(optionToolbar){
	        		optionToolbar.setDisabled(selections.length == 0);
	        	}
	        	
	        	if(deleteToolbar){
		            if (selections.length) {
						var status = selections[0].data.status;
		            	if(!status||status==defaultStatus){
		            		deleteToolbar.enable();//删除
		            	}else{
		            		deleteToolbar.disable();//删除
		            	}
		            } else {
						deleteToolbar.disable();//删除
		            }
	        	}
	        }
	    })
        
        this.listgrid.store.on({
        	'beforeload':function(sto){
				sto.getProxy().extraParams = {query:Ext.encode(this.listform.form.getValues())};
	        },scope:this	        
	    });
        this.listgrid.on('itemdblclick',this.onUpdateClick,this);
        this.listTab = new Ext.create('Ext.Panel',{
			title: 'List',
			itemId:'listTab',
            layout: 'border',
            items:[this.listform,this.listgrid]
      	});
      	return this.listTab;
	},
	createDetailTab:function(formConfig,gridConfig){
		//详细页面中的表单
		formConfig = Ext.apply({
			region: 'center',
			labelWidth : 80,
			frame : true,
			border : false,
			layout: 'anchor',
			autoScroll :true,
			animCollapse: false,
			split : true,
			collapsible : true,
            defaults: {
            	labelWidth : 70,
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                defaults: {
                	labelAlign : 'top',
                    margins: '-1 2 -2 6'
                }
            }
		},formConfig);
		
		this.detailform = new Ext.form.FormPanel(formConfig);
//		this.detailform.on({
//			render:function(p){
//                p.getEl().on("dblclick",this.onDetailGridDbClick,this)
//            },scope:this
//	    });		
		gridConfig = Ext.apply({
	        region: 'south',
			resizable: false,
	        viewConfig: {
	            stripeRows: true
	        },
	        dockedItems:[this.createDetailGridToolbar()],
            listeners:{
				'containercontextmenu': function(view, e) {
		            this.createDetailGridContextMenu(e);
		            return false;
		        },
		        'containerdblclick': function(view, e) {
		            this.onDetailGridDbClick();
		        },scope:this,
		        'itemcontextmenu': function(view, rec, node, index, e) {
		            this.createDetailGridContextMenu(e);
		            return false;
		        }
			}
	    },gridConfig);
	    	
		this.detailgrid =  Ext.create('Ext.grid.Panel', gridConfig);
		
//		this.detailgrid.on({
//			render:function(p){
//                p.getEl().on("dblclick",this.onDetailGridDbClick,this)
//            },scope:this
//	    });
		
		var edit = this.detailgrid.getPlugin();
		if(edit){
			edit.on('beforeedit',function(){
				return !this.addAction.isDisabled();
			},this);
		}
	    
	    this.detailTab = new Ext.create('Ext.Panel',{
			title: 'Form',
			itemId:'formTab',
            layout: 'border',
            items:[this.detailform,this.detailgrid]
      	});
		return this.detailTab;
	},
	alert : function(msg, title, fn, scope, type) {
		var obj = {
			title : title || '操作提示',
			msg : msg,
			scope : scope || window,
			fn : fn,
			icon : type || Ext.Msg.INFO,
			buttons : Ext.Msg.OK
		};
		if (typeof msg == 'object')
			Ext.apply(obj, msg);
		Ext.Msg.show(obj);
	},
    buildContextMenu:function(){
    	this.createNewAction = Ext.create('Ext.Action', {
			text : "新建" ,
			iconCls: 'icon-create',
			handler: this.onCreateClick,
			scope : this
		});
    	this.createAction = Ext.create('Ext.Action', {
			text : "保存" ,
			iconCls : "icon-save",
			handler: this.onSaveClick,
			scope : this
		});
		this.cancelAction = Ext.create('Ext.Action', {
			text : "取消",
			iconCls : "icon-cancel",
			handler: this.onCancelClick,
			scope : this
		});
    },
    createContextMenuItem:function(){
    	//创建属于自己的dtailform右键按钮
    },
    createMiddleGrid: function(){
    	//创建中间的GRID
	},
    changeMenuDisable:function(){
    	//改变右键菜单按钮启用状态
    },
    createDetailGridMenuItem:function(){
    	//创建属于自己的dtailgrid右键按钮
    	this.addAction = Ext.create('Ext.Action', {
	        text: '添加',
	        iconCls : "icon-add",
	        disabled: false,
	        handler: this.onAddClick,
	        scope: this
	    });
	    
		this.deleteAction = Ext.create('Ext.Action', {
	        text: '删除',
	        iconCls : "icon-delete",
	        //disabled: true,
	        handler: this.onDeleteDetailClick,
	        scope: this
	    });
    },
    createDetailGridContextMenu:function(e){
	    
		this.gridContextMenu = Ext.create('Ext.menu.Menu', {
			items: [
	            this.addAction,
	            this.deleteAction,
	            this.createAction,
	            this.createNewAction
	        ]
		});
		
		e.preventDefault();
		this.gridContextMenu.showAt(e.getXY());
	    
    },
    createDetailGridToolbar: function(){
        var toolbar = Ext.create('widget.toolbar', {
        	dock: 'top',
            items: [this.addAction,'-',this.deleteAction,'-',this.createAction]
        });
        return toolbar;
    },
	onSelectClick:function()
	{
		var params = {query:Ext.encode(this.listform.form.getValues())};
		var lsg = this.listgrid;
		lsg.getStore().getProxy().extraParams = params;
		lsg.store.load();
	},
	getNextLinenumber:function(val){
		val = (parseFloat(val)+1)+"";
		
		var length = val.length;
		if(length==1){
			val = '000'+val;
		}else if(length==2){
			val = '00'+val;
		}else if(length==3){
			val = '0'+val;
		}else if(length==4){
			val = val;
		}
		return val;
	},
	getAllLot:function(val){
		val = (parseFloat(val||0))+"";
		var length = val.length;
		for(var i=0;i<10-length;i++)
		{
			val = '0'+val;
		}
		return val;
	},
	onAddClick:function(){
		//添加前先判断form是否存在货主
		var storekeytext = this.detailform.getForm().findField('storerKey');
		if(storekeytext.getValue()==''){
			this.alert("单据信息“货主”不能为空，请检查！", "提示信息");
        	return false;
		}
		
		var dsg = this.detailgrid;
		var rec = new dsg.store.model({
        }), edit = dsg.getPlugin();
        var linenumber = dsg.columns[0].dataIndex;
        //添加前先验证上一行是否合格
        if(dsg.store.getCount()>0){
        	var model = dsg.store.getAt(dsg.store.getCount()-1);
        	if(!model.isValid()){
        		this.alert("数据必输项为空(*)，请检查！", "提示信息");
        		return false;
        	}else{
        		rec.set(linenumber,this.getNextLinenumber(model.get(linenumber)));
        	}
        }else{
        	rec.set(linenumber,"0001");
        }
        
        edit.cancelEdit();
        dsg.store.add(rec);
        
        //添加记录时form中货主不能修改
        if(storekeytext){
        	storekeytext.setReadOnly(true);
        }
        
        //IE下报错
//        edit.startEditByPosition({
//            row: dsg.store.getCount()-1,
//            column: 1
//        });
	},
//	onRemoveClick: function(){
//		var dsg = this.detailgrid,edit = dsg.getPlugin(),dsf=this.detailform;
//        var selection = dsg.getView().getSelectionModel().getSelection()[0];
//        if (selection) {
//        	//标记删除的商品记录
//        	if(selection.data.id)
//        	{
//        		var deleteText = dsf.getForm().findField('deleteItems');
//        		deleteText.setValue(deleteText.getValue()+selection.data.id+',');	
//        	}
//            dsg.store.remove(selection);
//            
//            if(dsg.store.getCount()>0)
//            {
//            	dsg.getView().getSelectionModel().select(dsg.store.getCount()-1);
//            }else
//            {
//            	//物流记录都清空时form中货主恢复修改
//            	var storekeytext = this.detailform.getForm().findField('storerKey');
//            	if(storekeytext){
//        			storekeytext.setReadOnly(false);
//            	}
//            }
//        }
//        
//    },
    setOrderNo: function(){
    	//后台获得序列号，并给表单赋值
    },
    setFormReadOnly:function(form, bReadOnly,unFields)
    {
    	var unEach = unFields||[];
    	var fields = form.getForm().getFields();
    	fields.each(function(field){
    		var zc = false;
    		for(var i =0;i<unEach.length;i++){
    			if(field.name==unEach[i]&&!zc){
    				zc = true;
    			}
    		}
    		if(!zc){
    			field.setReadOnly(bReadOnly);
    		}
    	});
    },
    onCreateClick:function(){
    	//创建时formtab初始化
    	this.intiCreateFormtab();
    	this.setActiveTab(this.detailTab);
    },
    onUpdateClick:function(){
    	var record = this.listgrid.getSelectionModel().getSelection()[0];
    	if (!record) {
			this.alert("请先选择要操作的数据！", "提示信息");
			return false;
		}
		this.setActiveTab(this.detailTab);
		this.intiUpdateFormtab(record);
    },
    intiCreateFormtab:function(){
    	this.listgrid.getSelectionModel().deselectAll();
    	this.detailform.form.reset();
    	this.detailgrid.store.removeAll();
    	this.changeMenuDisable();
    	this.setOrderNo();
    	//创建时取消货主只读
    	var storekeytext = this.detailform.getForm().findField('storerKey');
    	if(storekeytext){
        	storekeytext.setReadOnly(false);
    	}
    },
    intiUpdateFormtab:function(record){
    	//修改时formtab初始化
    	this.detailform.form.reset();
    	this.detailform.form.loadRecord(record);
		this.detailgrid.store.load({params:{id:record.data.id}});
		this.changeMenuDisable();
		
    	var storekeytext = this.detailform.getForm().findField('storerKey');
    	if(storekeytext){
        	storekeytext.setReadOnly(true);
    	}
    },
	onDeleteClick: function(){
		//此方法需要具体页面实现
		var lsg = this.listgrid;
        var selection = lsg.getView().getSelectionModel().getSelection()[0];
        if (selection) {
        	Ext.MessageBox.confirm("请确认", "是否确认要删除此记录？", function(button, text) {
				if(button=="yes"){
	            	lsg.store.remove(selection);    
				}
        	});
        }
    },
    onDeleteDetailClick: function(){
		//此方法需要具体页面实现
		var dsg = this.detailgrid
        var selection = dsg.getView().getSelectionModel().getSelection()[0];
        if (selection) {
        	Ext.MessageBox.confirm("请确认", "是否确认要删除此记录？", function(button, text) {
				if(button=="yes"){
	            	dsg.store.remove(selection);    
				}
        	});
        }
    },
    deleteInfo : function(id,url){
    	var me = this;
    	Ext.MessageBox.confirm("请确认", "是否确认要删除此记录？", function(button, text) {
			if(button=="yes"){
				var myMask = new Ext.LoadMask(me.getEl(), {msg:"请稍候..."});
				myMask.show();
				Ext.Ajax.request({
				    url: url,
				    params: {id: id},
				    success: function(response){
				        var data = Ext.decode(response.responseText);
				        Ext.Msg.alert("成功提示", data.json.msg);
		                myMask.hide();
					    me.listgrid.getStore().load();
					    me.detailgrid.getStore().removeAll();
					    me.detailform.form.reset();
				    },
				    failure: function(response, opts) {
				    	var data = Ext.decode(response.responseText);
				    	Ext.Msg.alert("错误提示", data.json.msg);
				        myMask.hide();
				    }
				});
			}
		});
	},
	deleteDetailInfo : function(id,url){
    	var me = this;
    	Ext.MessageBox.confirm("请确认", "是否确认要删除此记录？", function(button, text) {
			if(button=="yes"){
				var myMask = new Ext.LoadMask(me.getEl(), {msg:"请稍候..."});
				myMask.show();
				Ext.Ajax.request({
				    url: url,
				    params: {id: id},
				    success: function(response){
				        var data = Ext.decode(response.responseText);
				        Ext.Msg.alert("成功提示", data.json.msg);
		                myMask.hide();
					    me.detailgrid.getStore().load();
					    //me.detailgrid.getStore().removeAll();
					    //me.detailform.form.reset();
				    },
				    failure: function(response, opts) {
				    	var data = Ext.decode(response.responseText);
				    	Ext.Msg.alert("错误提示", data.json.msg);
				        myMask.hide();
				    }
				});
			}
		});
	},
    onSaveClick:function(){
    	alert('save');
    	this.detailSubmitForm(this.detailform,this.detailgrid,this.detailform.actionUrl,function(){
    		alert();
    		this.listgrid.store.load({callback:function(){
    			var index = this.listgrid.store.find(this.detailform.orderNo,this.detailform.form.findField(this.detailform.orderNo).getValue());
    			console.log(this.detailform.orderNo);
	    		this.listgrid.getSelectionModel().select(index);
	    		var record = this.listgrid.getSelectionModel().getSelection()[0];
	            this.intiUpdateFormtab(record);
    		},scope:this});
    	});
    },
    detailSubmitValid:function(formPanel,gridPanel,submitUrl,success,failure,scope){
    	//商品信息
		var records = gridPanel.getStore().getRange();
		var modelValid = true;
		Ext.Array.each(records,function(model,index){
			if(!model.isValid()){
				modelValid = false;
				return false;
			}
		});
		if(!modelValid){
			this.alert("商品明细数据不合法，请注意必填项及录入的数据格式！", "提示信息");
			return false;
		}
    	return true;
    },
    detailSubmitForm : function(formPanel,gridPanel,submitUrl,success,failure,scope){
    	scope = scope || this;
    	//表单验证
		if (!formPanel.getForm().isValid()){
			this.alert("表单数据不合法，请注意必填项及录入的数据格式！", "错误提示",null,null,Ext.Msg.ERROR);
			return;
		}
		//商品信息
		var records = gridPanel.getStore().getRange();
		if (Ext.isEmpty(records)) {
			this.alert("没有商品的数据，请检查！", "提示信息");
			return false;
		}
		var valid = this.detailSubmitValid(formPanel,gridPanel,submitUrl,success,failure,scope);
		if(!valid){
			return false;
		}
		
		console.log(records);
//		Ext.define('subminttemmodel', {
//		    extend: 'Ext.data.Model',
//		    fields: [
//	           {name: 'id'},
//	           {name: 'poKey'},
//	           {name: 'poLineNumber'},
//	           {name: 'sku'},
//	           {name: 'storerKey'},
//	           {name: 'skuDescription'},
//	           {name: 'qtyOrdered',type: 'float'},
//	           {name: 'qtyReceived',type: 'float'},
//	           {name: 'packKey'},
//	           {name: 'uom'},
//			   {name: 'uomScale',type:'int',defaultValue:'1'},
//	           {name: 'unitPrice'},
//	           {name: 'notes'},
//	           {name: 'susr1'},
//	           {name: 'susr2'},
//	           {name: 'susr3'},
//	           {name: 'susr4'},
//	           {name: 'susr5'},
//	           {name: 'addDate'},
//			   {name: 'addWho'},
//			   {name: 'editDate'},
//			   {name: 'editWho'}
//		    ]
//		});
//		var datas = [];
//		Ext.Array.each(records,function(model,index){
//			alert('each');
//			console.log(model);
//			var rec = Ext.ModelManager.create(model.data,'subminttemmodel');
//			//格式化日期
//			var formatations =model.formatations;
//			if (formatations) {
//	            var length = formatations.length;
//	            for (i = 0; i < length; i++) {
//	                var formatation = formatations[i];
//	                var field = formatation.field || formatation.name;
//	                var type = formatation.type;
//	                var format = formatation.format||'Y-m-d H:i:s';
//					if(type=='data'&&model.get(field)){
//						rec.set(field,Ext.Date.format(model.get(field),format));
//					}
//	            }
//	        }
//			datas.push(rec.data);
//		});
		formPanel.submit({
		    clientValidation: true,
		    url: submitUrl,
		    params: {data: Ext.encode(records)},// datas
		    success: function(form, action) {
		       	Ext.Msg.alert("成功提示", action.result.json.msg);
				success.call(scope,form,action);
		    },
		    failure: function(form, action) {
		        switch (action.failureType) {
		            case Ext.form.Action.CLIENT_INVALID:
		                Ext.Msg.alert("Failure", "Form fields may not be submitted with invalid values");
		                break;
		            case Ext.form.Action.CONNECT_FAILURE:
		                Ext.Msg.alert("Failure", "Ajax communication failed");
		                break;
		            case Ext.form.Action.SERVER_INVALID:
		               Ext.Msg.alert("错误提示", action.result.json.msg);
		       }
		    }
		});
	},
    onCancelClick:function(){
    	this.detailform.form.reset();
    	this.detailgrid.store.removeAll();
    	this.setActiveTab(this.listTab);
    },
    onDetailGridDbClick:function(){
    	if(this.detailform.collapsed)
    		this.detailform.expand();
    	else
    		this.detailform.collapse();
    }
});