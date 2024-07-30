
import { Pie } from "react-chartjs-2";

function PieCharts({ chartData }:any) {
  return (
    <div >
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
    <div className="flex justify-center h-full w-full">
      
      <Pie 
    
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Virus total Statistics"
            }
          }
        }}
      />
    </div>
    </div>
  );
}
export default PieCharts;