# Plotly Challenge - Belly Button Biodiversity

### Challenge  
An interactive dashboard is used to explore Belly Button Biodiversity dataset.  The dataset catalogs the microbes that colonize human navels. Within the directory named static there are two folders.  The first is data and it contains the dataset, samples.json.  The second is static, which contains code for the dashboard, app.js (within the folder js), and index.html.

The microbial species are also called operational taxonomic units, or OTUs, in the study. Some OTUs are present in more than 70% of people.  Others are relatively rare.

### Step 1: Plotly
1. The D3 library is used to read in `samples.json` and a dropdown menu for choosing the Test Subject ID Number is created.  
2. A horizontal bar chart displays the top 10 OTUs found in that individual.
3. A bubble chart displays each sample for the individual.
4. The individual's demographics are displayed as key-value pairs.
5. Any time that a new sample is selected the charts will update.

### Advanced Challenge Assignment (Optional)
A Gauge Chart plots the weekly washing frequency of the individual.
