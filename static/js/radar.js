
  function buildCharts() {
		d3.json("/project3/comments").then((data) => {
			var author = data.map( x => x.author);
			var domain = data.map(x => x.domain);
			var subreddit_name = data.map(x=> x.subreddit_name.substring(2,100));
			var created_date = data.map(x =>new Date(x.created_date));
			var num_comments = data.map(x => x.num_comments).sort();
			var ups = data.map(x => x.ups);
			var linktitle = data.map(x =>x.linktitle);
			var up_votes = data.map(x =>x.up_votes);
			var down_votes = data.map(x =>x.down_votes);
	
			console.log(author)
			console.log(domain)
			console.log(subreddit_name)
			console.log(created_date)
			console.log(num_comments)
			console.log(ups)
			console.log(linktitle)
			console.log(up_votes)
			console.log(down_votes);
			
			// Build a radar Chart
			var myConfig = {
				type : 'radar',
				plot : {
					aspect : 'area',
					animation: {
						effect:3,
						sequence:1,
						speed:700
					}
				},
				scaleV : {
					visible : false
				},
				scaleK : {
					values : '0:7:1',
					labels : linktitle.slice(0,6),
					item : {
						fontColor : '#607D8B',
						backgroundColor : "white",
						borderColor : "#aeaeae",
						borderWidth : 1,
						padding : '5 10',
						borderRadius : 10
					},
					refLine : {
						lineColor : '#c10000'
					},
					tick : {
						lineColor : '#59869c',
						lineWidth : 2,
						lineStyle : 'dotted',
						size : 20
					},
					guide : {
						lineColor : "#607D8B",
						lineStyle : 'solid',
						alpha : 0.3,
						backgroundColor : "#c5c5c5 #718eb4"
					}
				},
				series : [
					{
						values : num_comments.slice(0,6),
						text:'comments'
					},
					{
						values : up_votes.slice(0,6),
						lineColor : '#53a534',
						backgroundColor : '#689F38'
					}
				]
			};
			 
			zingchart.render({ 
				id : 'myChart', 
				data : myConfig, 
				height: '100%', 
				width: '100%' 
			});
		});
		}
		
		buildCharts();
