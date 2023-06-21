export default function Modal({setIsDelete, handleDelete}){
    return (
        <div className="background">
            <div className="modal">
                <h2> Delete comment </h2>
                <p>
                    Are you sure you want to delete this
                    comment? This will remove this comment
                    and can´t be undone.
                </p>
                <div className="buttons">
                    <button className="cancel" onClick={() => setIsDelete(false)}> No, Cancel </button>
                    <button className="delete" onClick={handleDelete}> Yes, Delete </button>
                </div>
            </div>
        </div>
    )
}