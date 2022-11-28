import "../../styles/warning_popup.css"

interface Props {
    popUpRef: React.RefObject<HTMLDivElement>
    setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean | null>>
}

export default function WarningPopup({ popUpRef, setButtonClicked, setDeleteConfirmation }: Props) {
    return (
        <>
            <div className="sm-box fixed" ref={popUpRef}>
                <div>Are you sure you want to delete this note?</div>
                <div>   
                    <button className="confirmation-button no-button" onClick={() => {setDeleteConfirmation(false); setButtonClicked(false)}}>NO</button>
                    <button className="confirmation-button yes-button" onClick={() => {setDeleteConfirmation(true); setButtonClicked(false)}}>YES</button>
                </div>
            </div>
            <div className="modal-background"></div>
        </>
    )
}