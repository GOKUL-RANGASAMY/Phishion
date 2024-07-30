
import { SheetPop } from "./SheetPop";
import Prediction  from "./Prediction";
import { TableContent } from "./tablecontent";
// import { Button } from "../ui/button"
import PieCharts from "./piechart";
import {
    PerfectScrollbar,
    initTE,
} from "tw-elements";


import 'jspdf-autotable';

import { Home, Lottie, Warning } from "./LottiePlayer";





initTE({ PerfectScrollbar });

export function Response({ responseMessage, chartData, downloadPDF,ipaddress, isButtonDisabled, visible, home ,urlInput}: any) {

    return (<>
        {home && <div className="flex justify-center items-center px-[450px] h-screen">
            <Home/>
            

        </div>}
        {isButtonDisabled ? (<>

            <div className="flex justify-center items-center px-[450px] h-screen">
                <Lottie />
            </div>



        </>) : (<>
            {visible &&
                <div className="flex justify-center items-center px-[450px] h-screen">
                    <Warning /><br></br>
                </div>
            }
            {responseMessage && (

                <div className="flex  pt-24 grid grid-cols-2 grid-rows-4 gap-1 h-screen">
                    {responseMessage.virustotal_result.status === "Malicious" ? (
                        <>

                            {!visible && (<><div className="row-start-1 row-span-2 bg-gray-100">

                                <div className="mx-10 mt-0" >
                                    <Prediction responseMessage={responseMessage} />
                                    <SheetPop downloadPDF={downloadPDF} responseMessage={responseMessage} urlInput={urlInput} />

                                </div>
                            </div>
                                
                                <div className="row-start-3 row-span-2 overflow-auto bg-gray-100 ">
                                    <TableContent responseMessage={responseMessage} />
                                </div>
                              

                                <div className=" col-start-2 row-start-3 row-span-2 space-x-4 bg-gray-100 h-full w-full overflow-auto ">
                                   


                                    <div className="mb-10 mt-5 overflow whitespace-pre-wrap p-4">

                                        <div dangerouslySetInnerHTML={{ __html: responseMessage.reporting.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                    </div>


                                </div>

                                <div className="flex col-start-2 row-start-1 row-span-2 items-center justify-center justify-items-center bg-gray-100">
                                    <PieCharts chartData={chartData} />
                                </div>
                            </>)}


                        </>
                    ) : (<>
                        <div className="row-start-1 row-span-4 bg-gray-100">
                            <div className="mx-10" >
                                <Prediction responseMessage={responseMessage} />
                                <SheetPop  ipaddress={ipaddress} downloadPDF={downloadPDF} responseMessage={responseMessage} urlInput={urlInput} />


                            </div>
                        </div>

                        <div className=" col-start-2 row-start-1 row-span-4 space-x-4 bg-gray-100 h-full w-full overflow-auto p-4 ">
                            

                            <div className="whitespace-pre-wrap">

                                <div dangerouslySetInnerHTML={{ __html: responseMessage.reporting.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                            </div>


                        </div></>)}


                </div>


            )}
        </>)}

    </>
    )
}