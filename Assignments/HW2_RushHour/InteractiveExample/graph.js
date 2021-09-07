class ForceCanvas {
	constructor(path) {
		this.graphcanvas = d3.select("#ForceCanvas");
		this.nodes = [];
		let that = this;
		this.imWidth = 40;
		$.get(path, function(graph) {
			that.updateParams(graph.nodes, graph.links);
		});
	}
	 /** A callback function to handle start dragging on a node */
	dragstarted(d) {
		if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	/** A callback function to handle dragging on a node */
	dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	/** A callback function to handle drag release on a node */
	dragended(d) {
		if (!d3.event.active) this.simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

	/** A callback function to handle the animation */
	ticked() {
		this.links
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
	
		this.nodes
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });

		this.images
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; });
	}

	/** A callback function to handle zooming/panning */
	zoomed() {
		this.nodes.attr("transform", d3.event.transform);
		this.links.attr("transform", d3.event.transform);
		this.images.attr("transform", d3.event.transform);
	}

	/**
	 * Update the graph with information from a new song
	 */
	updateParams(nodes, links) {
		// With heavy inspiration from https://bl.ocks.org/mbostock/4062045
		let width = 800;
		let height = 800;

		this.simulation = d3.forceSimulation()
							.force("link", d3.forceLink().id(function(d) { return d.id; }))
							.force("charge", d3.forceManyBody())
							.force("center", d3.forceCenter(width / 2, height / 2));
		
		this.fac = 1; // Downsample factor for nodes in the graph

		// Clear all graph elements if any exist
		this.graphcanvas.selectAll("*").remove();
		this.graphcanvas.attr('width', width).attr('height', width);
		
		this.links = this.graphcanvas.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(links)
			.enter().append("line")
			.attr("stroke-width", function(d) { 
				let ret = Math.sqrt(d.value);
				console.log(ret);
				return ret; 
			})
			.attr("linkDist", 1)
			.attr("stroke", "black");
		
		this.nodes = this.graphcanvas.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(nodes)
			.enter().append("circle")
			.attr("r", 5)
			.attr("fill", function(d) { 
				var c = [0, 0, 0];
				return d3.rgb(c[0], c[1], c[2]); 
			});
		this.nodes.call(d3.drag()
			.on("start", this.dragstarted.bind(this))
			.on("drag", this.dragged.bind(this))
			.on("end", this.dragended.bind(this)));
		
		let that = this;
		this.images = this.graphcanvas.append("g")
			.attr("class", "images")
			.selectAll(".image")
			.data(nodes)
			.enter().append("svg:image")
			.attr("x", function(d){return d.x})
			.attr("y", function(d){return d.y})
			.attr("width", this.imWidth)
			.attr("height", this.imWidth)
			.attr("xlink:href", function(d, i) {
				return "States/" + i + ".png";
			});
		
		
		
		//this.nodes.on("dblclick", this.clicknode_panaudio.bind(this));

		this.simulation
			.nodes(nodes)
			.on("tick", this.ticked.bind(this));
		
		this.simulation.force("link")
			.links(links);
		
		this.graphcanvas.call(d3.zoom()
			.scaleExtent([1/4, 8])
			.on("zoom", this.zoomed.bind(this))
			.filter(function () {
				return d3.event.ctrlKey;
			}));

	}

	/**
	 * A function which toggles all of the visible elements to show
	 */
	show = function() {
		this.graphcontainer.style("display", "block");
	}

	/**
	 * A function which toggles all of the visible elements to hide
	 */
	hide = function() {
		this.graphcontainer.style("display", "none");
	}


	/**
	 * A fuction which highlights the node in the graph with the time closest
	 * to the current play time in the audio
	 */
	updateCanvas() {
		/*if (this.audio_obj.time_interval > 0) {
			var idx = this.audio_obj.audio_widget.currentTime / this.audio_obj.time_interval;
			idx = Math.round(idx/this.fac);
			this.nodes.attr("r", 
				function(d, i) {
					if (i == idx) {
						return 15;
					}
					return 5;
				});
		}*/
	}
	
	/**
	 * A function that should be called in conjunction with requestionAnimationFrame
	 * to refresh this canvas.  It continually highlights the node corresponding to
	 * the the closest position in audio, and it continually generates callbacks
	 * as long as the audio is playing, but stops generating callbacks when it is paused
	 * to save computation
	 */
	repaint() {
		this.updateCanvas();
	}

}
