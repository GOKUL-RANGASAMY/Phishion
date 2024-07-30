import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


export function TableContent ({responseMessage}:any) {
    return (<>
        <div className="grid grid-cols-2 items-center gap-4 bg-red-200">
            <div className=" col-span-4 text-left h-full overflow-auto">
                <Table>
                    <TableCaption className="bg-[#3498db] p-4 text-[#ffffff]">Dectected from Virus Total.</TableCaption>
                    <TableHeader className="bg-[#3498db] text-[#ffffff]">
                        <TableRow>
                            <TableHead >Vendor</TableHead>
                            <TableHead>Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {responseMessage.virustotal_result.detected_scanners.map((scanner: any, index: any) => (
                            <TableRow className="bg-[#ecf5f1] text-[#2c3e50]" key={index}>
                                <TableCell>{scanner.vendor}</TableCell>
                                <TableCell>{scanner.result}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>



        </div>
    </>
    )
}