<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "BarGraph",
  props: {
    labels: Array,
    datasets: Array
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: this.datasets
      },
     {
        scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        },
    );
  }
};
</script>
