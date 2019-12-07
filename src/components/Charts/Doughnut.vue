<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['datasets'],
  mounted() {
    this.renderChart({
      labels: ['Waste', 'Crime', 'Accidents'],
      datasets: [{
        backgroundColor: [
          '#41B883',
          '#E46651',
          '#00D8FF'
        ],
        data: this.datasets
      }]
    }, {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: 'percentage',
          precision: 1
        },
        animation: {
          animateRotate: false
        }
      })
  }
};
</script>
