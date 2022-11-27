import "../../styles/warning_popup.css"

interface Props {
    setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>
    setLogOutConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogOut({ setButtonClicked, setLogOutConfirmation }: Props) {
    return (
        <>
            <div className="sm-box">
                <div>Are you sure you want to log out?</div>
                <div>   
                    <button className="confirmation-button no-button" onClick={() => {setLogOutConfirmation(false); setButtonClicked(false)}}>NO</button>
                    <button className="confirmation-button yes-button" onClick={() => {setLogOutConfirmation(true); setButtonClicked(false)}}>YES</button>
                </div>
            </div>
            <div className="modal-background"></div>
        </>
    )
}