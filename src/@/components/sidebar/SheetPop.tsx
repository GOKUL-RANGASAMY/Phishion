import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ToastSimple } from "./toastss"

import { useState } from "react"
import axios from "axios";
import { supabase } from "./supabase";




export function SheetPop({ responseMessage, setMailMessage, downloadPDF, ipaddress, urlInput }: any) {
    const [email, setEmail] = useState('')
    const emailInputChange = (event: any) => {
        setEmail(event.target.value);
    };
    console.log(ipaddress,"ipaddress")
    const mailFormSubmit = async (event: any) => {
        event.preventDefault();

        try {
            // setLoading(true);

            const response = await axios.post('http://127.0.0.1:5000/mail', { url: urlInput, email: email });
            setMailMessage(response.data);
            console.log(ipaddress,"ipaddress")
            const { data, error } = await supabase
                .from('phishion')
                .upsert(
                    {
                        email: email
                    },
                ).eq('ip_address', ipaddress);

            if (error) {
                console.error('Error storing data in Supabase:', error);
            }
            else {
                console.log("data", data);
            }


            console.log(response.data, "hhiiiiiii");
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    return (<>

        {responseMessage && (<>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="" variant="outline">Domain Information</Button>
                </SheetTrigger>


                {responseMessage.status_code === 200 ?
                    (
                        <SheetContent className="bg-white">

                            <SheetHeader>
                                <SheetTitle>Domain Info</SheetTitle>
                                <SheetDescription>
                                    The Domain Details of Predicted URL link
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Prediction
                                    </Label>
                                    <Input id="Domain_Name" value={responseMessage.prediction} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Domain Name
                                    </Label>

                                    <Input id="Domain_Name" value={responseMessage.domain_name} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        IP Address
                                    </Label>
                                    <Input id="crlDistributionPoints" value={responseMessage.ip_address} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Final Redirect
                                    </Label>
                                    <Input id="Final Redirect" value={responseMessage.final_url} className="col-span-3" />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Serial Number
                                    </Label>
                                    <Input id="Serial Number" value={responseMessage.SSL_TLS_Certificate_Information.serialNumber} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        OCSP
                                    </Label>
                                    <Input id="OCSP" value={responseMessage.SSL_TLS_Certificate_Information.OCSP} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        {/* Issuer */}
                                        {responseMessage.SSL_TLS_Certificate_Information.issuer[0][0][0]}
                                    </Label>
                                    <Input id="Issuer" value={responseMessage.SSL_TLS_Certificate_Information.issuer[0][0][1]} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="flex text-right">
                                        {/* Issuer */}
                                        {responseMessage.SSL_TLS_Certificate_Information.issuer[1][0][0]}
                                    </Label>
                                    <Input id="Issuer" value={responseMessage.SSL_TLS_Certificate_Information.issuer[1][0][1]} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Version
                                    </Label>
                                    <Input id="Version" value={responseMessage.SSL_TLS_Certificate_Information.version} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        NotAfter
                                    </Label>
                                    <Input id="NotAfter" value={responseMessage.SSL_TLS_Certificate_Information.notAfter} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        NotBefore
                                    </Label>
                                    <Input id="NotBefore" value={responseMessage.SSL_TLS_Certificate_Information.notBefore} className="col-span-3" />
                                  
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button  >Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    ) : (<> <SheetContent>

                        <SheetHeader>
                            <SheetTitle>Domain Info</SheetTitle>
                            <SheetDescription>
                                The Domain Details of Predicted URL link
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                HTTP Status Code
                            </Label>
                            <Input id="HTTP Status Code" value={responseMessage.status_code} className="col-span-3" />
                        </div>
                    </SheetContent></>)
                }
            </Sheet>
            <form onSubmit={(e: any) => mailFormSubmit(e)}>
                <div className="flex my-2 items-center space-x-2">
                    <Input className="w-72" type="text" placeholder="enter your email id" value={email} onChange={emailInputChange} />
                    <Button type="submit" variant="outline" className=""  >
                        <ToastSimple />
                    </Button>
                </div></form>
            <Button variant="outline" className=" bg-black-200" onClick={downloadPDF}>
                Generate PDF
            </Button>
        </>
        )
        }

    </>
    )
}