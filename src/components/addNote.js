import { useState } from "react";
const AddNote=({onAdd, onCancel, edit=false, title="", content="", id=""})=>{
    const [newNote, setNewNote] = useState({ title, content });

    const handleClick=async(event)=>{
        event.preventDefault();
        if(!newNote.title || !newNote.content)
            alert("Title and content is required");
        else{
            try{
                
                let url=edit?`http://localhost:3000/notes/${id}`:"http://localhost:3000/notes";
                const method=edit?"PUT":"POST";
                const response=await fetch(url,{
                    method:method,
                    headers:{
                        'Content-Type':"application/json"
                    },
                    body:JSON.stringify(newNote)
                });

                if(response.ok){
                    const data=await response.json();
                    onAdd(data, edit);
                    setNewNote({title:"", content:""});
                }else{
                    alert("Something went wrong");
                }
            }
            catch(e){
                console.log('Error:',e);
            }
        }
    }
    return(
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl mb-4">{edit?"Edit Note":"Add a New Note"}</h3>
        <form onSubmit={handleClick}>
            <input
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            placeholder="Note Title"
            className="w-full p-2 bg-gray-700 mb-4 border-b-2 border-gray-300"
            />
            <textarea
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            placeholder="Note Content"
            className="w-full p-2 mb-4 bg-gray-700 border-b-2 border-gray-300"
            />
            <div className="flex gap-2">
                <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded"
                >
                {edit?"Edit Note":"Add Note"} 
                </button>
                <button
                onClick={(edit)=>onCancel(edit)}
                className="bg-gray-900 text-white px-4 py-2 rounded"
                >
                Cancel
                </button>
            </div>
        </form>
        </div>
    )
}
export default AddNote;