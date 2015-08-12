define("combinedchartc3-bundle",["js/flow","js/propertyEditor","css!otherCss/c3.min.css","css!css/setting.css"],function(flow, propertyEditorImpl,c3css,cssSetting){

	var cssString = "",
		rules, i;
	if (c3css && c3css.cssRules) {
		rules = c3css.cssRules;
		for (i = 0; i < rules.length; i++) {
			cssString += rules.item(i).cssText;
		}
	}
	if (cssSetting && cssSetting.cssRules){
		rules = cssSetting.cssRules;
		for (i = 0; i < rules.length; i++) {
			cssString += rules.item(i).cssText;
		}
	}
	
    var vizExtImpl = {
        viz   : [flow],
        module: [],
        feeds : [],
        cssString : cssString
    };
    var vizExtBundle = sap.bi.framework.declareBundle({
        "id" : "sh2.viz.ext.combinedchartc3",
        "version" : "1.0.0.0",
        "components" : [
			{
				"id" : "sh2.viz.ext.combinedchartc3",
				"provide" : "sap.viz.impls",
				"instance" : vizExtImpl,
				"customProperties" : {
					"name" : "Combined Chart using c3.js",
					"description" : "",
					"icon" : {"path" : ""},
					"category" : [],
					"resources" : []
				}
			},{
				"id": "sh2.viz.ext.combinedchartc3.propertyeditor",
				"provide": "sap.viz.controls.propertyeditor.view",
				"instance": propertyEditorImpl
			}
	  ]
   });
   // sap.bi.framework.getService is defined in BundleLoader, which is
   // always available at this timeframe
   // in standalone mode sap.viz.js will force load and active the
   // "sap.viz.aio" bundle
   if (sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi")) {
       // if in standalone mode, sap.viz.loadBundle will be available,
       // and we load the bundle directly
       return sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi").core.registerBundle(vizExtBundle);
   } else {
       // if loaded by extension framework, return the "sap.viz.impls"
       return vizExtBundle;
   }

});