<template>
  <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "DashGraphic",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 900
    },
    height: {
      type: Number,
      default: 600
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      toDO: 0,
      inProgress: 0,
      toBePaid: 0,
      chartData: {
        labels: ['To Do', 'In Progress', 'To Be Paid'],
        datasets: [
          {
            label: 'Repairs',
            backgroundColor: [
              '#f44336',
              '#9c27b0',
              '#2196f3'
            ],
            data: [0, 0, 0]
          }
        ]
      },
      chartOptions: {
        responsive: false
      },
    };
  },
  mounted() {
    fetch("http://localhost:3000/repairs")
      .then(response => response.json())
      .then(data => {
        for (const key in data) {
          if (data[key].status === 0) {
            this.chartData.datasets[0].data[0] += 1;
          } else if (data[key].status === 1) {
            this.chartData.datasets[0].data[1] += 1;
          } else if (data[key].status === 2) {
            this.chartData.datasets[0].data[2] += 1;
          }
        }
      });
  },
}
</script>

<style scoped>

</style>