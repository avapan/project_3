


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
      
      
// timeline
var lookup = {};
function getData(created_date, subreddit_name) {
  var byCreated_date, trace;
  if (!(byCreated_date = lookup[created_date])) {;
    byCreated_date = lookup[created_date] = {};
  }
   // If a container for this year + continent doesn't exist yet,
   // then create one:
  if (!(trace = byCreated_date[subreddit_name])) {
    trace = byCreated_date[subreddit_name] = {
      x: [],
      y: [],
      id: [],
      text: [],
      marker: {size: []}
    };
  }
  return trace;
}

// Go through each row, get the right trace, and append the data:
for (var i = 0; i < data.length; i++) {
  var datum = data[i];
  var trace = getData(datum.created_date, datum.subreddit_name);
  trace.text.push(datum.domain);
  trace.id.push(datum.domain);
  trace.x.push(datum.num_comments);
  trace.y.push(datum.up_votes);
  trace.marker.size.push(datum.num_comments);
}

// Get the group names:
var created_dates = Object.keys(lookup);
// In this case, every year includes every continent, so we
// can just infer the continents from the *first* year:
var firstCreated_date = lookup[created_dates[0]];
var subreddits = Object.keys(firstCreated_date);

// Create the main traces, one for each continent:
var traces = [];
for (i = 0; i < subreddits.length; i++) {
  var data = firstCreated_date[subreddits[i]];
   // One small note. We're creating a single trace here, to which
   // the frames will pass data for the different years. It's
   // subtle, but to avoid data reference problems, we'll slice
   // the arrays to ensure we never write any new data into our
   // lookup table:
  traces.push({
    name: subreddits[i],
    x: data.x.slice(),
    y: data.y.slice(),
    id: data.id.slice(),
    text: data.text.slice(),
    mode: 'markers',
    marker: {
      size: data.marker.size.slice(),
      sizemode: 'area',
      sizeref: 2
    }
  });
}

// Create a frame for each year. Frames are effectively just
// traces, except they don't need to contain the *full* trace
// definition (for example, appearance). The frames just need
// the parts the traces that change (here, the data).
var frames = [];
for (i = 0; i < created_dates.length; i++) {
  frames.push({
    name: created_dates[i],
    data: subreddits.map(function (subreddit_name) {
      return getData(created_dates[i], subreddit_name);
    })
  })
}

// Now create slider steps, one for each frame. The slider
// executes a plotly.js API command (here, Plotly.animate).
// In this example, we'll animate to one of the named frames
// created in the above loop.
var sliderSteps = [];
for (i = 0; i < created_dates.length; i++) {
  sliderSteps.push({
    method: 'animate',
    label: created_dates[i],
    args: [[created_dates[i]], {
      mode: 'immediate',
      transition: {duration: 300},
      frame: {duration: 300, redraw: false},
    }]
  });
}

var layout = {
  xaxis: {
    title: 'Total Ups',
    range: [-2000, 25000]
  },
  yaxis: {
    title: 'Total Comments',
    type: 'log'
  },
  hovermode: 'closest',
   // We'll use updatemenus (whose functionality includes menus as
   // well as buttons) to create a play button and a pause button.
   // The play button works by passing `null`, which indicates that
   // Plotly should animate all frames. The pause button works by
   // passing `[null]`, which indicates we'd like to interrupt any
   // currently running animations with a new list of frames. Here
   // The new list of frames is empty, so it halts the animation.
  updatemenus: [{
    x: -200,
    y: 0,
    yanchor: 'top',
    xanchor: 'left',
    showactive: false,
    direction: 'left',
    type: 'buttons',
    pad: {t: 87, r: 10},
    buttons: [{
      method: 'animate',
      args: [null, {
        mode: 'immediate',
        fromcurrent: true,
        transition: {duration: 300},
        frame: {duration: 500, redraw: false}
      }],
      label: 'Try Me'
    }, {
      method: 'animate',
      args: [[null], {
        mode: 'immediate',
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
      }],
      label: 'Bored'
    }]
  }],
   // Finally, add the slider and use `pad` to position it
   // nicely next to the buttons.
  sliders: [{
    pad: {l: 130, t: 55},
    currentvalue: {
      visible: true,
      prefix: 'Dates',
      xanchor: 'right',
      font: {size: 20, color: '#666'}
    },
    steps: sliderSteps
  }]
};

// Create the plot:
Plotly.plot('myDiv', {
  data: traces,
  layout: layout,
  frames: frames,
});


});
}

buildCharts();