//import React from 'react';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Token from './Token';
import Chart from 'chart.js/auto';
import * as d3 from "d3";


function DashboardPage() {
    
    const [budgetData, setBudgetData] = useState([]);
    const [isd3ChartCreated, setIsd3ChartCreated] = useState(false);

  useEffect(() => { //https://personal-budget-ylt5a.ondigitalocean.app/user-data.json
    axios.get('./user-data.json') // http://localhost:3000/user-data.json
      .then((res) => {

        
        const userData = res.data.myUser;
        const userBudgetData = userData[0].myBudget; 
        
        setBudgetData(userBudgetData);
        createChart(userBudgetData);
        createBarChart(userBudgetData);
        createRadarChart(userBudgetData);
        D3JSchart(userBudgetData);

        // setBudgetData(res.data.myBudget);
        // createChart(res.data.myBudget);
        // createBarChart(res.data.myBudget);
        // createRadarChart(res.data.myBudget);

        if (!isd3ChartCreated) {
          //D3JSchart(res.data.myBudget);
          D3JSchart(userBudgetData);
          setIsd3ChartCreated(true);
        }
      })
      .catch((error) => {
        console.error('Error while fetching the data:', error);
      });
  }, [isd3ChartCreated]);

  
  function createChart(data) {
    const ctx = document.getElementById("myChart").getContext("2d");

    const availableChart = Chart.getChart(ctx);
    if (availableChart) {
      availableChart.destroy();
    }

    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: [
                '#8EA604',
                '#9AC2C9',
                '#FF6F59',
                '#1B4079',
                '#6D5A72',
                '#3E5641',
                '#FBB13C'
          ],
        }],
      },
    });
  }

  function createBarChart(data) {
    const ctx = document.getElementById("barChart").getContext("2d");

    const availableChart = Chart.getChart(ctx);
    if (availableChart) {
      availableChart.destroy();
    }

    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: [
                '#8EA604',
                '#9AC2C9',
                '#FF6F59',
                '#1B4079',
                '#6D5A72',
                '#3E5641',
                '#FBB13C'
          ],
        }],
      },
      options: {
        plugins:{
            legend: { 
                display: false 
            }
        }
        
        }
    });
  }

  function createRadarChart(data) {
    const ctx = document.getElementById("radarChart").getContext("2d");

    const availableChart = Chart.getChart(ctx);
    if (availableChart) {
      availableChart.destroy();
    }

    const myRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: [
                '#8EA604',
                '#9AC2C9',
                '#FF6F59',
                '#1B4079',
                '#6D5A72',
                '#3E5641',
                '#FBB13C'
          ],
        }],
      },
      options: {
        plugins:{
            legend: { 
                display: false 
            }
        }
        
        }
    });
  }

  function D3JSchart(data) {
    var width = 450;
    var height = 300;
    var radius = Math.min(width, height) / 2;

    if ("#dChart") {
      d3.select("#dChart").selectAll('*').remove();
    }

    const svg = d3.select("#dChart")
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    var colorScale = d3.scaleOrdinal()
      .range(['#8EA604',
      '#9AC2C9',
      '#FF6F59',
      '#1B4079',
      '#6D5A72',
      '#3E5641',
      '#FBB13C']);

    const pieChart = d3.pie()
      .value(d => d.budget);

    const arc = d3.arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8);

    var slice = svg.selectAll(".slice")
      .data(pieChart(data))
      .enter()
      .append("g")
      .attr("class", "slice");

    slice.append("path")
      .attr("d", arc)
      .style("fill", function (d, i) { return colorScale(i); })
      .style("stroke", "white")
      .style("stroke-width", 2);


    slice.append("text")
      .attr("transform", function (d) {
        var pos = arc.centroid(d);
        pos[0] *= 1.55;
        pos[1] *= 1.55;
        return "translate(" + pos + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function (d, i) { return d.data.title; });


    slice.append("polyline")
      .attr("points", function (d) {
        var pos = arc.centroid(d);
        pos[0] *= 1.5;
        pos[1] *= 1.5;
        return [arc.centroid(d), pos];
      })
      .attr("fill", "none")
      .attr("stroke", "black");

  }
  return (
    <div id="main-content" className="container center">
            <Token/>
        <div className="page-area">

            
            <div className="text-box">
                
                <h1>Hey User!</h1> 
                <p>
                Welcome to our personal budget tracking app! Take charge of your finances effortlessly with our intuitive 
                interface and powerful features. Gain valuable insights into your spending habits, set achievable goals, 
                and visualize your progress with interactive charts. With our app, managing your budget has never been easier.
                </p>
            </div>
    
            <div className="text-box">
                <h1>Visualize Your Journey</h1>
                <p>
                Unlock the power of data visualization with our dynamic charts and graphs. Track your income, expenses, 
                and savings in real-time, empowering you to make informed financial decisions.
                </p>
            </div>
            <div className="text-box">
                <h1>Pie Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </div>
            <div className="text-box">
                <h1>D3JS Chart</h1>
                <p id="dChart">
                    <div></div>
                </p>
            </div>
            
            <div className="text-box">
                <h1>Bar Chart</h1>
                <p>
                <canvas id="barChart" width="400" height="400"></canvas>
                </p>
            </div>

            <div className="text-box">
                <h1>Radar Chart</h1>
                <p>
                <canvas id="radarChart" width="400" height="400"></canvas>
                </p>
            </div>

        </div>
    </div>
  );


}

export default DashboardPage;
