// import React from 'react';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from "d3";

function HomePage() {

    const dataSource = {
        labels: [],
        datasets: [
            {
            label: 'My First Dataset',
            data: [],
            backgroundColor: [
                '#8EA604',
                '#9AC2C9',
                '#FF6F59',
                '#1B4079',
                '#6D5A72',
                '#3E5641',
                '#FBB13C'
        ],
            hoverOffset: 4
        }]
      };
    const createChart = () => {
        var ctx = document.getElementById("myChart").getContext("2d");
        var existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy();
        }
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: dataSource
        });
      }
    
      const drawD3Chart = () => {
        const data = dataSource.datasets[0].data; 
        const labels = dataSource.labels; 
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
      
      
        const svg = d3.select("#dChart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
      
        
        const pie = d3.pie().value((d) => d);
      
        
        const arcData = pie(data);
      
        
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);
      
        
        svg.selectAll("path")
          .data(arcData)
          .enter()
          .append("path")
          .attr("d", arc)
          .attr("fill", (d, i) => dataSource.datasets[0].backgroundColor[i]);
      
        
        svg.selectAll("text")
          .data(arcData)
          .enter()
          .append("text")
          .attr("transform", (d) => `translate(${arc.centroid(d)})`)
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .text((d, i) => labels[i]);
      };
    
      const getBudget = () => {
        axios.get('/public/budget-data.json').then(function (res) {
          console.log(res);
          for (var i = 0; i < res.data.myBudget.length; i++) {
              dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
              dataSource.labels[i] = res.data.myBudget[i].title;
          }
          createChart();
          drawD3Chart();
      });
      }
      getBudget();

  return (
    <div id="main-content" class="container center">

        <div class="page-area">

            <div class="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div class="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div class="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div class="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </div>
    
            <div class="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div class="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div class="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div class="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </div>
            <div class="text-box">
                <h1>Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </div>
            <div class="text-box">
                <h1>D3JS Chart</h1>
                <p id="dChart">
                    
                    <div></div>
                </p>
            </div>

        </div>

    </div>
  );
}

export default HomePage;
