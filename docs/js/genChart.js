let batteryRadarChart;

function generateChart() {
  // Get input values from the form
  const voltage = document.getElementById('voltage').value;
  const current = document.getElementById('current').value;
  const temperature = document.getElementById('temperature').value;

  // If chart already exists, destroy it to avoid duplicate charts
  if (batteryRadarChart) {
    batteryRadarChart.destroy();
  }

  // Radar chart data and configuration
  const ctx = document.getElementById('batteryRadarChart').getContext('2d');
  batteryRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Voltage', 'Current', 'Temperature'],
      datasets: [
        {
          label: 'Input Data',
          data: [voltage, current, temperature],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Ideal Levels',
          data: [100, 100, 100],  // Example ideal values for reference
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: 100, // Adjust based on the maximum expected input
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
      }
    }
  });
}