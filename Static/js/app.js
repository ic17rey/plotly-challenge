// -----------------
// View all data from samples.json in the console
// -----------------

// Use D3 to connect to and read the JSON file data
d3.json('static/data/samples.json').then((importedData) => {
    console.log(importedData);
});     

// Console contains an object with 3 arrays (names, metadata and samples)


// -----------------
// Test Subject ID Numbers as drop down options that will impact 
// other elements of interactive charts based on  the selection
// -----------------

// Use D3 to connect to and read the JSON file ID Numbers (stored as "names")
d3.json('static/data/samples.json').then(({names}) => {
    names.forEach(name => {
        
        // Append the ID numbers to the options for the dropdown
        d3.select('select').append('option').text(name);
    });
    
    // Call a function impacting other elements on the page for each selection in dropdown 
    renderData();
});

// Define the function that will display demographics
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
            d3.select('.panel-body').append('h5').text(key.toUpperCase() +': ' + val);
        
        // Identify the top 10 OTUs for the selected individual; plot horizontal bar

        // need to slice to only display top 10, need to reverse the order so bar chart reads top down
        // need the OTU ids to be the labels along the left
        d3.select('#bar').html('');
        //details = []
        //var results = Object.entries(sample).forEach(([key, val]) => {
          //  d3.select('#bar').sample.sort((a, b) => b.sample.sample_values - a.sample.sample_values);
        
        
          //Object.entries(sample).forEach(([keyB, valB]) => {
          //  details.append.text(keyB + ':' + valB)
          // console.log(sample);
        
        //var sortedSample = sample.sort((a, b) => b.sample.sample_values - a.sample.sample_values);
        //var sortedData = sample.sample_values.sort((a, b) => b.sample.sample_values - a.sample.sample_values);
        var slicedData = sample.otu_ids.slice(0, 10);
        var slicedData2 = sample.sample_values.slice(0, 10);
        var trace = {
            x: sample.sample_values,
            //x: slicedData2,
            //y: sample.otu_ids,
            y: slicedData,
            type: "bar",
            orientation: "h"
        };
        
        console.log(slicedData);
        var data = [trace];
        
        
         var layout = {
           title: "Top Ten OTUs for Selected Test Subject ID",
           xaxis: { title: "Sample Value" },
           yaxis: { title: "OTU ID" }
        };
          
        // Plot the chart with id "bar-plot"
        Plotly.newPlot("bar", data, layout);

        })
    });
};


function optionChanged() {
    renderData();
};


