define("js/chartCreator", ["otherJS/d3v3","otherJS/c3"], function (d3,c3) {
	var __dispatch = d3.dispatch("initialized", "startToInit", "barData", "selectData");

	return {
		dispatch : function (_) {
			if (!arguments.length) {
				return __dispatch;
			}
			__dispatch = _;
			return this;
		},
		render : function (cont) {
			__dispatch.startToInit();

			$(cont[0][0]).html("").css("display","table");
			var prop = this.properties();
			var cat = [];
			
			if (prop.title.visible && prop.title.label != ""){
				$("<div>").text(prop.title.label).css({
					width: "100%",
					"text-align": "center",
					"font-size": "13pt",
					"font-weight" : "bold"
				}).appendTo($(cont[0][0]));
			}

			var chartArea = $("<div>").css({
				"height" : "100%"
			}).appendTo($(cont[0][0]));
			
			var chartOptions = {
				bindto : chartArea[0],
/**				size : {
					width : this._width,
					height : this._height
				},**/
				color : {
					pattern : prop.colorPalette
				},
				data : {
					columns : [],
					types : {},
					axes : {},
					labels:{
						show: true,
						format : function(v,id,i,j){
								if (chartOptions.data.axes){
									if (i == 0 & chartOptions.data.axes[id]=="y")
										return String.fromCharCode(9754);
									if (i== (cat.length-1) && chartOptions.data.axes[id]=="y2")
										return String.fromCharCode(9755);
								}
							}
						
					}
				},
				axis : {
					x : {
						show : true,
						type : "category",
						height: 70,
						tick : {
							rotate : -45,
							multiline : false,
							culling:{
								max: 20
							},
							format: function(val){
								var tick = cat[val];
								if (tick.length > 12) return tick.substr(0,9)+"...";
								else return tick;
							}
						},
						categories: cat
					},
					y : {
						show : true,
						tick: {
							format: d3.format(",.3s")
						}
					},
					y2 : {
						show : false,
						tick: {
							format: d3.format(",.3s")
						}
					}
				},
				legend : {
					show : prop.legend.visible,
					position: "right"
				},
				tooltip:{
					show: true,
					format: {
						title: function(val){
							return cat[val].split("/").join("<br>");
						}
					}
				},
				grid : {
					y : {
						show : true,
						lines:[
							{ value: 0, axis: "y"},
							{ value: 0, axis: "y2"}
						]
					}
				}
			};

			var maxLabelLength = 0;
			var x = this._data.dataset._dataSet.analysisAxis;
			if (x.length > 0)
				x = x[0].data;
			for (var i = 0; i < x[0].values.length; i++) {
				var label = "";
				for (var j = 0; j < x.length; j++) {
					if (j > 0)
						label += "/";
					label += x[j].values[i];
				}
				if (label.length > maxLabelLength) maxLabelLength = label.length;
				cat.push(label);
			}
			if (maxLabelLength > 12) maxLabelLength = 12;
			chartOptions.axis.x.height = Math.ceil(14+maxLabelLength*70/12);
			
			var serCounter = 0;
			var isY = false,
			isY2 = false;
			var z_order = {};
			for (var i = 0; i < this._data.feeding.length; i++) {
				var feed = this._data.feeding[i];
				var a = feed.feedId.split(".");
				var item = a[a.length - 1];
				if (item == "XAxis")
					continue;

				var feedsets = this._data.dataset._dataSet.measureValuesGroup[feed.binding[0].index - 1].data;

				for (var j = 0; j < feedsets.length; j++) {
					var name = feedsets[j].name;	
					while (chartOptions.data.axes[name] != undefined){
						name += "_";
					}
					chartOptions.data.columns.push([name].concat(feedsets[j].values[0]));


					if (item[item.length - 1] == "2") {
						chartOptions.data.axes[name] = "y2";
						isY2 = true;
					} else {
						chartOptions.data.axes[name] = "y";
						isY = true;
					}

					switch (item.substr(0, 3)) {
					case "Lin":
						chartOptions.data.types[name] = "spline";

						if (chartOptions.data.axes[name] == "y")
							z_order[name] = 13;
						else
							z_order[name] = 14;
						break;
					case "Are":
						chartOptions.data.types[name] = "area-spline";
						if (chartOptions.data.axes[name] == "y")
							z_order[name] = 9;
						else
							z_order[name] = 10;
						break;
					case "Bar":
						chartOptions.data.types[name] = "bar";
						if (chartOptions.data.axes[name] == "y")
							z_order[name] = 11;
						else
							z_order[name] = 12;
						break;
					}
				}
			}

			if (isY) {
				if (isY2) {
					chartOptions.axis.y2.show = true;
					chartOptions.grid.y.show = false;
				}else{
					delete chartOptions.data.axes;
				}
			} else {
				if (isY2) {
					delete chartOptions.data.axes;
				}
			}

			if (chartOptions.data.columns.length == 0) {
				__dispatch.initialized({
					name : "initialized"
				});
				$("<div>").text("Select some measures, please").appendTo($(cont[0][0]));
				return;
			}
			
			var chart = c3.generate(chartOptions);
			d3.selectAll(".c3-shapes").sort(function (a, b) {
				if (z_order[a.id] < z_order[b.id])
					return -1;
				else
					return 1;
			});

			__dispatch.initialized({
				name : "initialized"
			});
		}
	};
});
