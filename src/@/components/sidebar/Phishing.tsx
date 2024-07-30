import { useState } from "react";

import axios from "axios";


import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import {
  PerfectScrollbar,
  initTE,
} from "tw-elements";
import { InputBox } from "./InputBox";
import { Response } from "./Response";
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { supabase } from "./supabase";
import Swal from 'sweetalert2';


initTE({ PerfectScrollbar });

Chart.register(CategoryScale);


export function Phishing() {
  const [visible, setVisible] = useState(false)
  const [home, setHome] = useState(true)
  const [ipaddress,setIpaddress]=useState('')


  const [urlInput, setUrlInput] = useState('');
  const [responseMessage, setResponseMessage] = useState<any>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [mailMessage, setMailMessage] = useState<any>(null);


  const [chartData, setChartData] = useState<any>(null);


  const handleInputChange = (event: any) => {
    setUrlInput(event.target.value);
  };
  const downloadPDF = () => {
    const pdf: any = new jsPDF({
      unit: 'mm',
      format: 'a4',
    });


    const formattedContent = responseMessage.reporting.replace(/\*\*(.*?)\*\*/g, '$1')


   
    console.log(pdf.internal.pageSize.width, "size");

    const lines = pdf.splitTextToSize(formattedContent, pdf.internal.pageSize.width + 200);


    pdf.autoTable({
      startY: 10,
      body: lines.map((line: any) => [line]),
    });


    const pdfname = `${urlInput}-document.pdf`
    pdf.save(pdfname);
  };


  const mailFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      
      const response = await axios.post('http://127.0.0.1:5000/mail', { url: urlInput });
      setMailMessage(response.data);
     
      console.log(response.data, "hhiiiiiii");
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };




  const handleFormSubmit = async (event: any) => {
    event.preventDefault();



    try {
      setHome(false);
      
      setIsButtonDisabled(true);
      const response = await axios.post('http://127.0.0.1:5000/predict', { url: urlInput });
      setResponseMessage(response.data);
      setIpaddress(response.data.ip_address);
      
      if(response.data.virustotal_result.status !=="Clean"){
     
      setTimeout(() => {
        setVisible(false)
      }, 3000)
    }
      setIsButtonDisabled(false);
      

      console.log(response.data, "hhiiiiiii");
      console.log(response.data.virustotal_result, "hii");
      console.log(response.data.ip_address,"ipppppppp")

      const value = response.data.virustotal_result.detection_percentage;

      setChartData({
        labels: ["Phishing", "Clean"],
        datasets: [
          {
            label: "Vendors",
            data: [value, 100 - value],
            backgroundColor: [
              "#e74c3c",
              "#2ecc71",
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });

      const { data, error } = await supabase
        .from('phishion')
        .upsert(
          {
            url:urlInput,
            domain_name: response.data.domain_name,
            ip_address:response.data.ip_address,
            prediction:response.data.prediction
          },
        );

      if (error) {
        console.error('Error storing data in Supabase:', error);
      }
      else {
        console.log("data", data);
      }
    } catch (error:any) {
      setHome(true);
      
      console.error('Error sending POST request:', error?.message);
      setIsButtonDisabled(false)
      
      console.log(error);      
      Swal.fire({
        icon: "warning",
        title: "Network Error",
        text: `${error?.request?.status} ${error?.request?.statusText}`,
        toast: error?.request?.status,
        footer: '<a href="">RETRY</a>',

        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {

          window.location.href = " "; 
        }
      });

      setHome(true)
      
    }
  };
  return (
    <div className=" flex bg-white h-screen">

      <InputBox mailFormSubmit={mailFormSubmit} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} urlInput={urlInput} isButtonDisabled={isButtonDisabled} />

      <Response mailFormSubmit={mailFormSubmit} ipaddress={ipaddress} home={home} visible={visible} downloadPDF={downloadPDF} mailMessage={mailMessage} urlInput={urlInput} responseMessage={responseMessage} isButtonDisabled={isButtonDisabled} chartData={chartData} />
    </div>


  )
}
