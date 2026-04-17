 function App() {
        const [note, setNote] = React.useState(() => {
            try {
                const saved = localStorage.getItem("notee");
                if (saved && saved !== "undefined") {
                    return JSON.parse(saved);
                }
            } catch (e) {
                console.error("Failed to parse notes:", e);
            }
            return [];
        });

        const [text, setText] = React.useState("");

        React.useEffect(() => {
            localStorage.setItem("notee", JSON.stringify(note));
        }, [note]);

        function addNote() {
            const trimmedText = text.trim();
            if (trimmedText === "") return;
            setNote([...note, trimmedText]);
            setText("");
        }

        function deleteNote(index) {
            const updatedNotes = note.filter((_, i) => i !== index);
            setNote(updatedNotes);
        }

        function edit(index){
            setText(note[index]);
            deleteNote(index);
        }

        const handleKeyDown = (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNote();
            }
        };

        return (
            <div>
                <h2>Notes App</h2>
                <textarea 
                    value={text} 
                    placeholder="Enter notes (Enter to save)" 
                    onKeyDown={handleKeyDown} 
                    onChange={(e) => setText(e.target.value)}
                />
                
                <button onClick={addNote}>Send</button>
                
                <div id="notes-list">
                    {note.length === 0 ? <p>No notes found.</p> : note.map((content, i) => (
                        <div key={i}>
                            <h3>{content}</h3>
                            <button onClick={() => deleteNote(i)}>Delete</button>
                            <button onClick={() => edit(i)}>Edit</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
