define("js/propertyEditor",[],function(){

	var renderer1 = function(div, proxy, config){
		var getProp = function(propName){
			var propObj = {};
			var curLevel = propObj;
			var propArr = propName.split(".");
			if (propArr.length > 1){
				for (var i=0;i<propArr.length-1;i++){
					curLevel[propArr[i]] = {};
					curLevel = curLevel[propArr[i]];
				}
				curLevel[propArr[propArr.length-1]] = "";
			}
			propObj = proxy.queryProperties(propObj);
			return eval("propObj."+propName);
		};
		
		var updateProp = function(propName,val){
			var propObj = {};
			var curLevel = propObj;
			var propArr = propName.split(".");
			if (propArr.length > 1){
				for (var i=0;i<propArr.length-1;i++){
					curLevel[propArr[i]] = {};
					curLevel = curLevel[propArr[i]];
				}
				curLevel[propArr[propArr.length-1]] = val;
			}
			proxy.updateProperties(propObj);
		}
		
		switch(config.type){
			case "Boolean":
				$("<span>").text(config.label).appendTo($(div));
				var input = $("<input type='checkbox'>").prop("checked",getProp(config.path));
				input.click(function(){
					updateProp(config.path,input.prop("checked"));
				}).appendTo($(div));
				break;
			case "Text":
				$("<span>").text(config.label).appendTo($(div));
				var input = $("<input type='text'>").val(getProp(config.path));
				input.on("change",function(){
					updateProp(config.path,input.val());
				}).appendTo($(div));
		}
	};
	
	return {
				'charts': ['sh2.viz.ext.combinedchartc3'],
				'view': {
					'sections': [
						// Chart Title
						{
							"id": "sh2.viz.ext.combinedchartc3.propertyeditor.chart_title",
							"caption": 'Chart Title',
							"propertyZone": "plotArea",
							"groups": [
								{
									"id": "sh2.viz.ext.combinedchartc3.propertyeditor.chart_title.title.visible",
									"renderer" : renderer1,
									"config": {
										"property": "plotArea.title.visible",
										"label": "Show Chart Title",
										"type" : "Boolean"
									}
								},{
									"id" : "sh2.viz.ext.combinedchartc3.propertyeditor.chart_title.title.label",
									"renderer" : renderer1,
									"config" : {
										"property": "plotArea.title.label",
										"label": "Chart Title",
										"type" : "Text"
									}
								}
							]
						}, 
						//Plot Area
						{
							'id': 'sh2.viz.ext.combinedchartc3.propertyeditor.section.plotArea',
							'propertyZone': 'plotArea',
							'caption': 'Chart Area',
							"groups": [{
								"id": "sh2.viz.ext.combinedchartc3.propertyeditor.section.plotArea.chartoption.visible",
								'renderer': renderer1,
								"config": {
									"property": "plotArea.legend.visible",
									"label": "Show Legend?",
									"type" : "Boolean"
								}
							}]
						}
					]
				}
			};
});