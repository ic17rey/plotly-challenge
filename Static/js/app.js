// -----------------
// View all data from samples.json in the console
// -----------------

// Use D3 to connect to and read the JSON file data
d3.json('static/data/samples.json').then((importedData) => {
    console.log(importedData);
});     

// Console contains an object with 3 arrays (names, metadata and samples)


// -----------------
// Test Subject ID Numbers as drop down options
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

// -----------------
// Define the function that will display demographics
// -----------------

function renderData() {
    
    // var seeMe = d3.select('select').node()
    // console.log(seeMe)
    
    // Save the selected ID number to use for filtering 
    var sel = d3.select('select').node().value;
    console.log(`ID Number Selection: ${sel}`);

    // Use D3 to connect to and read JSON file demographics and samples
    d3.json('static/data/samples.json').then(({metadata, samples}) => {
        demo = metadata.filter(obj => obj.id == sel)[0];
        sample = samples.filter(obj => obj.id == sel)[0];
        console.log(demo, sample);
        
        // Append the keys and values for demographic info in the display panel
        d3.select('.panel-body').html('');
        Object.entries(demo).forEach(([key, val]) => {
            d3.select('.panel-body').append('h5').text(key.toUpperCase() +': ' +val)
        })
    });
};

function optionChanged() {
    renderData();
};