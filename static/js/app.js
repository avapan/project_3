
  function buildCharts() {
	d3.json("/project3/comments").then((data) => {
	  var author = data.map( x => x.author);
	  var domain = data.map(x => x.domain);
	  var subreddit_name = data.map(x=> x.subreddit_name.substring(2,100));
		var created_date = data.map(x =>new Date(x.created_date));
		var num_comments = data.map(x => x.num_comments);
		var ups = data.map(x => x.ups);
		var linktitle = data.map(x =>x.linktitle.substring(0,40));
		var up_votes = data.map(x =>x.up_votes);
    var down_votes = data.map(x =>x.down_votes);
    var year = data.map(x =>x.year);
    var month = data.map(x =>x.month);
    var created_month = data.map(x =>x.created_month)

		console.log(author)
		console.log(domain)
		console.log(subreddit_name)
		console.log(created_date)
		console.log(num_comments)
		console.log(ups)
		console.log(linktitle)
		console.log(up_votes)
    console.log(down_votes)
    console.log(year)
    console.log(month)
    console.log(created_month);
    
	  // Build a Bubble Chart
    var bubbleLayout = {
			
      margin: { t:0},
      hovermode: "closest",
     
    };

	  var bubbleData = [
		{
		  x: created_date,
		  y: domain,
		  mode: "markers",
		  marker: {
			size: num_comments/2,
			color: '#80ced6',
			colorscale: "Earth"
		  }
		}
	  ];
  
	  Plotly.plot("bubble", bubbleData, bubbleLayout);
  
	  // Build a Pie Chart
	  // HINT: You will need to use slice() to grab the top 10 sample_values,
	  // values and labels (10 each).
	  // var pieData = [
		// {
		//   values: num_comments.slice(0,10),
		// 	labels: linktitle.slice(0,10),
		// 	text: linktitle,

		// 	showlegend: false,
		// 	legend: {
		// 		x: 3
	  //   },
		// 	marker: {'colors': [
		// 		'#80ced6',
		// 		'#63BCE5',
		// 		'#4B9FE1',
		// 		'#7ED5EA',
		// 		'#28559A',
		// 		'#0F2557',
		// 		'#150734',
		// 		'#D56C2C',
		// 		'#FB9039',
		// 		'#646C79'
		// 	 ]},
		//   type: "pie"
		// }
	  // ];
  
	  // var pieLayout = {
		// width: 580,
		// height: 450,
		// margin: { t: 10, l: 270, r: 10 ,b: 10,pad:10 }
	  // };
  
		// Plotly.plot("pie", pieData, pieLayout);
		
		
	//BarChart
	// const svg = d3.select('svg');
  // const svgContainer = d3.select('#container');

  // //frame
  // const margin = 100;
  // const width = 1000*margin;
  // const height = margin;
  
  // //append to svg
  // const chart = svg .append('g')
  //                   .attr('transform',`translate(${margin},${margin})`);
  
  // //construct yaxis
  // const yScale = d3 .scaleLinear()
  //                   .range([0,height])
  //                  //define y axis limits
  //                   .domain([0,1600000]);
  // //y grid lines                 
  // const makeYLines = () => d3 .axisLeft()
  //                             .scale(yScale)                 
  // chart.append('g')
  //      .call(d3.axisLeft(yScale));
  
  // //construct xaxis
  // const xScale = d3 .scaleBand()
  //                   .range([0,width])
                   
  //                  //define x axis limits
  //                   .domain(subreddit_name)
  //                   .padding(0.2);

  
  // chart .append('g')
  //       .attr('transform', `translate(0, ${height})`)
  //       .call(d3.axisBottom(xScale));
  
  // chart .append('g')
  //       .call(d3.axisLeft(yScale));

  // //Load the Plot!
  // const bargroup =
  // chart .selectAll()
  //       .data(data)
  //       .enter()
  //       .append('g')

  //       bargroup
  //       .append('rect')
  //       .attr('x', (x)=> xScale(x.subreddit_name))
  //       .attr('y', (x)=> yScale(x.num_comments))
  //       .attr('height', (x)=> height-yScale(x.num_comments))
  //       .attr('width', xScale.bandwidth())
  //       .on('mouseenter', function (actual, i) {
  //         d3.selectAll('.num_comments')
  //           .attr('opacity', 0)
          
  //         d3.select(this)
  //           .transition()
  //           .duration(300)
  //           .attr('opacity', 0.6)
  //           .attr('x', (a) => xScale(a.subreddit_name) - 5)
  //           .attr('width', xScale.bandwidth() + 10)
          
  //         const y = yScale(actual.num_comments)
  //         line = chart.append('line')
  //                     .attr('id','limit')
  //                     .attr('x1',0)
  //                     .attr('x2',width)
  //                     .attr('y2',y)
          
  //         bargroup.append('text')
  //                 .attr('class','divergence')
  //                 .attr('x', (a) => xScale(a.subreddit_name) + xScale.bandwidth() / 2)
  //                 .attr('y', (a) => yScale(a.num_comments) + 30)
  //                 .attr('fill', 'white')
  //                 .attr('text-anchor', 'middle')
  //                 .text((a, idx) => {
  //         const divergence = (a.num_comments - actual.num_comments).toFixed(1)
            
  //           let text = ''
  //           if (divergence > 0) text += '+'
  //           text += `${divergence}%`

  //           return idx !== i ? text : '';
  //         })

  //     })

  //       .on('mouseleave', function () {
  //         d3.selectAll('.num_comments')
  //           .attr('opacity', 1)

  //         d3.select(this)
  //           .transition()
  //           .duration(300)
  //           .attr('opacity', 1)
  //           .attr('x', (a) => xScale(a.language))
  //           .attr('width', xScale.bandwidth())

  //       chart.selectAll('#limit').remove()
  //       chart.selectAll('.divergence').remove()
  //     })
      

  
  // //Tick Markers
  // chart .append('g')
  //       .attr('class', 'grid')
  //       .call(makeYLines()
  //       .tickSize(-width, 0, 0)
  //       .tickFormat('')
  //     )

  // chart .append('g')
  //       .attr('class', 'grid')
  //       .call(d3.axisLeft()
  //       .scale(yScale)
  //       .tickSize(-width, 0, 0)
  //       .tickFormat(''))

  // //Axis Labels
  // svg .append('text')
  //     .attr('x', -(height / 2) - margin)
  //     .attr('y', margin / 2.4)
  //     .attr('transform', 'rotate(-90)')
  //     .attr('text-anchor', 'middle')
  //     .text('Number of comments')

  // svg .append('text')
  //     .attr('x', width / 2 + margin)
  //     .attr('y', 40)
  //     .attr('text-anchor', 'middle')
  //     .text('Subreddit')
  // });
  
//chart.js - Bar Chart
var ctx = document.getElementById("myChart");  
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:author.slice(5,15),
      datasets: [{
        label:'# of Comments',
        data: num_comments.slice(5,15),
        backgroundColor:[
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 60, 64, 0.2)',
          'rgba(300, 159, 64, 0.2)',
          'rgba(64, 78, 64, 0.2)',
          'rgba(8, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 60, 64, 1)',
          'rgba(300, 159, 64, 1)',
          'rgba(64, 78, 64, 1)',
          'rgba(8, 159, 64, 1)',
      ],
      borderWidth: 1
    }]
  },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                    }
                  }]
                }
            }
        });

  //Build a pie chart with chart.js
  var myChart = document.getElementById('myPieChart').getContext('2d');
  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontsize = 18;
  Chart.defaults.global.defaultFontColor = '#777';
  var myNewChart = new Chart(myChart, {
    type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:subreddit_name.slice(310,330),
      datasets:[{
        label:'# of comments',
        data:num_comments.slice(310,330),
        
        // backgroundColor: 'green',
        backgroundColor:[
          '#629d9d',
          '#72a7a7',
          '#82b0b0',
          '#91baba',
          '#a1c4c4',
          '#b1cece',
          '#c0d8d8',
          '#d0e2e2',
          '#e0ebeb',
          '#eff5f5'
        ],
        borderWidth:1,
        borderColor:'white',
        hoverBorderWidth: 3,
        hoverBorderColor: 'grey'
      }]
    },
    options:{
      title:{
        display: true,
        fontSize:25
      },
      onClick:function(e){
        var activePoints = myNewChart.getElementsAtEvent(e);
        var selectedIndex = activePoints[0]._index;
        alert(this.data.datasets[0].data[selectedIndex]);
    
    
    },
      
      legend:{
        display:true,
        position:'right',
        labels:{
          fontColor: '#000'
        }
      },
      layout:{
        padding:{
          left:50,
          right:0,
          bottom:0,
          top:0
        }
      },
      tooltips:{
        enabled:true
      }
    }
  });






});
  }
  
	buildCharts();

 
  