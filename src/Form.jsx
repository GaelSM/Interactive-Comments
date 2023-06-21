export default function Form({type, currentUser, handleCreate}){
    return (
    <div className="add-comment">
        <img src={currentUser.image} alt="" />
        <form onSubmit={(e) => handleCreate(e)}>
          <textarea placeholder="Add a comment..." name='text'/>
          <button> {type} </button>
        </form>
    </div>
    )
}
