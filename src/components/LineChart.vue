<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
} from 'chart.js'
//import { useHistorialStore } from '../stores/historialStore.js'

import { Line, Bar } from 'vue-chartjs'

//const historialStore = useHistorialStore();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
)

const chartData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  datasets: [
    {
      label: 'Ventas por mes',
      data: [100, 200, 150, 300],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Ventas Mensuales'
    }
  }
}

const barChartData = {
  labels: ['Action', 'Comedy', 'Drama', 'Horror','Romance','Sci-Fi','Thriller','Animation','Fantasy','Mistery','Adventure','Crime'],
  datasets: [
    {
      label: 'Ventas por Genero',
      data: [50, 75, 30, 90, 10, 20, 30, 12, 50, 20, 11, 40],
      backgroundColor: 'rgba(153, 102, 255, 0.6)'
    }
  ]
}

</script>

<template>
  <div class="chart-container">
    <h2>Gráfico de Ventas Mensuales</h2>
  <Line :data="chartData" :options="chartOptions" />

  
<h2 class="mt-5">Gráfico de ventas por genero</h2>
    <Bar :data="barChartData" :options="barChartOptions" />
<hr>



  </div>
</template>