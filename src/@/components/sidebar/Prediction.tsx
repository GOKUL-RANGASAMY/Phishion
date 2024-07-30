


import { Input } from "../ui/input"

import { Label } from "../ui/label"



function Prediction({ responseMessage }: any) {


    return (<>
        {responseMessage && (
            <div>
                {responseMessage.status_code === 200 ?
                    (<div>
                        {
                            responseMessage.prediction === "Malicious" ?
                                (
                                    <>
                                        <div className="grid gap-4 py-3">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Prediction
                                                </Label>
                                                <Input id="Domain_Name" value={responseMessage.prediction} className="col-span-3 w-96" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Report
                                                </Label>
                                                <Input id="Domain_Name" value={responseMessage.google_report} className="col-span-3 w-96" />
                                            </div>
                                        </div>
                                    </>
                                ) : (<><div className="grid gap-4 py-4">
                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Label htmlFor="name" className="text-right">
                                            Prediction
                                        </Label>
                                        <Input id="Prediction" value={responseMessage.prediction} className="col-span-3" />
                                    </div>
                                </div></>)
                        }
                    </div>) : (<><br></br>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Label htmlFor="username" className="text-right">
                                Status Code
                            </Label>
                            <Input id="HTTP Status Code" value={responseMessage.status_code} className="col-span-3" />
                        </div>
                    </>)
                }
            </div>

        )}

    </>
    )
}

export default Prediction