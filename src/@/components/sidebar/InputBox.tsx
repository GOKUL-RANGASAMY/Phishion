

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Checks, Checksing } from "./LottiePlayer"


export function InputBox({ handleFormSubmit, handleInputChange, urlInput, isButtonDisabled }: any) {


    return (
    <>
        <div className="fixed items-center w-full text-center" >
            <form onSubmit={(e: any) => handleFormSubmit(e)}>
                <div className="flex m-10 items-center space-x-2">
                    <Input type="text" className="flex bg-white w-full h-[50px]" placeholder="URL LINK" value={urlInput} onChange={handleInputChange} /><br></br>
                    {!isButtonDisabled ?
                        (<>
                            <Button type="submit" variant="outline" className="bg-red-600 h-[50px]" disabled={isButtonDisabled} >
                            <Checksing/>
                            </Button>


                        </>
                        )
                        :
                        (
                            <>
                                <Button type="submit" variant="outline" className="bg-green-700 h-[50px]" disabled={isButtonDisabled} >
                                    
                                    <Checks/>
                                    </Button> <br></br>
                            </>
                        )
                    }


                </div>
            </form>


        </div>

    </>
    )
}

