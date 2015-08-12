define("js/flow", ["js/chartCreator"], function (chartCreator) {

	return {
		id : "sh2.viz.ext.combinedchartc3",
		init : function () {
			var flow = sap.viz.extapi.Flow.createFlow({
					id : 'sh2.viz.ext.combinedchartc3',
					name : 'Combined Chart using c3.js',
					dataModel : 'sap.viz.api.data.CrosstableDataset',
					type : 'DIV'
				});

			var element = sap.viz.extapi.Flow.createElement({
					id : 'sh2.viz.ext.combinedchartc3.module',
					name : 'Test Chart1 Module'
				});

			element.implement('sap.viz.elements.common.BaseGraphic', chartCreator);

			var d1 = {
				"id" : "sh2.viz.ext.combinedchartc3.XAxis",
				"name" : "XAxis",
				"type" : "Dimension",
				"min" : 1,
				"max" : 2,
				"aaIndex" : 1,
				"minStackedDims" : 1,
				"maxStackedDims" : Infinity
			};

			var f1 = {
				"id" : "sh2.viz.ext.combinedchartc3.LineYAxis",
				"name" : "Line on YAxis",
				"type" : "Measure",
				"min" : 0,
				"max" : Infinity,
				"mgIndex" : 1
			};

			var f2 = {
				"id" : "sh2.viz.ext.combinedchartc3.BarYAxis",
				"name" : "Bar on YAxis",
				"type" : "Measure",
				"min" : 0,
				"max" : Infinity,
				"mgIndex" : 2
			};

			var f3 = {
				"id" : "sh2.viz.ext.combinedchartc3.AreaYAxis",
				"name" : "Area on YAxis",
				"type" : "Measure",
				"min" : 0,
				"max" : Infinity,
				"mgIndex" : 3
			};

			var f4 = {
				"id" : "sh2.viz.ext.combinedchartc3.LineYAxis2",
				"name" : "Line on YAxis2",
				"type" : "Measure",
				"min" : 0,
				"max" : Infinity,
				"mgIndex" : 4
			};

			var f5 = {
				"id" : "sh2.viz.ext.combinedchartc3.BarYAxis2",
				"name" : "Bar on YAxis2",
				"type" : "Measure",
				"min" : 0,
				"max" : Infinity,
				"mgIndex" : 5
			};

			var f6 = {
				"id" : "sh2.viz.ext.combinedchartc3.AreaYAxis2",
				"name" : "Area on YAxis2",
				"type" : "Measure",
				"min" : 0,
				"max" : Infinity,
				"mgIndex" : 6
			};

			element.addFeed(d1);
			element.addFeed(f1);
			element.addFeed(f2);
			element.addFeed(f3);
			element.addFeed(f4);
			element.addFeed(f5);
			element.addFeed(f6);

			//properties
			element.addProperty({
				name : "legend",
				type : "Object",
				supportedValues : {
					visible : {
						name : "visible",
						type : "Boolean",
						supportedValues : [true, false],
						defaultValue: true
					}
				}
			});
			
			element.addProperty({
				name : "title",
				type : "Object",
				supportedValues : {
					visible : {
						name : "visible",
						type : "Boolean",
						supportedValues : [true, false],
						defaultValue: false
					},
					label : {
						name : "label",
						type : "String",
						defaultValue : ""
					}
				}
			});

			element.addProperty({
				name : "colorPalette",
				type : "StringArray",
				supportedValues : "",
				defaultValue : d3.scale.category20().range().concat(d3.scale.category20b().range()).concat(d3.scale.category20c().range())
			});

			flow.addElement({
				'element' : element,
				'propertyCategory' : 'plotArea'
			});

			sap.viz.extapi.Flow.registerFlow(flow);
		}
	};

});
