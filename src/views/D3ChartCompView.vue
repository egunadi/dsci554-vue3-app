<template>
  <div class="d3ChartComp">

    <h1 class="mt-3">D3 Chart Composition API</h1>

    <button type="button" class="btn btn-danger me-2" @click="clear">Clear</button>
    <button type="button" class="btn btn-primary me-2" @click="reset">Reset</button>
    <button type="button" class="btn btn-secondary" @click="invert">Invert</button>

    <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>
    <svg width="400" height="300" id="chart"></svg>

    <h2>Data</h2>
    {{message}}
    <pre><code>{{data}}</code></pre>

  </div>
</template>

<script setup>
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore'

const store = useChartStore();
const message = ref('Data was set from store');
const data = ref([]);

function clear() {
  const svg = d3.select('#chart');
  svg.selectAll('rect')
    .remove();
  svg.selectAll('text')
    .remove();
}

function reset() {
  data.value = JSON.parse(JSON.stringify(store.planets));
  clear();
  barChart(data.value);
}

function invert() {
  data.value.reverse();
  clear();
  barChart(data.value);
}

function updateText(d) {
  d3.select('#chart')
    .select('#text')
    .text(d.label);
}

function barChart(data) {
  console.log('barChart')
  var svg = d3.select('#chart');
  var enter = svg.selectAll('rect')
    .data(data)
    .enter();

  enter.append('rect')
    .attr('x', 100)
    .attr('y', (d, i) => 20 + i * 25)
    .attr('width', d => d.dist / 25)
    .attr('class', 'bar')
    .on('click', (event, d) => updateText(d));

  enter.append('text')
    .attr('x', 90)
    .attr('y', (d, i) => 30 + i * 25)
    .attr('class', 'label')
    .text(d => d.label)
    .on('click', (event, d) => updateText(d));

  enter.append('text')
    .attr('x', d => 150 + d.dist / 25)
    .attr('y', (d, i) => 30 + i * 25)
    .attr('class', 'value')
    .text(d => Number(d.dist).toLocaleString())
    .on('click', (event, d) => updateText(d));

  enter.append('text')
    .attr('x', 300)
    .attr('y', 100)
    .attr('id', 'text')
    .attr('class', 'value');

}

onMounted(() => {
  if (!store.planets) {
    d3.json('planets.json').then(result => {
      store.planets = result;
      data.value = JSON.parse(JSON.stringify(store.planets));
      message.value = `Data was loaded from file, contains ${store.planets.length} rows`;
      barChart(store.planets);
    });
  } else {
    barChart(store.planets);
  }
});
</script>

<style scoped>
.title {
  font-size: 1vw;
  color:hsla(160, 100%, 37%, 1);
}

pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
}

:deep(text.label) {
  text-anchor: end;
  alignment-baseline: middle;
  font-size: 12px;
  fill: #eee;
}

:deep(text.value) {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 12px;
  text-anchor: end;
  alignment-baseline: middle;
  fill: #eee;
}

:deep(rect.bar) {
  text-align: right;
  vertical-align: middle;
  fill:hsla(160, 100%, 37%, 1);
  height: 20px;
}
</style>
