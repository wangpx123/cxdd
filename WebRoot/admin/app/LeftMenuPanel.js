var Global = {};
Global.SystemMenus = [{
	id:'xx',
	text : "系 统 管 理",
	children : [{
		text : "修改密码",
		leaf : true,
		appClass : "ChangePasswordWindow",
		script : "ChangePasswordWindow.js"
	}]
}];
Ext.define('Jelly.home.SystemMenuTree', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.sysmenutree',
	lines : false,
	children : [],
	rootVisible : false,
    autoScroll: true,
    initComponent: function() {
        this.store = Ext.create('Ext.data.TreeStore', {
            fields: ['id','text','appClass','url','leaf','frameEnable','script','appUrl'],
            root: {
                expanded: true,
                children: this.children
            }
        });
        this.callParent();
    },
    addSystemMenu: function(o) {
        var root = this.store.getRootNode();
        root.appendChild(o);
    }
});
Ext.define('Jelly.home.MenuPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menupanel',
    animCollapse: true,
    layout: 'accordion',
	split : true,
	layoutConfig: {
		animate: true,
		activeOnTop: false
    },
	defaults : {
		autoScroll : true,
		border : false
	},
    initComponent: function(){
        Ext.apply(this, {
            items: this.createView()
        });
        this.addEvents(
            'menuremove',
            'menuselect'
        );
        this.callParent(arguments);
    },

    // template method
    afterRender: function(){
        this.callParent(arguments);
        //var view = this.view;
        //view.getSelectionModel().select(view.store.first());
    },
    openNodeApp : function(view, o) {
		if (o.leaf && (o.appClass || o.frameEnable)) {
			
			return this.menuClick(o);
		}
	},
	menuClick : function(m){
		if ((m.appClass || m.frameEnable)) {
			var script = m.script || (m.appClass + ".js");
			if (m.appClass == "ChangePasswordWindow" || script == "ChangePasswordPanel.js") {
				App.changePassword();
				return;
			}
			if (m.addObject) {
				//如果是addObject，这个要留意，暂时没作考虑
				//Ext.Util.addObject(node.attributes.appClass, null,node.attributes.script, node.attributes.otherScripts);
			} else {
				m.script = script;
				this.fireEvent('menuselect', this,m);
			} 
		}
	},
    createView: function(){
    	this.onSelectionChange({});
    	this.view = [];
    	this.titleTpl = '<span style="margin-left:10px;font-weight: bold;" >{0}</span>';
    	var userId = 1;//Global.User['id'];
    	/*Ext.Ajax.request({
		    url: 'page.php',
		    timeout: 60000,
		    params: {userId: userId},
		    success: function(response){
		        var text = response.responseText;
		        // process server response here
		    }
		});*/
    	Ext.each(Global.SystemMenus, function(item) {
    		var title = Ext.String.format(this.titleTpl, item.text);
			var tree = Ext.create('widget.sysmenutree', {
				iconCls : "add-icon",//icon-join
				width : 180,
				id:'xxxxxxxxxx',
				children : item.children,
				title : title
			});
			tree.on('itemclick', function(view, model) {
				this.openNodeApp(view, model.data);
			}, this)
			this.view.push(tree);
    	},this);
    	delete this.titleTpl;
        return this.view;
    },
    createToolbar: function(){
        this.toolbar = Ext.create('widget.toolbar', {
            items: [this.addAction, this.removeAction]
        });
        return this.toolbar;
    },
    onSelectionChange: function(t,selected){
        this.loadFeed(selected);
    },
    onLoadClick: function(){
        this.loadFeed(this.menu.activeFeed);
    },
    loadFeed: function(rec){
        if (rec) {
            this.fireEvent('feedselect', this,rec.get('appClass'), rec.get('text'), rec.get('url'));
        }
    },
    getSelectedItem: function(){
        return this.view.getSelectionModel().getSelection()[0] || false;
    },
    onContextMenu: function(view, index, el, event){
        var menu = this.menu;
        event.stopEvent();
        menu.activeFeed = view.store.getAt(index);
        menu.showAt(event.getXY());
    },
    onAddFeedClick: function(){
        var win = Ext.create('widget.feedwindow', {
            listeners: {
                scope: this,
                feedvalid: this.onFeedValid
            }
        });
        win.show();
    },
    onFeedValid: function(win, title, url){
        var view = this.view,
        store = view.store,
        rec;
        rec = store.add({
            url: url,
            title: title
        })[0];
        this.animateNode(view.getNode(rec), 0, 1);
    },
    animateNode: function(el, start, end, listeners){
        Ext.create('Ext.fx.Anim', {
            target: Ext.get(el),
            duration: 500,
            from: {
                opacity: start
            },
            to: {
                opacity: end
            },
            listeners: listeners
         });
    },
    // Inherit docs
    onDestroy: function(){
        this.callParent(arguments);
        this.menu.destroy();
    }
});
Ext.onReady(function(){
	Ext.create('widget.menupanel', {
        renderTo:'leftmenu',
        floatable: false,
        animate: true,
		width : 170,
		height: 400
    });
});