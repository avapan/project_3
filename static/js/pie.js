
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
    
        //Build pie zing  chart
        var myConfig = {
            type: "pie", 
            plot: {
              borderColor: "#2B313B",
              borderWidth: 5,
              // slice: 90,
              valueBox: {
                placement: 'out',
                text: '%t\n%npv%',
                fontFamily: "Open Sans"
              },
              tooltip:{
                fontSize: '18',
                fontFamily: "Open Sans",
                padding: "5 10",
                text: "%npv%"
              },
              animation:{
             effect: 2, 
             method: 5,
             speed: 900,
             sequence: 1,
             delay: 3000
           }
            },
            source: {
              text: 'reddit',
              fontColor: "#8e99a9",
              fontFamily: "Open Sans"
            },
            title: {
              fontColor: "#8e99a9",
              text: '',
              align: "left",
              offsetX: 10,
              fontFamily: "Open Sans",
              fontSize: 25
            },
            subtitle: {
              offsetX: 10,
              offsetY: 10,
              fontColor: "#8e99a9",
              fontFamily: "Open Sans",
              fontSize: "16",
              text: '',
              align: "left"
            },
            plotarea: {
              margin: "20 0 0 0"  
            },
           series : [
               {
                   values : up_votes.slice(0),
                   text: linktitle.slice(0),
                 backgroundColor: '#50ADF5',
               },
               {
                 values: up_votes.slice(1),
                 text: linktitle.slice(1),
                 backgroundColor: '#FF7965',
                 detached:true
               },
               {
                 values: up_votes.slice(2),
                 text: linktitle.slice(2),
                 backgroundColor: '#FFCB45',
                 detached:true
               },
               {
                 text: up_votes.slice(3),
                 values: linktitle.slice(3),
                 backgroundColor: '#6877e5'
               },
               {
                 text: up_votes.slice(4),
                 values: linktitle.slice(4),
                 backgroundColor: '#6FB07F'
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