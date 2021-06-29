// -----------------
// View all data from samples.json in the console
// -----------------

// Use D3 to connect to and read the JSON file data
// Result is 3 arrays (names, metadata and samples)
d3.json('static/data/samples.json').then((importedData) => {
    console.log(importedData);
});     

// -----------------
// Test Subject ID Numbers to display as drop down options
// Other elements of interactive charts are impacted by the selection
// -----------------

// Use D3 to read the JSON file ID Numbers (stored as "names")
// and append the ID numbers to options for the dropdown
d3.json('static/data/samples.json').then(({names}) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    
    // function impacting other elements on the page for each selection made 
    renderData();
    });

// Define the function that will display demographics and impact other charts
function renderData() {
    
    // var seeMe = d3.select('select').node()
    // console.log(seeMe)
    
    // Save the selected ID number to use for filtering 
    var sel = d3.select('select').node().value;
    console.log(`ID Number Selection: ${sel}`);
    // console.log(typeof sel);

    // Use D3 to connect to and read JSON file demographics and samples
    d3.json('static/data/samples.json').then(({metadata, samples}) => {
        demo = metadata.filter(obj => obj.id == sel)[0];
        sample = samples.filter(obj => obj.id == sel)[0];
        console.log(demo, sample);
        
        // Append the keys and values for demographic info in the display panel
        d3.select('.panel-body').html('');
        Object.entries(demo).forEach(([key, val]) => {
            d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`);
        
        // Identify the top 10 OTUs for the selected individual; plot horizontal bar

        // need the OTU ids to be the labels along the left with bars evenly spaced
        d3.select('#bar').html('');
        // Object.entries(sample).forEach(([key, val]) => {   
        var slicedData = sample.sample_values.slice(0, 10);
        var ylabels = sample.otu_ids.slice(0, 10);
        console.log(`ylabels: ${ylabels}`);
        console.log(slicedData);
        //});         
        // var slicedData2 = sample.otu_ids.slice(0, 10);
        var trace = {
            //x: sample.sample_values,
            x: slicedData.reverse(),
            y: ylabels[0],
            // y: ylabels,
            //y: slicedData2,
            type: "bar",
            orientation: "h",
        };
        
        var data = [trace];
        
           var layout = {
           title: "Top Ten OTUs for Selected Test Subject ID",
           xaxis: { title: "Sample Value" },
           yaxis: { title: "OTU ID"}
        };
          
        // Plot the chart with id "bar-plot"
        Plotly.newPlot("bar", data, layout);
        
        // Set up the trace, data and layout for a Bubble plot
        d3.select('#bubble').html('');
        var trace2 = {
            type: "scatter",
            mode: "markers",
            x: sample.otu_ids,
            y: sample.sample_values,
            marker: {
                color: sample.otu_ids,
                colorscale: 'YlGnBu',
                size: sample.sample_values,
                sizeref: .04,
                sizemode: 'area'
            },
            //Include the OTU label when hovering over a bubble
            text: sample.otu_labels        
            
        };
        
        var data2 = [trace2];
        
        var layout2 = {
            title: "Samples for Selected Test Subject ID",
            xaxis: { title: "Microbial Species (OTU ID)"},
            yaxis: { title: "Sample Value"},
            text: sample.otu_labels,
            //Adding hovermode includes both the x and y coordinate while hovering
            hovermode: "closest"     
        };
        
        Plotly.newPlot("bubble", data2, layout2)
        });
    })
};

// Run the function to update the visualizations when a selection is made in the dropdown
function optionChanged() {
    renderData();
};


